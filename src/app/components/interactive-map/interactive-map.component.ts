import { Component, ViewChild, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MapsModule,
  MapsTooltipService,
  LegendService,
  ColorMappingSettings,
  LayerSettings,
  MapsComponent,
  HighlightService,
  SelectionService,
  ZoomService,
} from '@syncfusion/ej2-angular-maps';
import { DataService } from '../../services/data.service';
import { StateService } from '../../services/state.service';

import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  distinctUntilChanged,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { states } from '../../utils/states';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
  imports: [
    MapsModule,
    CommonModule,
    AsyncPipe,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    MapsTooltipService,
    LegendService,
    HighlightService,
    SelectionService,
    ColorMappingSettings,
    LayerSettings,
    ZoomService,
  ],
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css',
})
export class InteractiveMapComponent {
  public layerOptions$: Observable<any[]>;
  @ViewChild('maps') maps!: MapsComponent;

  loading$ = new BehaviorSubject(true)
  usMapSelected = true;

  public LegendOptions: Object = {
    visible: true,
    dockOnMap: true,
    shape: 'Rectangle',

    position: 'Left',
    alignment: 'Center',

    valuePath: 'value',
    mode: 'Interactive',
    invertedPointer: true,
    textStyle: {
      size: '14px',

      fontFamily: 'Times New Roman',
      fontStyle: 'Sans-serif',
      fontWeight: 'Bold',
    },
    toggleLegendSettings: {
      enable: true,
      applyShapeSettings: false,
    },
  };
  data$!: Observable<Map<string, number>>;
  counties!: { [key: string]: Observable<Object> };
  states$!: Observable<any>;
  stateService = inject(StateService);
  selectedElement$: Observable<string>;
  stateSelected = false;
  public zoomSettings: object = { enable: true, maxZoom: 20 };

  colors!: { from: number; to: number; color: string[] }[];

  constructor(private service: DataService, private http: HttpClient) {
    this.selectedElement$ = this.stateService.selectedElements$.pipe(
      distinctUntilChanged(
        (prev, next) => prev.state == next.state && prev.county == next.county
      ),
      map((elements) =>
        elements.county
          ? elements.county + ', ' + elements.state
          : elements.state ?? ''
      )
    );
    this.states$ = http.get('United States of America.json');
    this.counties = this.loadCountyData();

    this.layerOptions$ = this.service.avgValuesByName$.pipe(
      switchMap((values) => {
        return this.stateService.state
          ? this.counties[this.stateService.state!].pipe(
              map((mapData) => ({ mapData, values }))
            )
          : this.states$.pipe(map((mapData) => ({ mapData, values })))
        }
      ),
      map(({ mapData, values }) => {
        if (mapData.crs) {
          this.colors = this.getColorMapping(values);
        }
        const layers = [
          {
            shapeData: mapData,
            dataSource: values,
            shapeDataPath: 'name',
            shapePropertyPath: 'name',
            tooltipSettings: {
              visible: true,
              valuePath: 'name',
              fill: 'black',
              textStyle: {
                color: 'white',
                fontFamily: 'Times New Roman',
                fontStyle: 'Sans-serif',
                fontWeight: 'Bold',
              },
              format: '<b>Name: ${name}</b><br><b>Average value: ${value}</b>',
            },
            highlightSettings: {
              enable: true,
              fill: '#A3B0D0',
            },
            selectionSettings: {
              enable: true,
              fill: '#4C515B',
              opacity: 1,
            },
            shapeSettings: {
              highlightColor: '#FFFFFF',
              border: { width: 0.6, color: 'black' },
              colorValuePath: 'value',
              colorMapping: this.colors,
            },
          },
        ];
        return layers;
      }),
      tap(()=> this.loading$.next(false))
    );
  }

  public shapeSelected(args: any): void {
    this.usMapSelected = false;

    const selectedShape: string = (args.data as any)['name'];
    if (this.stateService.state == null) {
      this.loading$.next(true)
      this.stateService.setSelectedState(selectedShape);
    } else {
      if (selectedShape !== this.stateService.county)
        this.stateService.setSelectedCounty(selectedShape);
      else this.stateService.setSelectedCounty(null);
    }
  }

  returnToUSAMap() {
    this.loading$.next(true)
    this.usMapSelected = true;
    this.stateService.setSelectedState(null);
  }

  private loadCountyData(): { [key: string]: Observable<Object> } {
    const requests: { [key: string]: Observable<Object> } = {};
    states.forEach((state) => {
      const request = this.http.get(`${state}.json`);
      requests[state] = request;
    });

    return requests;
  }

  getColorMapping(values: { name: string; value: number }[]) {
    if (!values || values.length === 0) {
      return [];
    }

    // Get the min and max values
    const min = Math.min(...values.map((value) => value.value));
    const max = Math.max(...values.map((value) => value.value));

    const step = Math.abs((max - min) / 4);

    // Define color gradient
    const catColors = ['#26f08b', '#fffa75', '#ffb875', '#d90909'];

    // Generate color mapping for each range
    let colors = [];
    for (let i = 3; i >= 0; i--) {
      let from = parseFloat((min + i * step).toFixed(2)) - 0.01;
      let to = parseFloat((min + (i + 1) * step).toFixed(2)) + 0.01;
      if (Math.floor(from) !== Math.floor(to)) {
        from = Math.trunc(from) - 1;
        to = Math.trunc(to) + 1;
      }
      colors.push({ from, to, color: [catColors[i]] });
    }

    return colors;
  }
}
