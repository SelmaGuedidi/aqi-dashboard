import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChartSelectComponent } from './chart-select.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../services/data.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ChartSelectComponent', () => {
  let component: ChartSelectComponent;
  let fixture: ComponentFixture<ChartSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule],
      providers: [DataService, FormBuilder]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form group', () => {
    expect(component.chartForm).toBeTruthy();
    expect(component.chartForm.controls['selectedTitle']).toBeTruthy();
  });
});
