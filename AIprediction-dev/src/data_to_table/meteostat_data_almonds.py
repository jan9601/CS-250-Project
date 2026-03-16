from pathlib import Path
from datetime import datetime
import pandas as pd
from meteostat import daily, stations, Point

def get_daily_weather(lat: float, lon: float, start: str, end: str) -> pd.DataFrame:

    start_dt = datetime.strptime(start, '%Y-%m-%d')
    end_dt = datetime.strptime(end, '%Y-%m-%d')

    location = Point(lat, lon)

    stations_o = stations
    stations_o = stations_o.nearby(location, limit=1)

    if stations_o.empty:
        raise ValueError("No weather station found near these coordinates.")

    station_id = stations_o.index[0]

    df = daily(station_id, start_dt, end_dt).fetch()

    # Meteostat gives back table with colums: tempperature minimum (tmin), temp max, (tmax), etc
    df = df.reset_index()
    df.rename(columns = {"time": "date"}, inplace= True)

    keep_cols = ["date", "tmin", "tmax"]
    missing = [c for c in keep_cols if c not in df.columns]
    if missing:
        raise ValueError(f"Meteostat missing expected columns: {missing}. Has columns: {list(df.columns)}")

    df = df[keep_cols].copy()

    df["date"] = pd.to_datetime(df["date"]).dt.date

    return df

def main():

    # coordinates for fresno coordinates
    lat, lon = 36.7762,-119.7181

    # data range
    start = "2010-01-01"
    end = "2024-12-31"

    daily_df = get_daily_weather(lat, lon, start, end)

    # check
    print(daily_df.head())
    print("\nRows:", len(daily_df))
    print("Date range:", daily_df["date"].min(), "to", daily_df["date"].max())
    print("Missing tmin:", daily_df["tmin"].isna().sum())
    print("Missing tmax:", daily_df["tmax"].isna().sum())

    # save
    project_root = Path(__file__).resolve().parents[2]  # <project>/src/data_to_table/file.py -> up to <project>
    data_dir = project_root / "data"
    data_dir.mkdir(parents=True, exist_ok=True)

    out_path = data_dir / "daily_weather_almonds.csv"
    print("Saving to:", out_path)

    daily_df.to_csv(out_path, index=False)
    print("Saved successfully.")

if __name__ == "__main__":
    main()
