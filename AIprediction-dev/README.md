# FarmSync AI - Development Branch

This branch contains the full machine learning pipeline use to build and train the AI that predicts when to harvest a specific crop. 
Unlike the main branch, this branch also includes:
- Weather data collection and cleaning
- Growing Degree Day (GDD) feature generation
- Simulated harvest label generation
- Training dataset construction
- Model training scripts

This branch is intended for **model development, experimentation, and adding new crop models**.

# Main vs Dev Branch
## main
- prediction function only
- trained models
- used when integrating with other parts of the system

## dev
- full training pipeline
- model development

# Overview of AI fundamental idea
Gets years of temperature data, getting the max temp and min temp for each day over the course of many years. GDD is a formula that helps measure plant development. You use the GDD formula to calculate the GDD for that day. You add up the GDD over the course of several days for that growing season, and once the GDD passes a certain number (threshold) that crop is ready to be harvested.

# Supported Crops
- Currently there are only pipelines for almonds and table grapes using Fresno and Bakersfield weather respectively.

# How to make a new crop model
Step + file to reference on how to complete step

*duplicate each files below and adjust them accordingly to account for: location, file names, GDD threshold, season start date, and be sure to update the predict.py model_map and crop_config.*

- Gather weather data (meteostat_data_almonds.py)
- Clean up the weather data (clean_weather_almonds.py)
- GDD feature generation (run_gdd_almonds.py)
- Simulate harvest dates (simulate_harvest_almonds.py)
- Training dataset (build_training_set_almonds.py)
- RandomForest model training (train_almonds.py)
- Update prediction function (predict.py)

# File descriptions

## data_to_table
```
meteostat_data_<crop>.py
```

Downloads historical daily weather data for a crop's region

Outputs:
- date
- tmin
- tmax

**NOTE**: I used Meteostat to get weather data for specific regions. This may not work on different computers and can be very unreliable. You can find another weather API or find another solution if meteostat is not functioning properly. 

```
clean_weather_<crop>.py
```

Cleans the raw weather data from the weather API. Cleans it by:
- parsing dates
- sorting rows
- removing invalid temp values
- handling missing data

## features
```
gdd.py
```

Computes the Growing Degree Days (GDD):
- ave temp
- daily GDD
- cumulative GDD from season start
Represents crop dev based on temp

```
run_gdd_<crop>.py
```
Applies GDD calculations to the cleaned weather dataset.

Ouputs:
- weather table with GDD features

```
simulate_harvest_<crop>.py
```
Generates synthetic harvest dates for each season (harvest occurs when cumulative GDD reaches a threshold)

Outputs:
- season_year
- gdd_threshold
- harvest_date
- days_in_season

```
build_training_set_<crop>.py
```
Creates a machine learning dataset.
Combines: 
- daily weather/GDD data
- harvest dates

Outputs:
- GDD + temp patterns
- target: days_to_harvest

## model
```
train_<crop>.py
```
Trains a RandomForest regression model

Outputs:
- trained model (.joblib)
- evaluation metrics (MAE)

```
predict.py
```
Contains the production prediction formula.
(more about this in main README.md)

```
confidence_build.py
```
Design and test the confidence prediction function

How confidence works;
The model uses a RandomForest, which is an ensemble of many decision trees.
Each tree makes its own prediction for days to harvest. These predictions form a distribution.
The main prediction is the avergae of all tree predictions. The confidence is based on how much the trees disagree.

# Future improvements
- bloom date modeling
- multi-region support
- improved confidence calibration

