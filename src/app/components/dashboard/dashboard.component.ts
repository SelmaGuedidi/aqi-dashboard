import { Component, SimpleChange, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AsyncPipe, CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card';
import { AqiDataService } from '../../services/aqi-data.service';
import { ComponentType } from '../../enums/component-type.enum';
import { CardComponent } from '../card/card.component';
import { MapComponent } from '../map/map.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatRadioModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    CommonModule,
    CardComponent,
    MapComponent,

  ],
})
export class DashboardComponent {
[x: string]: any;
  private breakpointObserver = inject(BreakpointObserver);
  service = inject(AqiDataService);
  data$ = this.service.aqiData$;

  avgaqi$: Observable<string>
  obssum$: Observable<string>

  showCounties: boolean = false

  constructor(){
    this.avgaqi$ = this.service.averageAqi()
    this.obssum$ = this.service.numberOfObservations()
  }

  ngOnChanges(changes: SimpleChange){
    console.log(changes)
  }
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Avg', cols: 1, rows: 1, componentType: ComponentType.MINICARD },
          { title: 'Records Count', cols: 1, rows: 1, componentType: ComponentType.MINICARD  },
          { title: 'Obs Count', cols: 1, rows: 1, componentType: ComponentType.MINICARD  },
          { title: 'Map', cols: 3, rows: 2, componentType: ComponentType.MAP  },
          { title: 'Distribution', cols: 3, rows: 2 },
          { title: 'Seasonal Trends', cols: 3, rows: 1 },
          { title: 'Quality', cols: 3, rows: 1 },
        ];
      }

      return [
        { title: 'Avg', cols: 1, rows: 1, componentType: ComponentType.MINICARD },
        { title: 'Records Count', cols: 1, rows: 1, componentType: ComponentType.MINICARD },
        { title: 'Obs Count', cols: 1, rows: 1, componentType: ComponentType.MINICARD },
        { title: 'Map', cols: 3, rows: 2, componentType: ComponentType.MAP },
        { title: 'Distribution', cols: 1, rows: 2 },
        { title: 'Seasonal Trends', cols: 2, rows: 1 },
        { title: 'Quality', cols: 2, rows: 1 },
      ];
    })
  );

}