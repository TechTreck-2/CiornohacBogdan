import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTimeoffComponent } from './card-timeoff.component';

describe('CardTimeoffComponent', () => {
  let component: CardTimeoffComponent;
  let fixture: ComponentFixture<CardTimeoffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTimeoffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTimeoffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
