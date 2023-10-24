import { FavoriteDirective } from './favorite.directive';
import { ElementRef } from '@angular/core';

describe('FavoriteDirective', () => {
  it('should create an instance', () => {
    const span = new HTMLSpanElement();
    const el = new ElementRef(span);
    const directive = new FavoriteDirective(el);
    expect(directive).toBeTruthy();
  });
});
