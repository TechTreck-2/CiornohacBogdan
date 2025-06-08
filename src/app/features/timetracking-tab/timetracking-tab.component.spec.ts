import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetrackingTabComponent } from './timetracking-tab.component';

describe('TimetrackingTabComponent', () => {
  let component: TimetrackingTabComponent;
  let fixture: ComponentFixture<TimetrackingTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetrackingTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimetrackingTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
