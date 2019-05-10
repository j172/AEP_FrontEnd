import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCheckinSinglefileComponent } from './modal-checkin-singlefile.component';

describe('ModalCheckinSinglefileComponent', () => {
  let component: ModalCheckinSinglefileComponent;
  let fixture: ComponentFixture<ModalCheckinSinglefileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCheckinSinglefileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCheckinSinglefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
