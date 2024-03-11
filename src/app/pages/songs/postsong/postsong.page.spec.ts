import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsongPage } from './postsong.page';

describe('PostsongPage', () => {
  let component: PostsongPage;
  let fixture: ComponentFixture<PostsongPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostsongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
