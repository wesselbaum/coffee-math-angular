import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RecipeComponent } from './recipe/recipe.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeService } from './shared/services/recipe.service';
import { FavoriteDirective } from './shared/directives/Favorite/favorite.directive';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './recipe/edit/edit.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  { path: '', component: RecipeComponent },
  { path: 'recipe/:id', component: RecipeComponent },
  { path: 'recipe/:id/edit', component: EditComponent },
  { path: 'user', component: UserComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    FavoriteDirective,
    RecipeComponent,
    SidebarComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    RouterModule.forRoot(routes),
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
