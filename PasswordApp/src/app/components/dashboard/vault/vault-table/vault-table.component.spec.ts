import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultTableComponent } from './vault-table.component';

describe('VaultTableComponent', () => {
  let component: VaultTableComponent;
  let fixture: ComponentFixture<VaultTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VaultTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VaultTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
