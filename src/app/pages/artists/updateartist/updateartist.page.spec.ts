import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateartistPage } from './updateartist.page';

describe('UpdateartistPage', () => {
  let component: UpdateartistPage;
  let fixture: ComponentFixture<UpdateartistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateartistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
