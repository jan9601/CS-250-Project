# reads cleaned csv and writes the with gdd csv

from pathlib import Path
import pandas as pd
from gdd import add_gdd_columns, add_cumulative_gdd
def main():
    project_root = Path(__file__).resolve().parents[2]
    in_path = project_root / "data" / "daily_weather_clean.csv"
    out_path = project_root / "data" / "weather_with_gdd.csv"

    df = pd.read_csv(in_path)

    df = add_gdd_columns(df, base_temp_c=10.0)
    df = add_cumulative_gdd(df, season_start_month=3,season_start_day=1)
    df.to_csv(out_path, index=False)

    # quick checks
    print("Saved:", out_path)
    print(df[["date", "tmin", "tavg", "daily_gdd", "season_year", "season_day", "cumulative_gdd"]].head(12))

    # check that cumulative resets at season start
    sample_year = int(df["season_year"].dropna().min())
    subset = df[df["season_year"]==sample_year].copy()
    subset = subset[subset["season_day"].between(-3,5)]
    print("\nSanity check around season start for season_year =", sample_year)
    print(subset[["date", "season_day", "daily_gdd", "cumulative_gdd"]])

if __name__ == "__main__":
    main()