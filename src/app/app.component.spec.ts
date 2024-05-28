import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapsModule, MapsTooltipService, LegendService, ColorMappingSettings, LayerSettings, ZoomSettings } from '@syncfusion/ej2-angular-maps';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MapsModule, HttpClientModule, NoopAnimationsModule], // Add HttpClientModule to imports
      providers: [MapsTooltipService, LegendService, LayerSettings, ZoomSettings, ColorMappingSettings]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
