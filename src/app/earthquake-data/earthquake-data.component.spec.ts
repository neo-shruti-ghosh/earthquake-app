import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarthquakeDataComponent } from './earthquake-data.component';

describe('EarthquakeDataComponent', () => {
  let component: EarthquakeDataComponent;
  let fixture: ComponentFixture<EarthquakeDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarthquakeDataComponent]
    });
    fixture = TestBed.createComponent(EarthquakeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
