import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appFavorite]',
})
export class FavoriteDirective implements OnChanges {
  @Input() appFavorite = false;
  constructor(private el: ElementRef) {
    el.nativeElement.style.color = 'gold';
  }

  ngOnChanges(/*changes: SimpleChanges*/) {
    if (this.appFavorite) {
      this.el.nativeElement.innerHTML = '★';
    } else {
      this.el.nativeElement.innerHTML = '☆';
    }
  }
}
