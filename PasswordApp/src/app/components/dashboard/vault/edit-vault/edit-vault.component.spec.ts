import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVaultComponent } from './edit-vault.component';

describe('EditVaultComponent', () => {
  let component: EditVaultComponent;
  let fixture: ComponentFixture<EditVaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditVaultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
