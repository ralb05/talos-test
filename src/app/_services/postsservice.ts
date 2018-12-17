import {Injectable} from '@angular/core';
import {AppSettings} from '../../proyect.conf';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Posts} from '../_models/posts';

@Injectable({
              providedIn: 'root'
            })

export class PostsService {
  private serviceUrl = AppSettings.serviceUrl;

  constructor(private http: HttpClient) {
  }

  getList(): Observable<Array<Posts>> {
    return this.http.get<Array<Posts>>(`${this.serviceUrl}posts`);
  }
   getById(id: string): Observable<Posts> {
      const httpParams = new HttpParams()
      .append("id", id);
      return this.http.get<any>(`${this.serviceUrl}posts/${id}`, {params: httpParams});
   }


   add(obj: Posts): Observable<any> {
      return this.http.post<any>(`${this.serviceUrl}posts/`, obj);
   }

   saveFile(id: string, file: any): Observable<any> {
      return this.http.put<any>(`${this.serviceUrl}posts/${id}/picture`, file);
   }

}
