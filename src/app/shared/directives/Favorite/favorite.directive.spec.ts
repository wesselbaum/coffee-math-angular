import { FavoriteDirective } from './favorite.directive';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestFavoriteComponent } from './TestFavoriteComponent';
import { By } from '@angular/platform-browser';

describe('FavoriteDirective', () => {
  let component: TestFavoriteComponent;
  let fixture: ComponentFixture<TestFavoriteComponent>;
  let spanEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestFavoriteComponent, FavoriteDirective],
    });
    fixture = TestBed.createComponent(TestFavoriteComponent);

    component = fixture.componentInstance;
    spanEl = fixture.debugElement.query(By.css('span'));
  });

  it('should create an instance', () => {
    expect(spanEl).toBeTruthy();
  });

  it('should set content according to input', () => {
    fixture.detectChanges();
    expect(spanEl.nativeElement.innerHTML).toContain('☆');
    component.favorite = true;
    fixture.detectChanges();
    expect(spanEl.nativeElement.innerHTML).toContain('★');
  });
});
