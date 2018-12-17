import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PostsService} from '../../_services/postsservice';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {Location} from '@angular/common';
import {Message} from 'primeng/components/common/message';
import {Posts} from '../../_models/posts';
import {LayoutComponent} from '../../shared/layout/layout.component';

@Component({
             selector: 'app-add',
             templateUrl: './add.component.html',
             styleUrls: ['./add.component.scss'],
             providers: [ConfirmationService]
           })
export class AddComponent implements OnInit {
  mainObj: Posts = new Posts();
  publicUrl = 'http://localhost:3000/';
  msgs: Array<Message> = [];
  disabled = false;
  uploadFile : any;
  constructor(private postsService: PostsService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private location: Location,
              private layoutComponent: LayoutComponent
  ) {
  }

  ngOnInit() {
    this.layoutComponent.hideBtn();
  }

  onSubmit(): void {
    this.postsService.add(this.mainObj)
    .subscribe(data => {
      this.saveFile(data.id);
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Éxito', detail: 'Record added correctly.'});
      setTimeout(() => this.msgs = [], 3000);
    }, error => {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error saving / Try again.'});
      setTimeout(() => this.msgs = [], 3000);
    });
  }

  onBack(fDirty: boolean): void {
    if (fDirty) {
      this.confirmationService.confirm({
                                         message: `You are sure you want to exit without saving?`,
                                         header: 'Confirmación',
                                         icon: 'fa fa-question-circle',
                                         accept: () => {
                                           this.router.navigate([`/`]);
                                         }
                                       });
    } else {
      this.router.navigate([`/`]);
    }
  }

  onSelectAttatchment(event: Upload): void {
    this.disabled = true;
    this.uploadFile = event.files[0];
  }

  onUploadAttatchment(event: any): void {

  }
  removeFile(){
    this.disabled = false;
  }

  saveFile(id: string){

    const fd = new FormData();
    fd.append('image',this.uploadFile,this.uploadFile.name)
    this.postsService.saveFile(id, fd)
    .subscribe(data => {
      this.msgs = [];
      this.msgs.push({severity: 'success', summary: 'Éxito', detail: 'Imagen agregada'});
      setTimeout(() => this.msgs = [], 3000);
      this.location.back();
    }, error => {
      this.msgs = [];
      this.msgs.push({severity: 'error', summary: 'Error', detail: 'Error saving / Try again.'});
      setTimeout(() => this.msgs = [], 3000);
    });
  }
}
