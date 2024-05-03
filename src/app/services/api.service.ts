import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { switchMap, Observable, map, catchError, of } from 'rxjs';
import { StateService, SelectedElements } from './state.service';

interface QueryParams extends Partial<SelectedElements> {}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  URL =
    'http://aqi-apis-flask-env.eba-mjnqwgme.us-east-2.elasticbeanstalk.com/';
  http = inject(HttpClient);

  states = inject(StateService);

  get<S>(uri: string, elements: QueryParams) {
    const url = this.URL + uri;

    let params = new HttpParams();
    if (elements.element) {
      params = params.set('element', elements.element);
    }

    if (elements.year) {
      params = params.set('year', elements.year.toString());
    }

    if (elements.month !== undefined) {
      params = params.set('month', (elements.month + 1).toString());
    }

    if (elements.state) {
      params = params.set('state', elements.state);
      if (elements.county) {
        params = params.set('county', elements.county);
      }
    }

    return this.http.get<S>(url, { params });
  }

  averageValueByName(
    elements: SelectedElements
  ): Observable<{ name: string; value: number }[]> {
    return elements.state
      ? this.averageValueByCounty(elements)
      : this.averageValueByState(elements);
  }

  averageValue(elements: SelectedElements): Observable<string> {
    return this.get<{ average_value: string }>('/average_value', elements).pipe(
      map((val) => parseFloat(val.average_value).toFixed(2))
    );
  }

  averageByYear(
    elements: SelectedElements
  ): Observable<{ name: string; value: number }[]> {
    
    return this.get<{ name: string; value: number }[]>(
      '/avg_by_year',
      {
        element: elements.element,
        state: elements.state,
        county: elements.county
      }
    );
  }

  numberOfRecords(elements: SelectedElements): Observable<string> {
    return this.get<{ count: number }>('/count', elements).pipe(
      map((val) => val.count.toString())
    );
  }

  numberOfObservations(elements: SelectedElements): Observable<string> {
    return this.get<{ count: number }>('/observation_count', elements).pipe(
      map((val) => val.count.toString())
    );
  }

  averageValueByDay(elements: SelectedElements) {
    return this.get<{ label: string; value: number }[]>(
      '/avg_by_day',
      elements
    );
  }

  averageValueBySeason(elements: SelectedElements) {
    return this.get<{ season: string; value: number }[]>(
      '/avg_by_season',
      {
        element: elements.element,
        year: elements.year,
        state: elements.state,
        county: elements.county
      }
    );
  }

  averageValueByHour(elements: SelectedElements) {
    return this.get<{ label: string; value: number }[]>(
      '/max_hours',
      elements
    ).pipe(catchError(() => of([])));
  }

  averageValueByCounty(elements: SelectedElements) {
    return this.get<{ name: string; value: number }[]>(
      '/avg_by_county',
      {
        year: elements.year,
        element: elements.element,
        month: elements.month,
        state: elements.state
      }
    );
  }

  averageValueByState(elements: SelectedElements) {
    return this.get<{ name: string; value: number }[]>(
      '/avg_by_state',
      {
        year: elements.year,
        element: elements.element,
        month: elements.month
      }
    );
  }
  airQualityCategory(elements: SelectedElements) {
    return this.get<{ name: string; value: number }[]>(
      '/air_quality_category',
      elements
    );
  }
  airQualityComparaison(elements: SelectedElements) {
    return this.get<{ name: string; value: number }[]>(
      '/air_quality_comparaison',
      {
        year: elements.year,
        state: elements.state,
        month: elements.month,
        county: elements.county
      }
    );
  }
}
