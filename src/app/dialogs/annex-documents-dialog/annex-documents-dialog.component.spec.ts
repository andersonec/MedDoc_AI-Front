import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexDocumentsDialogComponent } from './annex-documents-dialog.component';

describe('AnnexDocumentsDialogComponent', () => {
  let component: AnnexDocumentsDialogComponent;
  let fixture: ComponentFixture<AnnexDocumentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnnexDocumentsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnexDocumentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
