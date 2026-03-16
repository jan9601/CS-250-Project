from pathlib import Path
import pandas as pd

def main():
    project_root = Path(__file__).resolve().parents[2]
    weather_path = project_root / "data" / "weather_with_gdd_almonds.csv"
    seasons_path = project_root / "data" / "almond_seasons.csv"
    out_path = project_root / "data" / "almonds_training.csv"

    weather = pd.read_csv(weather_path)
    seasons = pd.read_csv(seasons_path)

    weather["date"] = pd.to_datetime(weather["date"])
    seasons["harvest_date"] = pd.to_datetime(seasons["harvest_date"])

    #merge harest dates into daily weather
    df = weather.merge(seasons[["season_year", "harvest_date"]],
                       on = "season_year",
                       how="left")

    #only keep valid seasons with a harvest date
    df=df[df["harvest_date"].notna()].copy()

    # only days from seasons start to harvest
    df= df[df["season_day"] >= 0]
    df = df[df["date"] <= df["harvest_date"]]

    #make target the days remaining
    df["days_to_harvest"] = (df["harvest_date"] - df["date"]).dt.days

    #rolling features that are per season
    df["temp_mean_7d"] = (
        df.groupby("season_year")["tavg"]
        .rolling(7, min_periods = 1)
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

    # final feature selection
    final_cols = [
        "season_year",
        "date",
        "cumulative_gdd",
        "season_day",
        "temp_mean_7d",
        "temp_std_7d",
        "gdd_sum_7d",
        "days_to_harvest"
    ]

    df_final = df[final_cols].copy()
    df_final.to_csv(out_path, index=False)

    print("Saved training dataset to: ", out_path)
    print("Total rows: ", len(df_final))
    print("Sample:")
    print(df_final.head())

if __name__ == "__main__":
    main()
