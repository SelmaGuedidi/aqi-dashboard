import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { DataService } from '../../services/data.service';
import { ChartComponent } from '../chart/chart.component';
import { StateService } from '../../services/state.service';
import { InteractiveMapComponent } from '../interactive-map/interactive-map.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { DateSelectComponent } from '../date-select/date-select.component';
import { ChartSelectComponent } from '../chart-select/chart-select.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importer HttpClientTestingModule
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, NoopAnimationsModule, HttpClientModule], // Include NoopAnimationsModule
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a navbar', () => {
    const navbarElement = fixture.nativeElement.querySelector('app-navbar');
    expect(navbarElement).toBeTruthy();
  });

  it('should contain an interactive map', () => {
    const mapElement = fixture.nativeElement.querySelector('app-interactive-map');
    expect(mapElement).toBeTruthy();
  });

  it('should contain cards', () => {
    const cardElements = fixture.nativeElement.querySelectorAll('.dashboard-card');
    expect(cardElements.length).toBeGreaterThan(0);
  });

  it('should contain a chart select component', () => {
    const chartSelectElement = fixture.nativeElement.querySelector('app-chart-select');
    expect(chartSelectElement).toBeTruthy();
  });
});
