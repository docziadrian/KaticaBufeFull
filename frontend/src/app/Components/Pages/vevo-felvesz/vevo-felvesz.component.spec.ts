import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VevoFelveszComponent } from './vevo-felvesz.component';

describe('VevoFelveszComponent', () => {
  let component: VevoFelveszComponent;
  let fixture: ComponentFixture<VevoFelveszComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VevoFelveszComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VevoFelveszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
