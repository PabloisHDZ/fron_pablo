import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomealbumPage } from './homealbum.page';

describe('HomealbumPage', () => {
  let component: HomealbumPage;
  let fixture: ComponentFixture<HomealbumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomealbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
