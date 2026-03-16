from pathlib import Path
import pandas as pd
import joblib
import numpy as np

FEATURES = [
    "cumulative_gdd",
    "season_day",
    "temp_mean_7d",
    "temp_std_7d",
    "gdd_sum_7d"
]

def add_prediction_features(df: pd.DataFrame) -> pd.DataFrame:
    """
    Adds rolling 7-day features needed for prediction.
    Assumes df already contains: date, season_year, tavg, daily_gdd, cumulative_gdd, season_day
    """
    df = df.copy()
    df["date"] = pd.to_datetime(df["date"])
    df = df.sort_values(["season_year", "date"])

    df["temp_mean_7d"] = (
        df.groupby("season_year")["tavg"]
        .rolling(7, min_periods=1)
        .mean()
        .reset_index(level=0, drop=True)
    )

    df["temp_std_7d"] = (
        df.groupby("season_year")["tavg"]
        .rolling(7, min_periods=1)
        .std()
        .reset_index(level=0, drop=True)
    )

    df["gdd_sum_7d"] = (
        df.groupby("season_year")["daily_gdd"]
        .rolling(7, min_periods=1)
        .sum()
        .reset_index(level=0, drop=True)
    )

    # fill early-season std NaN (first day/window) with 0
    df["temp_std_7d"] = df["temp_std_7d"].fillna(0.0)

    return df


def build_prediction_row(df: pd.DataFrame, season_year: int, as_of_date: str) -> pd.DataFrame:
    """
    Return exactly one row of model features for the requested date.
    """
    as_of_date = pd.to_datetime(as_of_date)
    df = df.copy()
    df["date"] = pd.to_datetime(df["date"])

    row = df[(df["season_year"] == season_year) & (df["date"] == as_of_date)].copy()

    if row.empty:
        raise ValueError(f"No row found for season_year={season_year}, date={as_of_date.date()}")

    return row[FEATURES]

def predict_with_confidence(model, X_pred):
    # gives back prediction, range, and confidence
    # predictions from each tree
    X_array = X_pred.values

    tree_preds = np.array([tree.predict(X_array)[0] for tree in model.estimators_])
    predicted_days = tree_preds.mean()

    lower = np.percentile(tree_preds, 10)
    upper = np.percentile(tree_preds, 90)

    std = tree_preds.std()
    confidence = float(np.exp(-std / 10))

    return predicted_days, lower, upper, confidence

def main():
    project_root = Path(__file__).resolve().parents[2]

    model_path = project_root / "models" / "almond_rf.joblib"
    weather_path = project_root / "data" / "weather_with_gdd_almonds.csv"

    # load model
    saved = joblib.load(model_path)
    model = saved["model"]

    # load weather+gdd
    df = pd.read_csv(weather_path)

    # add rolling features needed by the model
    df = add_prediction_features(df)

    # choose a prediction date
    season_year = 2024
    as_of_date = ("2024-07-15")

    X_pred = build_prediction_row(df, season_year, as_of_date)

    predicted_days, lower_days, upper_days, confidence = predict_with_confidence(model, X_pred)
    as_of = pd.to_datetime(as_of_date)

    predicted_date = as_of + pd.Timedelta(days=predicted_days)
    earliest_date = as_of + pd.Timedelta(days=lower_days)
    latest_date = as_of + pd.Timedelta(days=upper_days)

    print("Prediction date:", as_of_date)
    print("Predicted harvest:", predicted_date.date())
    print("Confidence:", round(confidence,2))
    print("Range:", earliest_date.date(), "to", latest_date.date())

if __name__ == "__main__":
    main()
