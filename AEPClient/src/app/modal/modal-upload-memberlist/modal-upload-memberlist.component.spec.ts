import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUploadMemberlistComponent } from './modal-upload-memberlist.component';

describe('ModalUploadMemberlistComponent', () => {
  let component: ModalUploadMemberlistComponent;
  let fixture: ComponentFixture<ModalUploadMemberlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUploadMemberlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUploadMemberlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
