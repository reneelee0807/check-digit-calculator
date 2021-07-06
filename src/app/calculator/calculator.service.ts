import { Injectable } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
    constructor(private fb: FormBuilder) {}

    public getForm(): FormGroup {
        return this.fb.group({ barcode: [null, Validators.required] });
    }

    public getCheckDigit(barcode: number): number {
        const digits = this.convertBarcodeToDigits(barcode);
        const sum = this.getSummedFigure(digits);
        const modTenFigure = this.getDigitModTen(sum);
        const endNum = this.getDigitSubtractTen(modTenFigure);
        return endNum === 10 ? 0 : endNum;
    }

    private convertBarcodeToDigits(barcode: number): string[] {
        return barcode.toString().split('');
    }

    private getSummedFigure(digits: string[]): number {
        return digits.reduce((acc, digit, index) => {
            if (index % 2 === 0) {
                acc += parseInt(digit);
            } else {
                acc += parseInt(digit) * 3;
            }
            return acc;
        }, 0);
    }

    private getDigitModTen(digit: number): number {
        return digit % 10;
    }

    private getDigitSubtractTen(digit: number): number {
        return 10 - digit;
    }
}