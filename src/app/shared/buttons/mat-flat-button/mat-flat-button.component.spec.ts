import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFlatButtonComponent } from './mat-flat-button.component';

describe('MatFlatButtonComponent', () => {
  let component: MatFlatButtonComponent;
  let fixture: ComponentFixture<MatFlatButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatFlatButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatFlatButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
