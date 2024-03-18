import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BackendService {
  http = inject(HttpClient);

  getCms(): Observable<string> {
    return this.http.get('http://localhost/api/cms', { responseType: 'text' });
  }

  getSite(): Observable<string> {
    return this.http.get('http://localhost/api/site', { responseType: 'text' });
  }
}
