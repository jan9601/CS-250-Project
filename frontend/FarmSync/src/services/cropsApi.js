/*
  Initializes the crops dataset in localStorage
  if no crops are stored yet.
  This allows the app to simulate a database
  using the seed data during development.
* */

import {cropsData} from "./seedCrops";
import {getData, setData} from "./storage";
const CROPS_KEY = "farmsync_fakeCrops";

export function initCrops() {
  const data = getData(CROPS_KEY);
  if (!data) setData(CROPS_KEY, cropsData);
}

export function getCrops() {
  initCrops();

  return new Promise((resolve) => {
    setTimeout(() => {
      const data = getData(CROPS_KEY);
      resolve(data);
    }, 300);
  });
}
