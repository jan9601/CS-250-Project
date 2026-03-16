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
