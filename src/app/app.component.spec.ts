import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeService } from './shared/services/recipe.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { FavoriteDirective } from './shared/directives/Favorite/favorite.directive';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RecipeComponent } from './recipe/recipe.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidebarComponent,
        FavoriteDirective,
        RecipeComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      providers: [RecipeService],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-coffee-math'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.opened).toEqual(false);
  });

  it('should render navbar with toggle button', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button')?.textContent).toContain('Recipes');
  });

  it('should toggle the sidebar and then close it on recipe selection', fakeAsync(() => {
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');

    expect(button).toBeDefined();
    if (!button) {
      expect(false).toBeTruthy();
      return;
    }
    expect(component.opened).toBeFalsy();
    button.click();
    tick();
    expect(component.opened).toBeTruthy();

    const v60Link = fixture.debugElement.nativeElement.querySelector(
      "a[href='/recipe/V60']"
    );
    v60Link.click();
    tick();
    expect(component.opened).toBeFalsy();
    const cardTitle =
      fixture.debugElement.nativeElement.querySelector('mat-card-title');
    fixture.detectChanges();
    expect(cardTitle.innerHTML).toContain('V60');
    button.click();
    tick();
    const aeroPressLink = fixture.debugElement.nativeElement.querySelector(
      "a[href='/recipe/AeroPress']"
    );
    aeroPressLink.click();
    tick();
    fixture.detectChanges();
    expect(cardTitle.innerHTML).toContain('AeroPress');
  }));
});
