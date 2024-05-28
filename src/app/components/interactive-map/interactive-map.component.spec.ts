import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InteractiveMapComponent } from './interactive-map.component';
import { MapsModule } from '@syncfusion/ej2-angular-maps'; // Import necessary modules
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('InteractiveMapComponent', () => {
  let component: InteractiveMapComponent;
  let fixture: ComponentFixture<InteractiveMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MapsModule, HttpClientModule, NoopAnimationsModule], // Import necessary modules
      providers: [] // You can provide any necessary services here
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
