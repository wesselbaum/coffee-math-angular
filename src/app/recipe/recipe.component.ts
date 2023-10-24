import { Component, OnInit } from '@angular/core';
import { parseFloatWithFallback, trimFloat } from '../shared/Helpers/number';
import {
  calculateCoffeeFromGrounds,
  calculateCoffeeFromWater,
  calculateGroundsFromCoffee,
  calculateGroundsFromWater,
  calculateWaterFromCoffee,
  calculateWaterFromGrounds,
} from 'coffeemathlib';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  public waterAmountMl = 10;
  public coffeeAmountMl = 20;
  public groundsAmountG = 30;
  public recipe: Recipe;

  constructor(private recipeService: RecipeService) {
    this.recipe = this.recipeService.getRecipes()[0];
  }

  ngOnInit() {
    this.recipeService.recipeToggledFavorite.subscribe(recipe => {
      if (recipe.id === this.recipe.id) {
        this.recipe = recipe;
      }
    });
  }

  onWaterAmountChanges = () => {
    if (!this.recipe) {
      return;
    }
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
    if (!this.recipe) {
      return;
    }
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
    if (!this.recipe) {
      return;
    }
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
  onFavoriteButtonClick() {
    this.recipeService.toggleFavorite(this.recipe.id);
  }
}
