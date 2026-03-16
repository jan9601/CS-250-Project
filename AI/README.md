# FarmSync AI for Harvest Prediction
This AI directory contains the python file for the API Function that predicts when a crop will be ready to be harvested based on daily temperature data.

The full training and developement of the AI is available in the ml-dev/Farmsync branch. Please refer to this branch if you would like to add more models for more crops and locations.

## Supported Crops & Training Regions
### Supported Crops
Currently supported crops include:
- almonds
- table grapes (table_grapes)
Each crop uses a seperately trained model for MVP simplicity!

### Training Regions
The almond model was trained using weather data from Fresno, CA
The table grapes model was trained using weather data from Bakersfield, CA

## Function
The API function for the AI is 
```
predict_harvest(crop_type, daily_weather, season_start_date)
```
### Parameters
crop_type : a string identifying the crop (right now only ones supported are "almonds" & "table_grapes"

daily_weather : a list of daily weather observations
Each entry must contain date, tmin, tmax<br/>
     -> YYYY-MM-DD, daily minimum temperature (ºC), daily maximum temperature (ºC)

example: 
```
[
  {"date": "2024-06-10", "tmin": 15.2, "tmax": 31.8],
  {"date": "2024-06-11", "tmin": 16.2, "tmax": 33.1],
  {"date": "2024-06-12", "tmin": 15.6, "tmax": 31.2],
]
```

*Weather data must include all days from the season start date through the prediction date.*

season_start_date : the beginning of the crop's growing season

example:
```
"2024-03-01" # almonds
"2024-04-01" # table grapes
```

### Output
The function returns a dictionary containing: 
```
{
  "crop_type": "table_grapes",
  "prediction_date": "2024-06-15",
  "predicted_days_to_harvest": 62.48,
  "predicted_harvest_date": "2024-08-16",
  "confidence": 0.72,
  "range_start": "2024-08-10",
  "range_end": "2024-08-20"
}
```

## Model Overview
The model uses 
- Random Forest regression
- Growing Degree Days (GDD) derived from the temperature of that day
- Rolling temperature features

## Installation 
Install the required dependencies 
pip install -r requirements.txt

## Notes
- Temperature inputs MUST be in Celcius
- Predicitons assume the weather data begins at the crops season start date
- The training scripts for the model are in the ml-dev/Farmsync branch
