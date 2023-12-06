import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowvideoComponent } from './showvideo.component';

describe('ShowvideoComponent', () => {
  let component: ShowvideoComponent;
  let fixture: ComponentFixture<ShowvideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowvideoComponent]
    });
    fixture = TestBed.createComponent(ShowvideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
