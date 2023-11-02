import { Component, OnInit } from '@angular/core';
import {
  parseFloatWithFallback,
  trimFloat,
} from '../shared/Helpers/number.helper';
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
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.recipe = this.recipeService.getRecipes()[0];
    this.prefillInputs();
  }

  ngOnInit() {
    this.recipeService.recipeToggledFavorite.subscribe(recipe => {
      if (!recipe) {
        return;
      }
      if (recipe.id === this.recipe.id) {
        this.recipe = recipe;
        this.prefillInputs();
      }
    });
    this.updateDisplayedRecipeById(this.route.snapshot.params['id']);
    this.route.params.subscribe((params: Params) => {
      this.updateDisplayedRecipeById(params['id']);
    });
  }

  updateDisplayedRecipeById = (recipeId: string) => {
    const recipe = this.recipeService
      .getRecipes()
      .find(recipe => recipe.id === recipeId);
    if (recipe) {
      this.recipe = recipe;
      this.prefillInputs();
    }
  };

  prefillInputs() {
    if (this.recipe.input) {
      this.waterAmountMl = this.recipe.input.water;
      this.coffeeAmountMl = this.recipe.input.coffee;
      this.groundsAmountG = this.recipe.input.grounds;
    } else {
      this.waterAmountMl = 200;
      this.onWaterAmountChanges();
    }
  }

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
  onFavoriteButtonClick() {
    this.recipeService.toggleFavorite(this.recipe.id);
  }
}
