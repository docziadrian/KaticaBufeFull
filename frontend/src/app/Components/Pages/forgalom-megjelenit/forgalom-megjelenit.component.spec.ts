import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgalomMegjelenitComponent } from './forgalom-megjelenit.component';

describe('ForgalomMegjelenitComponent', () => {
  let component: ForgalomMegjelenitComponent;
  let fixture: ComponentFixture<ForgalomMegjelenitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgalomMegjelenitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgalomMegjelenitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
