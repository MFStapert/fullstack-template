import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BackendService {
  http = inject(HttpClient);

  getCms(): Observable<string> {
    return this.http.get('http://localhost:4200/api/cms', { responseType: 'text' });
  }

  getSite(): Observable<string> {
    return this.http.get('http://localhost:4200/api/site', { responseType: 'text' });
  }
}
