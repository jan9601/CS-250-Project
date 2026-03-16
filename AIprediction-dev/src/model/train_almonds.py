from pathlib import Path
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

FEATURES = [
    "cumulative_gdd",
    "season_day",
    "temp_mean_7d",
    "temp_std_7d",
    "gdd_sum_7d"
]

TARGET = "days_to_harvest"

def main():
    project_root = Path(__file__).resolve().parents[2]
    data_path = project_root / "data" / "almonds_training.csv"
    model_path = project_root / "models" / "almond_rf.joblib"
    model_path.parent.mkdir(parents=True, exist_ok=True)

    df = pd.read_csv(data_path)
    if "season_year" not in df.columns:
        raise ValueError("Expected season_year column in almonds_training.csv")

    # basic validation
    missing = [c for c in FEATURES + [TARGET] if c not in df.columns]
    if missing:
        raise ValueError(f"Missing required columns: {missing}")

    # split by year
    train_years = sorted(df["season_year"].unique())[:-3]
    test_years = sorted(df["season_year"].unique())[-3:]

    train_df = df[df["season_year"].isin(train_years)].copy()
    test_df = df[df["season_year"].isin(test_years)].copy()

    X_train = train_df[FEATURES]
    y_train = train_df[TARGET]

    X_test = test_df[FEATURES]
    y_test = test_df[TARGET]

    # model
    model = RandomForestRegressor(
        n_estimators = 300,
        max_depth=12,
        random_state = 42,
        n_jobs =-1,
        min_samples_leaf = 2
    )

    print("Training years:", train_years[0], "to", train_years[-1])
    print("Testing years:", test_years)
    print("Training rows:", len(train_df))
    print("Testing rows:", len(test_df))

    model.fit(X_train, y_train)

    # evaluate
    preds = model.predict(X_test)
    mae = mean_absolute_error(y_test, preds)
    print("\n test MAE (days):", round(mae, 2))

    # optional: MAE test by year
    print("\nMAE by test year")
    for yr in test_years:
        sub = test_df[test_df["season_year"] == yr]
        p = model.predict(sub[FEATURES])
        y = sub[TARGET]
        print(yr, "MAE:", round(mean_absolute_error(y, p), 2), "rows:", len(sub))

        # optional
        importances = pd.Series(model.feature_importances_, index=FEATURES).sort_values(ascending=False)
        print("\nFeature importance:")
        print(importances)

        # save model
        joblib.dump(
            {"model": model, "features": FEATURES},
            model_path
        )
        print("\n saved model to:", model_path)

if __name__ == "__main__":
    main()