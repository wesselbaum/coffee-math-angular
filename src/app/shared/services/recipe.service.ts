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
    },
    {
      id: 'V60Can',
      name: 'V60 Can',
      ratioConf: this.ratioConf,
      favorite: false,
      creatorId: '',
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
