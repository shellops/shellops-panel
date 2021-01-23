import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDockerComponent } from './node-docker.component';

describe('NodeDockerComponent', () => {
  let component: NodeDockerComponent;
  let fixture: ComponentFixture<NodeDockerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeDockerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDockerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
