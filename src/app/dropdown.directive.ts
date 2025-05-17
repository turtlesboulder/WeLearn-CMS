import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[cmsDropdown]',
  standalone: false
})
export class DropdownDirective {
  
  @HostBinding("class.open") isOpen:boolean = false;
  @HostListener("click") toggleOpen(){
    this.isOpen = !this.isOpen;
  }
  constructor() { }

}
