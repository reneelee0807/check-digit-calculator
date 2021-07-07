import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from './calculator.service';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  let debugElement: DebugElement;
  let componentElement: HTMLElement;

  function getElement(selector: string) {
    return debugElement.query(By.css(selector)).nativeElement
  }

  function getCheckDigitValue() {
    return componentElement.querySelector("#checkDigit")?.textContent?.trim()
  }

  function setClickAction(selector: string) {
    const element = debugElement.nativeElement.querySelector(selector);
    element.click()
    fixture.detectChanges()
  }

  function setBarcodeValue(value: number | null) {
    const input = getElement('#barcode');
    input.value = value;
    input.dispatchEvent(new Event('input'))
    fixture.detectChanges();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CalculatorComponent],
      providers: [{ provide: CalculatorService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    componentElement = fixture.nativeElement
    fixture.detectChanges();
    setBarcodeValue(null)
    fixture.detectChanges();
  });

  it('check digit should be 4 when barcode is 978014300723', () => {
    setBarcodeValue(978014300723)
    setClickAction('#submitBtn')
    const checkDigitElement = getCheckDigitValue()
    expect(checkDigitElement).toEqual('4')
  });

  it('check digit should be 0 when barcode is 9780306406157 which end number is 10', () => {
    setBarcodeValue(9780306406157)
    setClickAction('#submitBtn')
    const checkDigitElement = getCheckDigitValue()
    expect(checkDigitElement).toEqual('0')
  })


  it('should not display result when barcode input box is changed after clicking submit button', () => {
    setBarcodeValue(9780306406157)
    setClickAction('#submitBtn')
    const checkDigitElement = getCheckDigitValue()
    expect(checkDigitElement).toEqual('0')
    setBarcodeValue(978030640615)
    const resultElement = getElement("#result")
    expect(resultElement).toBeFalsy
  });

  it('should clear input box when clicking reset', () => {
    setBarcodeValue(9780306406157)
    setClickAction('#resetBtn')
    const input = getElement('#barcode');
    expect(input.value).toEqual('')

  });

  it('reset button and submit button should be disabled when barcode input box is empty', () => {
    const resetBtnEleAttribute = getElement("#resetBtn").disabled
    const submitBtnElement = getElement("#submitBtn").disabled
    expect(resetBtnEleAttribute).toBeTrue;
    expect(submitBtnElement).toBeTrue;
  })

  it('reset button and submit button should be ebled when barcode input box is not empty', () => {
    setBarcodeValue(9780306406157)
    const resetBtnEleAttribute = getElement("#resetBtn").disabled
    const submitBtnElement = getElement("#submitBtn").disabled
    expect(resetBtnEleAttribute).toBeFalse;
    expect(submitBtnElement).toBeFalse;
  })

});
