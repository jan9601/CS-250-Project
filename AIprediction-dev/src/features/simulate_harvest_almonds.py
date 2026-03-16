#create table with the harvest date for each season to train ai
# save date when the cumulative GDD for that season passes threshold

from pathlib import Path
import numpy as np
import pandas as pd

def simulate_harvest_dates(
        df: pd.DataFrame,
        base_threshold: float = 2350.0,
        threshold_variability: float = 150.0,
        seed: int = 42
) -> pd.DataFrame:
    rng = np.random.default_rng(seed)

    df = df.copy()
    df["date"] = pd.to_datetime(df["date"])

    results = []
    for year, g in df.groupby("season_year"):
        g = g.sort_values("date")
        g=g[g["season_day"] >=0 ]
        if g.empty:
            continue
        threshold = float(base_threshold + rng.uniform(-threshold_variability, threshold_variability))

        hit =g[g["cumulative_gdd"] >= threshold]
        if hit.empty: # did reach threshold = never ready to harvest
            results.append({
                "season_year": int(year),
                "gdd_threshold": threshold,
                "harvest_date": pd.NaT,
                "days_in_season": np.nan
            })
            continue

        harvest_row = hit.iloc[0]
        harvest_date = harvest_row["date"].date()
        days_in_season = int(harvest_row["season_day"])

        results.append({
            "season_year": int(year),
            "gdd_threshold": threshold,
            "harvest_date": harvest_date,
            "days_in_season": days_in_season
        })
    seasons = pd.DataFrame(results).sort_values("season_year")
    return seasons

def main():
    project_root = Path(__file__).resolve().parents[2]
    in_path = project_root / "data" / "weather_with_gdd.csv"
    out_path = project_root / "data" / "almond_seasons.csv"

    df = pd.read_csv(in_path)

    required = {"date", "season_year", "season_day", "cumulative_gdd"}
    missing = required - set(df.columns)
    if missing:
        raise ValueError(f"Missing columns in weather_with_gdd.csv: {missing}")

    seasons = simulate_harvest_dates(df)

    seasons.to_csv(out_path, index=False)
    print("Saved:", out_path)

    #sanity check
    ok = seasons.dropna(subset=["harvest_date"]).copy()
    print("\nYears simulated:", len(seasons))
    print("Years with harvest date:", len(ok))
    if len(ok) > 0:
        ok_dates = pd.to_datetime(ok["harvest_date"])
        print("Harvest date range:", ok_dates.min().date(), "to", ok_dates.max().date())
        print("Median harvest date:", ok_dates.median().date())
        print("Median days in season:", int(ok["days_in_season"].median()))

if __name__ == "__main__":
    main()