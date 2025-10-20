import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekMegjelenitComponent } from './termek-megjelenit.component';

describe('TermekMegjelenitComponent', () => {
  let component: TermekMegjelenitComponent;
  let fixture: ComponentFixture<TermekMegjelenitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermekMegjelenitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermekMegjelenitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
