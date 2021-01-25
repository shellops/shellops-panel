import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodePosteComponent } from './node-poste.component';

describe('NodePosteComponent', () => {
  let component: NodePosteComponent;
  let fixture: ComponentFixture<NodePosteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodePosteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodePosteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
