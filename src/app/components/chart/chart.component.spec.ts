import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { By } from '@angular/platform-browser';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({}).compileComponents();
    fixture = TestBed.createComponent(ChartComponent); // Créer le composant directement dans le test
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should create a chart with the specified title', () => {
    component.title = 'Test Chart';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.chart-title'));
    expect(titleElement).not.toBeNull(); // Vérifier si l'élément avec la classe .chart-title existe
    expect(titleElement.nativeElement.textContent).toContain('Test Chart'); // Vérifier que le texte du titre est correct
  }); */
});
