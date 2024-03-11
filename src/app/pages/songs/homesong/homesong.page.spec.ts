import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomesongPage } from './homesong.page';

describe('HomesongPage', () => {
  let component: HomesongPage;
  let fixture: ComponentFixture<HomesongPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomesongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
