import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxDigitValidator(maxDigits: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const digitCount = value ? value.toString().replace(/\D/g, '').length : 0;
    return digitCount > maxDigits ? { maxDigits: true } : null;
  };
}

// Usage example
const amountControl = new FormControl('', [maxDigitValidator(18)]);
