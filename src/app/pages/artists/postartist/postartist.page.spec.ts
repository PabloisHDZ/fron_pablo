import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostartistPage } from './postartist.page';

describe('PostartistPage', () => {
  let component: PostartistPage;
  let fixture: ComponentFixture<PostartistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostartistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
