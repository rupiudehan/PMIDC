import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpecialCharactersAndNumbers(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !/^[A-Za-z\s]*$/.test(value)) {
      return { noSpecialCharactersAndNumbers: true };
    }
    return null;
  };
}