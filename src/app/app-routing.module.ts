import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './shared/layout/layout.component';
import {AddComponent} from './posts/add/add.component';
import {ListComponent} from './posts/list/list.component';
import {ViewComponent} from './posts/view/view.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: ListComponent},
      {path: 'add', component: AddComponent},
      {path: 'view/:id', component: ViewComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
