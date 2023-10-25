import { RatioConf } from 'coffeemathlib/RatioCalculator.js';

export interface RecipeInput {
  water: number;
  coffee: number;
  grounds: number;
}

export interface Recipe {
  creatorId: string;
  name: string;
  id: string;
  favorite: boolean;
  ratioConf: RatioConf;
  input?: RecipeInput;
}
