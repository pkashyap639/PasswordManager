import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultModalComponent } from './vault-modal.component';

describe('VaultModalComponent', () => {
  let component: VaultModalComponent;
  let fixture: ComponentFixture<VaultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VaultModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
