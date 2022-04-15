import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreCardChoiceComponent } from './score-card-choice.component';

describe('ScoreCardChoiceComponent', () => {
  let component: ScoreCardChoiceComponent;
  let fixture: ComponentFixture<ScoreCardChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreCardChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreCardChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
