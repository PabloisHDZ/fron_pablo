import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatealbumPage } from './updatealbum.page';

describe('UpdatealbumPage', () => {
  let component: UpdatealbumPage;
  let fixture: ComponentFixture<UpdatealbumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatealbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
