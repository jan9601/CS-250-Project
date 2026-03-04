from pathlib import Path
import pandas as pd

def main():
    project_root = Path(__file__).resolve().parents[2]
    in_path = project_root / "data" / "daily_weather.csv"
    out_path = project_root / "data" / "daily_weather_clean.csv"

    df = pd.read_csv(in_path)

    # parse and sort dates
    df["date"] = pd.to_datetime(df["date"], errors = "coerce")
    df = df.dropna(subset=["date"])
    df = df.sort_values("date")

    # drop duplicate dates
    before = len(df)
    df = df.drop_duplicates(subset=["date"], keep = "first")
    dup_dropped = before-len(df)

    # check temps are numeric
    df["tmin"] = pd.to_numeric(df["tmin"], errors = "coerce")
    df["tmax"] = pd.to_numeric(df["tmax"], errors = "coerce")

    # remove invalid temps
        # drop if tmin > tmax
    before = len(df)
    df = df[df["tmin"].isna() | df["tmax"].isna() | (df["tmin"] <= df["tmax"])]
    bad_order_dropped = before - len(df)

    # drop impossible temps
    before = len(df)
    df = df[(df["tmin"].isna() | ((df["tmin"] >= -10) & (df["tmin"] <= 55)))&
            (df["tmin"].isna() | ((df["tmin"] >= -10) & (df["tmin"] <= 55)))]
    extreme_dropped = before - len(df)

    # create continuous daily index + interpolate missing
    df = df.set_index("date")

    full_range = pd.date_range(df.index.min(), df.index.max(), freq = "D")
    df = df. reindex(full_range)

    missing_before = int(df["tmin"].isna().sum() + df["tmax"].isna().sum())

    # interpolate over time fills gaps smoothly
    df["tmin"] = df["tmin"].interpolate(method="time", limit=14)
    df["tmax"] = df["tmax"].interpolate(method="time", limit=14)

    #if still missing big gaps drop those days
    df = df.dropna(subset=["tmin","tmax"])

    missing_after = int(df["tmin"].isna().sum() + df["tmax"].isna().sum())

    # put it back to column form
    df = df.reset_index().rename(columns ={"index":"date"})
    df.to_csv(out_path, index = False)

    # save
    out_path.parent.mkdir(parents=True, exist_ok=True)
    df.to_csv(out_path, index=False)

    # final check report
    print("Cleaned weather saved to:", out_path)
    print("Duplicate dates dropped:", dup_dropped)
    print("Rows dropped tmin > tmax:", bad_order_dropped)
    print("Rows dropped extreme temps:", extreme_dropped)
    print("Missing temp before interpolation:", missing_before)
    print("Missing temp after interpolation:", missing_after)
    print("Final rows:", len(df))
    print("Final date range:", df["date"].min(), "to", df["date"].max())

if __name__ == "__main__":
    main()
