import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StateService } from '../../services/state.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import {
  BehaviorSubject,
  Observable,
  combineLatest,
  interval,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { MatNativeDateModule, NativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-date-select',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatInputModule
  ],
  templateUrl: './date-select.component.html',
  styleUrl: './date-select.component.css',
  providers: [NativeDateAdapter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateSelectComponent {
  months: string[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  
  years: any[] = this.getYearRange();

  isLastMonth: boolean = false;
  isFirstMonth: boolean = true;

  playSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  play$: Observable<boolean>;

  dateForm: FormGroup;

  constructor(private fb: FormBuilder, private stateService: StateService) {
    this.dateForm = this.fb.group({
      selectedYear: [1980],
      selectedMonth: ['January'],
    });

    this.dateForm.valueChanges.subscribe(() => {
      const currentYearIndex = this.years.indexOf(this.dateForm.value.selectedYear);
      const currentMonthIndex = this.months.indexOf(this.dateForm.value.selectedMonth);

      this.isFirstMonth = currentYearIndex === 0 && currentMonthIndex === 0;
      if (currentYearIndex === this.years.length - 1 && currentMonthIndex === this.months.length - 1){
        this.isLastMonth = true
        this.playSubject.complete();
      }
    });

    this.play$ = this.playSubject.pipe(
      switchMap((play) =>
        play ? combineLatest([interval(1500), of(this.playSubject.value)]).pipe(
          map(([_, play]) => play)
        ) : of(play)
      ),
      tap((play) => play && this.goToNextMonth())
    );    
  }

  getYearRange(startYear: number = 1980): any[] {
    const currentYear = new Date().getFullYear();
    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
  }

  updateMonths(): void {
    let months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    if (this.dateForm.value.selectedYear === currentYear) {
      this.months = months.slice(0, currentMonth + 1);
    } else {
      this.months = months;
    }
  }

  updateSelectedElements(updatedElement: string): void {
    if (updatedElement === 'year') {
      this.stateService.setSelectedYear(this.dateForm.value.selectedYear);
      this.updateMonths()
    } else if (updatedElement === 'month') {
      this.stateService.setSelectedMonth(this.months.indexOf(this.dateForm.value.selectedMonth));
    }
  }

  goToNextMonth(): void {
    const currentMonthIndex = this.months.indexOf(this.dateForm.value.selectedMonth);
    const currentYearIndex = this.years.indexOf(this.dateForm.value.selectedYear);

    if (currentMonthIndex === this.months.length - 1 && currentYearIndex === this.years.length - 1) {
      this.isLastMonth = true;
      this.playSubject.next(false);
      return;
    }

    if (currentMonthIndex === 0 && currentYearIndex === -1) {
      this.isFirstMonth = false;
    }

    if (currentMonthIndex < this.months.length - 1) {
      this.dateForm.patchValue({ selectedMonth: this.months[currentMonthIndex + 1] });
    } else {
      this.dateForm.patchValue({ selectedMonth: 'January', selectedYear: this.years[currentYearIndex + 1] });
      this.updateSelectedElements('year');
    }
    this.updateSelectedElements('month')
  }

  goToPreviousMonth(): void {
    const currentMonthIndex = this.months.indexOf(this.dateForm.value.selectedMonth);
    const currentYearIndex = this.years.indexOf(this.dateForm.value.selectedYear);

    if (currentMonthIndex === 0 && currentYearIndex === 0) {
      this.isFirstMonth = true;
      return;
    }

    if (currentMonthIndex === this.months.length - 1 && currentYearIndex === this.years.length - 1) {
      this.isLastMonth = false;
    }

    if (currentMonthIndex > 0) {
      this.dateForm.patchValue({ selectedMonth: this.months[currentMonthIndex - 1] });
    } else {
      this.dateForm.patchValue({ selectedMonth: 'December', selectedYear: this.years[currentYearIndex - 1] });
      this.updateSelectedElements('year');
    }
    this.updateSelectedElements('month')
  }

  play(): void {
    this.playSubject.next(!this.playSubject.value);
  }

}

