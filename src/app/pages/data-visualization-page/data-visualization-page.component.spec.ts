import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVisualizationPageComponent } from './data-visualization-page.component';

describe('DataVisualizationPageComponent', () => {
  let component: DataVisualizationPageComponent;
  let fixture: ComponentFixture<DataVisualizationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataVisualizationPageComponent]
    });
    fixture = TestBed.createComponent(DataVisualizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
