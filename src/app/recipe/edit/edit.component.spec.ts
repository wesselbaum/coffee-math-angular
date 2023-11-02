import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { MatCardModule } from '@angular/material/card';
import { RecipeService } from '../../shared/services/recipe.service';
import { AppRoutingModule } from '../../app-routing.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Recipe } from '../../shared/recipe.model';

const getSimpleRecipe = (recipeService: RecipeService): Recipe => {
  const simpleRecipe = recipeService
    .getRecipes()
    .find(recipe => recipe.ratioConf.relationship.coffeeG === 1);
  if (!simpleRecipe) {
    throw new Error('No simple recipe found');
  }
  return simpleRecipe;
};

const getExpertRecipe = (recipeService: RecipeService): Recipe => {
  const expertRecipe = recipeService
    .getRecipes()
    .find(recipe => recipe.ratioConf.relationship.coffeeG !== 1);
  if (!expertRecipe) {
    throw new Error('No simple recipe found');
  }
  return expertRecipe;
};

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MatCardModule,
        AppRoutingModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [RecipeService],
    });
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should adjust the view to recipes', () => {
    const recipeService = TestBed.inject(RecipeService);
    const simpleRecipe = getSimpleRecipe(recipeService);
    const expertRecipe = getExpertRecipe(recipeService);

    component.recipe = simpleRecipe;
    component.ngOnInit();
    expect(component.expertView).toBeFalse();
    component.recipe = expertRecipe;
    component.ngOnInit();
    expect(component.expertView).toBeTruthy();
  });

  it('should adjust the expert recipe to simple after toggle', () => {
    const recipeService = TestBed.inject(RecipeService);
    const expertRecipe = getExpertRecipe(recipeService);
    component.recipe = { ...expertRecipe };
    component.ngOnInit();
    expect(component.recipe.ratioConf.waterInGroundCoffeeCapacity).toEqual(
      expertRecipe.ratioConf.waterInGroundCoffeeCapacity
    );
    expect(component.recipe.ratioConf.relationship.coffeeG).toEqual(
      expertRecipe.ratioConf.relationship.coffeeG
    );
    expect(component.recipe.ratioConf.relationship.waterMl).toEqual(
      expertRecipe.ratioConf.relationship.waterMl
    );

    const toggle =
      fixture.debugElement.nativeElement.querySelector('mat-slide-toggle');
    toggle.dispatchEvent(new Event('change'));
    expect(component.recipe.ratioConf.waterInGroundCoffeeCapacity).toEqual(2.2);
    expect(component.recipe.ratioConf.relationship.coffeeG).toEqual(1);
    expect(component.recipe.ratioConf.relationship.waterMl).toEqual(18);
  });

  it('should adjust strength to the input', () => {
    //setup
    const recipeService = TestBed.inject(RecipeService);
    const simpleRecipe = getSimpleRecipe(recipeService);
    component.recipe = { ...simpleRecipe };
    component.ngOnInit();
    fixture.detectChanges();
    const range = fixture.debugElement.nativeElement.querySelector(
      'input[type="range"]'
    ) as HTMLInputElement;
    expect(range).toBeTruthy();

    // body
    range.value = '1';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('very strong');
    range.value = '9';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('very strong');
    range.value = '10';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('strong');
    range.value = '14';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('strong');
    range.value = '15';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('normal');
    range.value = '17';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('normal');
    range.value = '18';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('weak');
    range.value = '21';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('weak');
    range.value = '23';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('very weak');
    range.value = '1000';
    range.dispatchEvent(new Event('input'));
    expect(component.strength).toEqual('very weak');
  });
});
