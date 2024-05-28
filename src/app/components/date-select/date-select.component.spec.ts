import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DateSelectComponent } from './date-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { NativeDateAdapter } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importer BrowserAnimationsModule

describe('DateSelectComponent', () => {
  let component: DateSelectComponent;
  let fixture: ComponentFixture<DateSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatInputModule,
        CommonModule,
        BrowserAnimationsModule // Ajouter BrowserAnimationsModule
      ],
      providers: [
        StateService,
        NativeDateAdapter
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    expect(component.dateForm).toBeTruthy();
  });

  it('should go to next month when button is clicked', () => {
    const currentMonth = component.dateForm.get('selectedMonth')?.value;
    component.goToNextMonth();
    fixture.detectChanges();
    expect(component.dateForm.get('selectedMonth')?.value).not.toEqual(currentMonth);
  });

  it('should go to previous month when button is clicked', () => {
    component.dateForm.get('selectedMonth')?.setValue('December');
    fixture.detectChanges();
    const currentMonth = component.dateForm.get('selectedMonth')?.value;
    component.goToPreviousMonth();
    fixture.detectChanges();
    expect(component.dateForm.get('selectedMonth')?.value).not.toEqual(currentMonth);
  });

  it('should toggle play/pause state when play button is clicked', () => {
    const initialPlayState = component.playSubject.value;
    component.play();
    expect(component.playSubject.value).toEqual(!initialPlayState);
  });
});
