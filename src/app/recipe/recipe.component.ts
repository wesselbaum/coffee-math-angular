import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
  public recipe: Recipe;

  public recipeForm = new FormGroup({
    waterAmountMl: new FormControl('10', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')],
    }),
    coffeeAmountMl: new FormControl('20', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')],
    }),
    groundsAmountG: new FormControl('30', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^\\d*\\.?\\d*$')],
    }),
  });

  recipeServiceSubscription: Subscription | undefined;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.recipe = this.recipeService.getRecipes()[0];
    this.prefillInputs();
  }

  ngOnInit() {
    this.recipeServiceSubscription =
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

  ngOnDestroy() {
    this.recipeServiceSubscription?.unsubscribe();
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
      this.recipeForm.controls.waterAmountMl.setValue(
        this.recipe.input.water + ''
      );
      this.recipeForm.controls.coffeeAmountMl.setValue(
        this.recipe.input.coffee + ''
      );
      this.recipeForm.controls.groundsAmountG.setValue(
        this.recipe.input.grounds + ''
      );
    } else {
      this.recipeForm.controls.waterAmountMl.setValue('200');
      this.onWaterAmountChanges();
    }
  }

  onWaterAmountChanges = () => {
    this.recipeForm.controls.waterAmountMl.setValue(
      parseFloatWithFallback(this.recipeForm.controls.waterAmountMl.value, 0) +
        ''
    );
    this.recipeForm.controls.coffeeAmountMl.setValue(
      trimFloat(
        calculateCoffeeFromWater(
          parseFloatWithFallback(
            this.recipeForm.controls.waterAmountMl.value,
            0
          ),
          this.recipe.ratioConf
        ),
        2
      ) + ''
    );
    this.recipeForm.controls.groundsAmountG.setValue(
      trimFloat(
        calculateGroundsFromWater(
          parseFloatWithFallback(
            this.recipeForm.controls.waterAmountMl.value,
            0
          ),
          this.recipe.ratioConf
        ),
        2
      ) + ''
    );
  };
  onCoffeeAmountChanges = () => {
    this.recipeForm.controls.coffeeAmountMl.setValue(
      parseFloatWithFallback(this.recipeForm.controls.coffeeAmountMl.value, 0) +
        ''
    );
    this.recipeForm.controls.waterAmountMl.setValue(
      trimFloat(
        calculateWaterFromCoffee(
          parseFloatWithFallback(
            this.recipeForm.controls.coffeeAmountMl.value,
            0
          ),
          this.recipe.ratioConf
        ),
        2
      ) + ''
    );
    this.recipeForm.controls.groundsAmountG.setValue(
      trimFloat(
        calculateGroundsFromCoffee(
          parseFloatWithFallback(
            this.recipeForm.controls.waterAmountMl.value,
            0
          ),
          this.recipe.ratioConf
        ),
        2
      ) + ''
    );
  };
  onGroundsAmountChanges = () => {
    this.recipeForm.controls.groundsAmountG.setValue(
      parseFloatWithFallback(this.recipeForm.controls.groundsAmountG.value, 0) +
        ''
    );
    this.recipeForm.controls.waterAmountMl.setValue(
      trimFloat(
        calculateWaterFromGrounds(
          parseFloatWithFallback(
            this.recipeForm.controls.groundsAmountG.value,
            0
          ),
          this.recipe.ratioConf
        ),
        2
      ) + ''
    );
    this.recipeForm.controls.coffeeAmountMl.setValue(
      trimFloat(
        calculateCoffeeFromGrounds(
          parseFloatWithFallback(
            this.recipeForm.controls.groundsAmountG.value,
            0
          ),
          this.recipe.ratioConf
        ),
        2
      ) + ''
    );
  };
  onFavoriteButtonClick() {
    this.recipeService.toggleFavorite(this.recipe.id);
  }
}
