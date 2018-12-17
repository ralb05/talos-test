import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  visible = true;
  label = '';
  constructor(private router: Router) {
  }

  ngOnInit() {

  }
  add(): void {
    this.router.navigate([`/add`]);
  }
  changeText(boolText: boolean){
    this.label = boolText === true ? 'Add new post' : '';
  }
  hideBtn(){
    this.visible = false;
  }

  showBtn(){
    this.visible = true;
  }
}
