import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RecipeService } from '../shared/services/recipe.service';
import { AppRoutingModule } from '../app-routing.module';
import { FavoriteDirective } from '../shared/directives/Favorite/favorite.directive';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent, FavoriteDirective],
      providers: [RecipeService],
      imports: [AppRoutingModule],
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
