import { RatioConf } from 'coffeemathlib/RatioCalculator.js';
import { Recipe } from '../../recipe.model';
import { faker } from '@faker-js/faker';

export const sampleRatioConf: RatioConf = {
  waterInGroundCoffeeCapacity: 2,
  relationship: { coffeeG: 1, waterMl: 3 },
};

export const generateRandomRatioConf = (): RatioConf => {
  return {
    waterInGroundCoffeeCapacity: faker.number.float({ min: 1, max: 10 }),
    relationship: {
      coffeeG: faker.number.int({ min: 0, max: 1000 }),
      waterMl: faker.number.int({ min: 0, max: 100000 }),
    },
  };
};

export const buildRatioConf = (overrides: Partial<RatioConf>): RatioConf => {
  return { ...generateRandomRatioConf(), ...overrides };
};

export const sampleRecipe: Recipe = {
  input: { water: 10, grounds: 10, coffee: 10 },
  creatorId: '',
  ratioConf: sampleRatioConf,
  name: '',
  favorite: true,
  id: '',
};

export const generateRandomRecipe = (): Recipe => {
  return {
    input: {
      water: faker.number.float({ min: 0, max: 100000 }),
      grounds: faker.number.float({ min: 0, max: 100 }),
      coffee: faker.number.float({ min: 0, max: 100000 }),
    },
    creatorId: faker.string.uuid(),
    ratioConf: generateRandomRatioConf(),
    name: faker.company.name(),
    favorite: faker.datatype.boolean(),
    id: faker.string.uuid(),
  };
};

export const buildRecipe = (overrides: Partial<Recipe>): Recipe => {
  return { ...generateRandomRecipe(), ...overrides };
};
