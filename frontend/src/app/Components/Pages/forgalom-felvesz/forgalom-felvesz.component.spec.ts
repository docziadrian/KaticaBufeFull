import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgalomFelveszComponent } from './forgalom-felvesz.component';

describe('ForgalomFelveszComponent', () => {
  let component: ForgalomFelveszComponent;
  let fixture: ComponentFixture<ForgalomFelveszComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgalomFelveszComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgalomFelveszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
