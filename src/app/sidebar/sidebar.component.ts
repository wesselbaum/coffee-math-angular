import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.recipeToggledFavorite.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
    });
  }
}
