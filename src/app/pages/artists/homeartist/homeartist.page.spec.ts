import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeartistPage } from './homeartist.page';

describe('HomeartistPage', () => {
  let component: HomeartistPage;
  let fixture: ComponentFixture<HomeartistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeartistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
