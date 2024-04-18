import { Injectable, inject } from '@angular/core';
import { Observable, distinctUntilChanged, map, of, shareReplay, switchMap, tap } from 'rxjs';
import { StateService } from './state.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiService = inject(ApiService)
  stateService = inject(StateService)

  averageValue$: Observable<string>;
  numberOfRecords$: Observable<string>;
  numberOfObservations$: Observable<string>;
  avgValueBySeason$: Observable<{ season: string; value: number }[]> = of([]);
  avgValuesByName$: Observable<{ name: string; value: number }[]> = of([]);
  avgValuesByDay$: Observable<{ label: string; value: number }[]>;
  maxCountByHour$: Observable<{ label: string; value: number }[]>;

  pollutionElements$: Observable<{ name: string; value: number }[]> = of([]);
  categories$: Observable<{ name: string; value: number }[]> = of([]);  

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  constructor() {
    
    let selectedElements$ = this.stateService.selectedElements$.pipe(
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.averageValue$ = selectedElements$.pipe(
      switchMap((elements) => {
        return this.apiService.averageValue(elements);
      }),
      tap((res)=> console.log(res)),
    );

    this.numberOfRecords$ = selectedElements$.pipe(
      switchMap((elements) => this.apiService.numberOfRecords(elements))
    );

    this.numberOfObservations$ = selectedElements$.pipe(
      switchMap((elements) => {
        return this.apiService.numberOfObservations(elements);
      })
    );

    this.avgValuesByName$ = selectedElements$.pipe(
      distinctUntilChanged((prev, next)=> !(prev.county == next.county)),
      switchMap((elements) => this.apiService.averageValueByName(elements))
    )

    this.pollutionElements$ = selectedElements$.pipe(
      switchMap((elements)=> this.apiService.airQualityComparaison(elements))
    );

    this.categories$ = selectedElements$.pipe(
      switchMap((elements)=> this.apiService.airQualityCategory(elements))
    );

    this.avgValuesByDay$ = selectedElements$.pipe(
      switchMap((elements)=> this.apiService.averageValueByDay(elements))
    );
    
    this.maxCountByHour$ = selectedElements$.pipe(
      switchMap((elements)=> this.apiService.averageValueByHour(elements))
    );
    
    this.avgValueBySeason$ = selectedElements$.pipe(
      switchMap((elements) => this.apiService.averageValueBySeason(elements))
    );    
  }
}