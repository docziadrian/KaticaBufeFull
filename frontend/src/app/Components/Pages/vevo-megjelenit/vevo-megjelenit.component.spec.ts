import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VevoMegjelenitComponent } from './vevo-megjelenit.component';

describe('VevoMegjelenitComponent', () => {
  let component: VevoMegjelenitComponent;
  let fixture: ComponentFixture<VevoMegjelenitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VevoMegjelenitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VevoMegjelenitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
