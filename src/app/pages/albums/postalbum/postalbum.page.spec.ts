import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostalbumPage } from './postalbum.page';

describe('PostalbumPage', () => {
  let component: PostalbumPage;
  let fixture: ComponentFixture<PostalbumPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostalbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
