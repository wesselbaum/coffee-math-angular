// noinspection AngularMissingOrInvalidDeclarationInModule

import { Component } from '@angular/core';

@Component({
  template: `<span [appFavorite]="this.favorite"></span>`,
})
export class TestFavoriteComponent {
  public favorite = false;
}
