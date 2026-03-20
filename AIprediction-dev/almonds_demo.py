from pathlib import Path
import pandas as pd
from src.model.predict import predict_harvest

def load_actual_harvest(training_csv: Path, prediction_date: str):
    df = pd.read_csv(training_csv)
    df["date"] = pd.to_datetime(df["date"])

    row = df[df["date"] == pd.to_datetime(prediction_date)].copy()
    if row.empty:
        return None, None

    actual_days = float(row["days_to_harvest"].iloc[0])
    actual_harvest_date = pd.to_datetime(prediction_date) + pd.Timedelta(days=actual_days)
    return actual_days, actual_harvest_date.date()

def print_demo_result(title: str, result: dict, actual_days, actual_harvest_date):
    print("=" * 40)
    print(title)
    print(f"Crop: {result['crop_type']}")
    print(f"Prediction Date: {result['prediction_date']}")
    print(f"Predicted Harvest Date: {result['predicted_harvest_date']}")
    print(f"Predicted Days to Harvest: {result['predicted_days_to_harvest']}")
    print(f"Confidence: {result['confidence']}")
    print(f"Prediction Range: {result['range_start']} to {result['range_end']}")
    print(f"Actual days until harvest: {actual_days}")
    print(f"Actual harvest date: {actual_harvest_date}")

if __name__ == "__main__":
    project_root = Path(__file__).resolve().parent
    grape_weather_path = project_root / "data" / "daily_weather_clean_almonds.csv"
    almonds_training = project_root / "data" / "almonds_training.csv"


    df = pd.read_csv(grape_weather_path)
    df["date"] = pd.to_datetime(df["date"])
    season_start_date = "2024-03-01"
    as_of_date1 = "2024-04-15"
    actual_days1, actual_harvest_date1 = load_actual_harvest(almonds_training, as_of_date1)
    as_of_date2 = "2024-05-15"
    actual_days2, actual_harvest_date2 = load_actual_harvest(almonds_training, as_of_date2)
    as_of_date3 = "2024-07-15"
    actual_days3, actual_harvest_date3 = load_actual_harvest(almonds_training, as_of_date3)


    df1 = df[
        (df["date"] >= pd.to_datetime(season_start_date)) &
        (df["date"] <= as_of_date1)
        ].copy()
    df2 = df[
        (df["date"] >= pd.to_datetime(season_start_date)) &
        (df["date"] <= as_of_date2)
        ].copy()
    df3 = df[
        (df["date"] >= pd.to_datetime(season_start_date)) &
        (df["date"] <= as_of_date3)
        ].copy()

    df["date"] = df["date"].dt.strftime("%Y-%m-%d")

    result1 = predict_harvest(
        crop_type="almonds",
        daily_weather=df1[["date", "tmin", "tmax"]].to_dict(orient="records"),
        season_start_date=season_start_date
    )
    result2 = predict_harvest(
        crop_type="almonds",
        daily_weather=df2[["date", "tmin", "tmax"]].to_dict(orient="records"),
        season_start_date=season_start_date
    )
    result3 = predict_harvest(
        crop_type="almonds",
        daily_weather=df3[["date", "tmin", "tmax"]].to_dict(orient="records"),
        season_start_date=season_start_date
    )

    print("Prediction test [almonds]:")
    print(print_demo_result("Almonds Demo 1", result1, actual_days1, actual_harvest_date1))
    print(print_demo_result("Almonds Demo 2", result2, actual_days2, actual_harvest_date2))
    print(print_demo_result("Almonds Demo 3", result3, actual_days3, actual_harvest_date3))
