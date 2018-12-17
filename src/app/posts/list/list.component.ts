import { Component, OnInit } from '@angular/core';
import {Posts} from '../../_models/posts';
import {Router} from '@angular/router';
import {PostsService} from '../../_services/postsservice';
import {LayoutComponent} from '../../shared/layout/layout.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Array<Posts>;
  publicUrl = 'http://localhost:3000/';
  label = '';
  constructor(private postsService: PostsService,
              private router: Router,
              private layoutComponent: LayoutComponent) {
    postsService.getList()
    .subscribe(data => {
      this.list = data;
    });
  }

  ngOnInit() {
    this.layoutComponent.showBtn();
  }

  add(): void {
    this.router.navigate([`/add`]);
  }

  view(id: number): void {
    this.router.navigate([`/view/${id}`]);
  }
  changeText(boolText: boolean){
    this.label = boolText === true ? 'Add new post' : '';
  }
}
