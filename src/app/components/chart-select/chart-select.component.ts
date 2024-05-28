import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { ChartComponent } from '../chart/chart.component';
import {
  Observable,
  Subject,
  catchError,
  combineLatest,
  map,
  of,
  startWith,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-chart-select',
  standalone: true,
  imports: [
    MatSelectModule,
    ChartComponent,
    ReactiveFormsModule,
    AsyncPipe,
    MatProgressSpinnerModule,
    CommonModule,
  ],
  templateUrl: './chart-select.component.html',
  styleUrl: './chart-select.component.css',
})
export class ChartSelectComponent {
  dataService = inject(DataService);
  formBuilder = inject(FormBuilder);

  colors = [
    '#5972ff',
    '#75daff',
    '#ff5479',
    '#bcff75',
    '#ff5959',
    '#a959ff',
    '#ffbd59',
  ];

  chartData$!: Observable<any>;
  chartForm!: FormGroup;

  chartNumbers = [0, 1, 2, 3, 4, 5];
  chartTypes = ['doughnut', 'bar', 'bar', 'bar', 'bar', 'pie'];
  chartData = [
    this.dataService.categories$,
    this.dataService.avgValuesByYear$,
    this.dataService.avgValuesByDay$,
    this.dataService.avgValueBySeason$,
    this.dataService.maxCountByHour$,
    this.dataService.pollutionElements$,
  ];
  chartTitles = [
    'Levels of concern across the USA',
    'Air Quality through the years',
    'Air Quality Daily Trends',
    'Air Quality Seasonal Trends',
    'Air Quality Hourly Trends',
    'Pollutant Elements',
  ];

  isLoading$ = new Subject<boolean>();

  ngOnInit() {
    this.chartForm = this.formBuilder.group({
      selectedTitle: [0], // Initial value
    });

    setTimeout(() => {
      this.chartData$ = this.chartForm.valueChanges.pipe(
        startWith({ selectedTitle: 0 }), // Emit initial value
        tap(() => this.isLoading$.next(true)),
        map((source) => source.selectedTitle),
        switchMap((value) =>
          combineLatest([this.chartData[value], of(value)]).pipe(
            catchError(() => of([[], value]))
          )
        ),
        map(([chartData, value]) => ({
          title: this.chartTitles[value],
          data: chartData,
          type: this.chartTypes[value],
        })),
        tap(() => this.isLoading$.next(false)),
      );
    });
  }

  getValues(list: any[], key: string): any[] {
    return list.map((el) => el[key]);
  }
}
