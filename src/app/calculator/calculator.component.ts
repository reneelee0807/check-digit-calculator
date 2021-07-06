
import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { CalculatorService } from './calculator.service';

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent {
    public form: FormGroup;
    public checkDigit: number = 0;
    public displayResult: boolean = false;
    private ngUnsubscribe$ = new Subject();

    constructor(private calculatorService: CalculatorService) {
        this.form = this.calculatorService.getForm();
        this.barcodeFormControl.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(300), takeUntil(this.ngUnsubscribe$))
            .subscribe(() => (this.displayResult = false));
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }

    public onSubmit(form: FormGroup) {
        this.checkDigit = this.calculatorService.getCheckDigit(form.value.barcode);
        this.displayResult = true;
    }

    public reset() {
        this.barcodeFormControl.patchValue(null);
    }

    public get barcodeFormControl(): AbstractControl {
        return this.form.controls.barcode;
    }
}