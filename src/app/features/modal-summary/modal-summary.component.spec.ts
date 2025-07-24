import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSummaryComponent } from './modal-summary.component';

describe('ModalSummaryComponent', () => {
  let component: ModalSummaryComponent;
  let fixture: ComponentFixture<ModalSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSummaryComponent);
    component = fixture.componentInstance;
    component.ticketType = 'Vacanta'; // Required input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when closeModal is called', () => {
    spyOn(component.close, 'emit');
    component.closeModal();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('should emit submit event with correct ticket when submitTicket is called', () => {
    spyOn(component.submit, 'emit');
    const start = new Date('2024-07-01');
    const end = new Date('2024-07-05');
    component.range.setValue({ start, end });
    component.daysOff = 5;
    component.submitTicket();
    expect(component.submit.emit).toHaveBeenCalledWith({
      type: 'Vacanta',
      status: 'In asteptare',
      start: '2024-07-01',
      finish: '2024-07-05',
      duration: 5,
    });
  });

  it('should set daysOff to 0 if start or end is missing', () => {
    component.range.setValue({ start: null, end: null });
    component.updateDaysOff();
    expect(component.daysOff).toBe(0);
  });

  it('should call closeModalOnBackdrop and close modal if event target is currentTarget', () => {
    spyOn(component, 'closeModal');
    const event = { target: 1, currentTarget: 1 } as any;
    component.closeModalOnBackdrop(event as Event);
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should not call closeModalOnBackdrop if event target is not currentTarget', () => {
    spyOn(component, 'closeModal');
    const event = { target: 1, currentTarget: 2 } as any;
    component.closeModalOnBackdrop(event as Event);
    expect(component.closeModal).not.toHaveBeenCalled();
  });
});
