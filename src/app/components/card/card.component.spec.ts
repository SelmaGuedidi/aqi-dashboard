import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatIconModule],
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.color = 'rgb(0, 0, 0)'; // Set input values here
    component.icon = 'star';
    component.title = 'Test Title';
    component.value = 'Test Value';
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct color based on input', () => {
    const color = 'rgb(0, 0, 0)';
    component.color = color;
    fixture.detectChanges();
    const contentElement = fixture.debugElement.query(By.css('mat-card-content')).nativeElement;
    const computedColor = getComputedStyle(contentElement).color;
    expect(computedColor).toBe(color);
});


  it('should display different icons based on input', () => {
    const icon = 'star';
    component.icon = icon;
    fixture.detectChanges();
    const valueElement = fixture.debugElement.query(By.css('.icon')).nativeElement;
    const iconName = valueElement.getAttribute('ng-reflect-font-icon');
    expect(iconName).toBe(icon);
});


  it('should display the correct value', () => {
    const testValue = 'Test Value';
    component.value = testValue;
    fixture.detectChanges();
    const valueElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(valueElement.textContent.trim()).toBe(testValue);
  });

  it('should display the correct title', () => {
    const testTitle = 'Test Title';
    component.title = testTitle;
    fixture.detectChanges();
    const contentElement = fixture.debugElement.query(By.css('mat-card-content')).nativeElement;
    expect(contentElement.textContent.trim()).toBe(testTitle);
  });
});
