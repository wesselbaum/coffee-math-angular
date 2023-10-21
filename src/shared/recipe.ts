import { RatioConf } from 'coffeemathlib/RatioCalculator.js';

export interface RecipeObject {
  creatorId: string;
  name: string;
  id: string;
  favorite: boolean;
  ratioConf: RatioConf;
}
