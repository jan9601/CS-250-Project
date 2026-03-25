# FarmSync 𖧧

# Overview
FarmSync's purpose is to find the solution to two main problems regarding local farms: excess crops and unreliability. Making harvest dates more predictable would allow farmers to know who is interested in their crops before they are harvested, and also make local farmers more reliable for nearby buyers. 

The platform is designed to support farmer and buyer login. On the farmer side it shows crops and their status, while on the buyers page it shows available crops that can be purchased and checked out.

The farmers can see a predicted harvest date for their future crops, and the confidence of the AI who predicted that date. The AI predicts based off of historical weather data for that region using sensors from the farm (mock sensors for our MVP). 


# Project Goals
1. Collect and manage weather data
2. Estimate when a crop will be ready to harvest
3. Allow farmers to list future crops
4. Allow customers to buy/pre-order crops from farmers

# Project sections
Each section has a branch and a related README.md for more info on that section!
AI - AI models related to estimating/ predicting the harvest date for a type of crop (see ml-dev/Farmsync branch for more info)
Backend - currently handles login related tasks. In future would handle data processing, returning results to the frontend, etc.
Frontend - Displays different things based on what type of user logged in (farmer/buyer). Has a marketplace and dashboard where, if a farmer, one can manage and list their future/ current crops. If a buyer, one can browse and buy or pre-order available crops.

