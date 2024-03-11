import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatesongPage } from './updatesong.page';

describe('UpdatesongPage', () => {
  let component: UpdatesongPage;
  let fixture: ComponentFixture<UpdatesongPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdatesongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
