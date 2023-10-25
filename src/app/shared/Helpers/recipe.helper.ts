import { RatioConf } from 'coffeemathlib/RatioCalculator.js';

export const simplifyRatio = (ratio: RatioConf): RatioConf => {
  const simplifiedWaterMl = Math.round(
    ratio.relationship.waterMl / ratio.relationship.coffeeG
  );
  return {
    waterInGroundCoffeeCapacity: 2.2,
    relationship: { coffeeG: 1, waterMl: simplifiedWaterMl },
  };
};
