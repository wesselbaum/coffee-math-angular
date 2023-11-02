import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { RecipeComponent } from './recipe.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeService } from '../shared/services/recipe.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FavoriteDirective } from '../shared/directives/Favorite/favorite.directive';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  buildRatioConf,
  buildRecipe,
} from '../shared/Helpers/tests/recipe.helper';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeComponent, FavoriteDirective],
      imports: [
        MatCardModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [RecipeService],
    });
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should adjust initial input values to recipe which has no input', fakeAsync(() => {
    component.recipe = buildRecipe({
      input: undefined,
      ratioConf: buildRatioConf({
        waterInGroundCoffeeCapacity: 2,
        relationship: { coffeeG: 1, waterMl: 20 },
      }),
    });
    component.waterAmountMl = 200;
    component.onWaterAmountChanges();
    expect(component.coffeeAmountMl).toEqual(181.82);
    expect(component.groundsAmountG).toEqual(10);
  }));

  it('should adjust initial input values to recipe which has input', fakeAsync(() => {
    const recipe = buildRecipe({});
    component.recipe = recipe;
    component.prefillInputs();
    expect(component.waterAmountMl).toEqual(recipe.input?.water ?? 0);
    expect(component.coffeeAmountMl).toEqual(recipe.input?.coffee ?? 0);
    expect(component.groundsAmountG).toEqual(recipe.input?.grounds ?? 0);
  }));

  it(`should adjust recipe on coffee change`, fakeAsync(() => {
    const coffeeInput = fixture.debugElement.nativeElement.querySelector(
      'input[name="coffee"]'
    );
    expect(coffeeInput).toBeTruthy();
    coffeeInput.value = '400';
    coffeeInput.dispatchEvent(new Event('input'));
    expect(component.coffeeAmountMl).toEqual(400);
    expect(component.waterAmountMl).toEqual(452.64);
    expect(component.groundsAmountG).toEqual(28.68);
  }));
  it(`should adjust recipe on water change`, fakeAsync(() => {
    const waterInput = fixture.debugElement.nativeElement.querySelector(
      'input[name="water"]'
    );
    expect(waterInput).toBeTruthy();
    waterInput.value = '400';
    waterInput.dispatchEvent(new Event('input'));
    expect(component.coffeeAmountMl).toEqual(353.48);
    expect(component.waterAmountMl).toEqual(400);
    expect(component.groundsAmountG).toEqual(22.4);
  }));
  it(`should adjust recipe on grounds change`, fakeAsync(() => {
    const groundsInput = fixture.debugElement.nativeElement.querySelector(
      'input[name="grounds"]'
    );
    expect(groundsInput).toBeTruthy();
    groundsInput.value = '20';
    groundsInput.dispatchEvent(new Event('input'));
    expect(component.coffeeAmountMl).toEqual(315.61);
    expect(component.waterAmountMl).toEqual(357.14);
    expect(component.groundsAmountG).toEqual(20);
  }));
  it(`should toggle favorite`, fakeAsync(() => {
    // const recipe = buildRecipe({ favorite: false });
    // component.recipe = recipe;
    // fixture.detectChanges();
    // component.recipe = recipe;
    const favoriteButton = fixture.debugElement.nativeElement.querySelector(
      'button#favoriteButton'
    );
    expect(favoriteButton).toBeTruthy();
    const buttonSpan = favoriteButton.querySelector('span');
    expect(buttonSpan.innerHTML).toContain('★');
    favoriteButton.dispatchEvent(new Event('click'));
    tick();
    fixture.detectChanges();
    expect(buttonSpan.innerHTML).toContain('☆');
  }));
});
