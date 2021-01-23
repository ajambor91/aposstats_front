import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[addComponent]'
})
export class AddComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
