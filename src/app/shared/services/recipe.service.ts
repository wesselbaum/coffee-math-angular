import { Recipe } from '../recipe.model';
import { RatioConf } from 'coffeemathlib/RatioCalculator';
import { EventEmitter } from '@angular/core';

export class RecipeService {
  private ratioConf: RatioConf = {
    waterInGroundCoffeeCapacity: 2.35,
    relationship: {
      coffeeG: 14,
      waterMl: 250,
    },
  };
  private recipes: Recipe[] = [
    {
      id: 'V60',
      name: 'V60',
      ratioConf: this.ratioConf,
      favorite: true,
      creatorId: '',
    },
    {
      id: 'AeroPress',
      name: 'AeroPress',
      ratioConf: this.ratioConf,
      favorite: true,
      creatorId: '',
      input: {
        water: 250,
        grounds: 14,
        coffee: 220.93,
      },
    },
    {
      id: 'V60CanSimplified',
      name: 'V60 Can Simplified',
      ratioConf: {
        waterInGroundCoffeeCapacity: 2.35,
        relationship: {
          coffeeG: 1,
          waterMl: 17,
        },
      },
      favorite: false,
      creatorId: '',
      input: {
        water: 750,
        grounds: 44.12,
        coffee: 658.91,
      },
    },
  ];

  recipeToggledFavorite = new EventEmitter<Recipe>();

  public getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  public toggleFavorite(recipeId: string) {
    this.recipes = this.recipes.map(recipe => {
      if (recipe.id !== recipeId) {
        return recipe;
      }
      return { ...recipe, favorite: !recipe.favorite };
    });
    this.recipeToggledFavorite.emit(
      this.recipes.find(recipe => recipe.id === recipeId)
    );
  }
}
