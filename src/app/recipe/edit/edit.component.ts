import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { simplifyRatio } from '../../shared/Helpers/recipe.helper';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css', '../recipe.component.css'],
})
export class EditComponent implements OnInit, OnDestroy {
  public recipe: Recipe;
  public expertView = false;
  public strength = 'normal';

  recipeServiceSubscription: Subscription | undefined;

  recipeForm = new FormGroup({
    waterInGroundsCapacity: new FormControl(0, { nonNullable: true }),
    relationshipWater: new FormControl(0, { nonNullable: true }),
    relationshipGrounds: new FormControl(0, { nonNullable: true }),
  });

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.recipe = this.recipeService.getRecipes()[0];
    this.adjustFormToRecipe();
  }

  ngOnInit() {
    this.recipeServiceSubscription =
      this.recipeService.recipeToggledFavorite.subscribe(recipe => {
        if (recipe.id === this.recipe.id) {
          this.recipe = recipe;
          this.adjustFormToRecipe();
        }
      });
    this.updateCurrentRecipeById(this.route.snapshot.params['id']);
    this.route.params.subscribe((params: Params) => {
      this.updateCurrentRecipeById(params['id']);
    });

    this.expertView = this.recipe.ratioConf.relationship.coffeeG !== 1;
    this.adjustRecipeToCurrentView();
  }

  ngOnDestroy() {
    this.recipeServiceSubscription?.unsubscribe();
  }

  adjustFormToRecipe() {
    this.recipeForm.controls.waterInGroundsCapacity.setValue(
      this.recipe.ratioConf.waterInGroundCoffeeCapacity
    );
    this.recipeForm.controls.relationshipGrounds.setValue(
      this.recipe.ratioConf.relationship.coffeeG
    );
    this.recipeForm.controls.relationshipWater.setValue(
      this.recipe.ratioConf.relationship.waterMl
    );
  }

  onExpertInputChange() {
    this.recipe.ratioConf.relationship.waterMl =
      this.recipeForm.controls.relationshipWater.value;
    this.recipe.ratioConf.relationship.coffeeG =
      this.recipeForm.controls.relationshipGrounds.value;
    this.recipe.ratioConf.waterInGroundCoffeeCapacity =
      this.recipeForm.controls.waterInGroundsCapacity.value;
  }

  adjustRecipeToCurrentView() {
    if (!this.expertView) {
      this.recipe.ratioConf = simplifyRatio(this.recipe.ratioConf);
    }
  }

  updateCurrentRecipeById = (recipeId: string) => {
    const recipe = this.recipeService
      .getRecipes()
      .find(recipe => recipe.id === recipeId);
    if (recipe) {
      this.recipe = recipe;
      this.adjustFormToRecipe();
    }
  };

  onExpertViewChange(event: MatSlideToggleChange) {
    this.expertView = event.checked;
    this.adjustRecipeToCurrentView();
  }

  onStrengthChange(e: Event) {
    const value = parseInt((e.currentTarget as HTMLInputElement).value);
    this.recipe.ratioConf.relationship.waterMl = value;
    switch (true) {
      case value < 10:
        this.strength = 'very strong';
        break;
      case value < 15:
        this.strength = 'strong';
        break;

      case value < 18:
        this.strength = 'normal';
        break;

      case value < 23:
        this.strength = 'weak';
        break;

      default:
        this.strength = 'very weak';
    }
  }

  saveRecipe() {
    this.recipeService.updateRecipe(this.recipe);
  }

  protected readonly Event = Event;
}
