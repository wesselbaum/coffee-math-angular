import { Component } from '@angular/core';
import { parseFloatWithFallback, trimFloat } from '../../shared/number';
import {
  calculateCoffeeFromGrounds,
  calculateCoffeeFromWater,
  calculateGroundsFromCoffee,
  calculateGroundsFromWater,
  calculateWaterFromCoffee,
  calculateWaterFromGrounds,
} from 'coffeemathlib';
import { RecipeObject } from '../../shared/recipe';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent {
  public waterAmountMl: number = 10;
  public coffeeAmountMl: number = 20;
  public groundsAmountG: number = 30;
  public recipe: RecipeObject = {
    creatorId: '',
    favorite: false,
    name: 'AeroPress',
    id: '',
    ratioConf: {
      relationship: { coffeeG: 14, waterMl: 250 },
      waterInGroundCoffeeCapacity: 2.2,
    },
  };

  onWaterAmountChanges = () => {
    this.waterAmountMl = parseFloatWithFallback(this.waterAmountMl, 0);
    this.coffeeAmountMl = trimFloat(
      calculateCoffeeFromWater(this.waterAmountMl, this.recipe.ratioConf),
      2
    );
    this.groundsAmountG = trimFloat(
      calculateGroundsFromWater(this.waterAmountMl, this.recipe.ratioConf),
      2
    );
  };
  onCoffeeAmountChanges = () => {
    this.coffeeAmountMl = parseFloatWithFallback(this.coffeeAmountMl, 0);
    this.waterAmountMl = trimFloat(
      calculateWaterFromCoffee(this.coffeeAmountMl, this.recipe.ratioConf),
      2
    );
    this.groundsAmountG = trimFloat(
      calculateGroundsFromCoffee(this.waterAmountMl, this.recipe.ratioConf),
      2
    );
  };
  onGroundsAmountChanges = () => {
    this.groundsAmountG = parseFloatWithFallback(this.groundsAmountG, 0);
    this.waterAmountMl = trimFloat(
      calculateWaterFromGrounds(this.groundsAmountG, this.recipe.ratioConf),
      2
    );
    this.coffeeAmountMl = trimFloat(
      calculateCoffeeFromGrounds(this.groundsAmountG, this.recipe.ratioConf),
      2
    );
  };
}
