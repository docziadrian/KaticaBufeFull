import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekFelveszComponent } from './termek-felvesz.component';

describe('TermekFelveszComponent', () => {
  let component: TermekFelveszComponent;
  let fixture: ComponentFixture<TermekFelveszComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TermekFelveszComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermekFelveszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
