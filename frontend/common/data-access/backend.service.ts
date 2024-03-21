import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BackendService {
  http = inject(HttpClient);

  getCms(): Observable<string> {
    return this.http.get('/backend/cms', { responseType: 'text' });
  }

  getSite(): Observable<string> {
    return this.http.get('/backend/site', { responseType: 'text' });
  }
}
