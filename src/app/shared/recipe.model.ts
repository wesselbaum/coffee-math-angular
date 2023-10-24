import { RatioConf } from 'coffeemathlib/RatioCalculator.js';

export interface Recipe {
  creatorId: string;
  name: string;
  id: string;
  favorite: boolean;
  ratioConf: RatioConf;
}
