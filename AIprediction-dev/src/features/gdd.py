# calculate gdd and cumulative gdd
from __future__ import annotations
import pandas as pd
import numpy as np

# default base temp in celcius
base_temp = 10.0

# create column for gdd and average temp in dataset
def add_gdd_columns(
    df:pd.DataFrame,
    base_temp_c: float = base_temp,
) -> pd.DataFrame:
    out = df.copy()

    out["date"] = pd.to_datetime(out["date"])
    out["tmin"] = pd.to_numeric(out["tmin"], errors = "coerce")
    out["tmax"] = pd.to_numeric(out["tmax"], errors = "coerce")
    out["tavg"] = (out["tmin"]+out["tmax"]) / 2.0
    out["daily_gdd"] = np.maximum(0.0, out["tavg"] - float(base_temp_c))

    return out

# add up gdd per day based on temperature and
# sum it up to see when the crop should be harvested
def add_cumulative_gdd(
        df: pd.DataFrame,
        season_start_month: int = 3,
        season_start_day: int = 1,
) -> pd.Dataframe:
    out = df.copy()
    out["date"] = pd.to_datetime(out["date"])

    # define season year
    season_start = pd.to_datetime(out["date"].dt.year.astype(str)+f"-{season_start_month:02d}-{season_start_day:02d}")
    out["season_year"] = out["date"].dt.year
    out.loc[out["date"]<season_start,"season_year"] = out.loc[out["date"]< season_start,"season_year"]-1

    # for each season year, define the season start date
    out["season_start_date"] = pd.to_datetime(
        out["season_year"].astype(str)+f"-{season_start_month:02d}-{season_start_day:02d}"
    )

    # season day = day count since season started
    out["season_day"] = (out["date"]-out["season_start_date"]).dt.days

    #only accumulate gdd from season start onward.
    # if before that treat daily_gdd as 0
    out["daily_gdd_in_season"] = np.where(out["season_day"] >= 0, out["daily_gdd"], 0.0)

    out["cumulative_gdd"] = out.groupby("season_year")["daily_gdd_in_season"].cumsum()

    # cleanup helper column
    out = out.drop(columns=["daily_gdd_in_season"])

    return out
