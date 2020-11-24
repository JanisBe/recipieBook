import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  private open: boolean = false;

  @HostListener('click') toggleOpen() {
    this.open = !this.open;
  }

  @HostBinding('class.open') opened = false;

  constructor() {
  }

}
