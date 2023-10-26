import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { EditComponent } from './recipe/edit/edit.component';
import { UserComponent } from './user/user.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: RecipeComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'recipe/:id/edit', component: EditComponent },
  { path: 'user', component: UserComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
