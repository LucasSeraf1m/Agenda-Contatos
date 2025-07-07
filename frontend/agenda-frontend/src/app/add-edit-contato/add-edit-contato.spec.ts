import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContato } from './add-edit-contato';

describe('AddEditContato', () => {
  let component: AddEditContato;
  let fixture: ComponentFixture<AddEditContato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditContato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditContato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
