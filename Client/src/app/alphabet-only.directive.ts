import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appAlphabetOnly]'
})
export class AlphabetOnlyDirective {

  constructor(private ngControl: NgControl) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    value = value.replace(/[^a-zA-Z]/g, '');
    this.ngControl.control?.setValue(value);
  }
}