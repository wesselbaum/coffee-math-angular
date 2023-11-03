import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../shared/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipeServiceSubscription: Subscription | undefined;

  @Output() recipeClicked = new EventEmitter<undefined>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeServiceSubscription =
      this.recipeService.recipeToggledFavorite.subscribe(() => {
        this.recipes = this.recipeService.getRecipes();
      });
  }

  ngOnDestroy() {
    this.recipeServiceSubscription?.unsubscribe();
  }

  onRecipeClick() {
    this.recipeClicked.emit();
  }
}
