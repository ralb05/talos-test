import { Component, OnInit } from '@angular/core';
import {Posts} from '../../_models/posts';
import {PostsService} from '../../_services/postsservice';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {LayoutComponent} from '../../shared/layout/layout.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  data: Posts;
  publicUrl = 'http://localhost:3000/';
  id: string;
  constructor(private postsService: PostsService,
              private router: Router,
              private route: ActivatedRoute,
              private layoutComponent: LayoutComponent) {
    route.params.subscribe((params: Params) => {
      this.id = (params['id']) ? params['id'] : undefined;
      if (this.id) {
        postsService.getById(this.id)
        .subscribe(data => {
          this.data = data;
        });
      }
    });
  }

  ngOnInit() {
    this.layoutComponent.showBtn();
  }

  back(): void {
    this.router.navigate([`/`]);
  }

}
