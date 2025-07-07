import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridContatos } from './grid-contatos';

describe('GridContatos', () => {
  let component: GridContatos;
  let fixture: ComponentFixture<GridContatos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridContatos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridContatos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
