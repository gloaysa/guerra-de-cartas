import { HttpClient, HttpParams } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { API_URL, ApiService } from './api.service';

import { environment } from '../../../environments/environment';

const testValue = { key: 'value' };

class MockHttp {
  get(url: string, options: any): Observable<any> {
    return of(testValue);
  }

  post(url: string, body: any): Observable<any> {
    return of(testValue);
  }

  put(url: string, body: any): Observable<any> {
    return of(testValue);
  }
}

describe('ApiService', () => {
  let service: ApiService;
  const endPoint = 'profiles/';
  let value: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useClass: MockHttp },
        { provide: API_URL, useValue: environment.apiUrl },
      ],
    });
    service = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the api url', () => {
    expect(service.getApiUrl()).toBe(environment.apiUrl);
  });

  it('should return an object on get', fakeAsync(() => {
    service.get(endPoint).subscribe((responseBody) => (value = responseBody));
    tick();

    expect(value).toBe(testValue);
  }));

  it('should accept an object and convert it to query params', fakeAsync(() => {
    const http: HttpClient = TestBed.get(HttpClient);
    const httpClientSpy = spyOn(http, 'get').and.callThrough();
    const params = {
      testString: 'string',
      testBoolean: false,
      testNumber: 9,
      testNull: null,
      testUndefined: undefined,
      testObject: {},
      testArray: [],
    };
    let correctParams = new HttpParams();
    correctParams = correctParams.set('testString', 'string');
    correctParams = correctParams.set('testBoolean', 'false');
    correctParams = correctParams.set('testNumber', '9');

    service.get(endPoint, params).subscribe((responseBody) => (value = responseBody));
    tick();

    expect(httpClientSpy).toHaveBeenCalledWith(`${service.getApiUrl()}/${endPoint}`, {
      params: correctParams,
    });
  }));

  it('should make a post request', fakeAsync(() => {
    service.post(endPoint, {}).subscribe((responseBody) => (value = responseBody));
    tick();
    expect(value).toBe(testValue);
  }));

  it('should make a put request', fakeAsync(() => {
    service.put(endPoint, {}).subscribe((responseBody) => (value = responseBody));
    tick();
    expect(value).toBe(testValue);
  }));

  describe('createLinkUrl', () => {
    it('should return an static url with the params passed', () => {
      const params = { myParam: 'first', anotherParam: 'second' };
      const url = service.createLinkUrl('endpoint', params);

      expect(url).toContain('/endpoint?myParam=first&anotherParam=second');
    });
  });
});
