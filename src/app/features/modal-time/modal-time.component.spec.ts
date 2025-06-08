import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTimeComponent } from './modal-time.component';

describe('ModalTimeComponent', () => {
  let component: ModalTimeComponent;
  let fixture: ComponentFixture<ModalTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
