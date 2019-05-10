import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCheckinMultifilesComponent } from './modal-checkin-multifiles.component';

describe('ModalCheckinMultifilesComponent', () => {
  let component: ModalCheckinMultifilesComponent;
  let fixture: ComponentFixture<ModalCheckinMultifilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCheckinMultifilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCheckinMultifilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
