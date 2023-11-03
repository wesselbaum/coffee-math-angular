import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { RecipeService } from '../../shared/services/recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { simplifyRatio } from '../../shared/Helpers/recipe.helper';
import { Subscription } from 'rxjs';

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

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.recipe = this.recipeService.getRecipes()[0];
  }

  ngOnInit() {
    this.recipeServiceSubscription =
      this.recipeService.recipeToggledFavorite.subscribe(recipe => {
        if (recipe.id === this.recipe.id) {
          this.recipe = recipe;
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

  protected readonly Event = Event;
}
