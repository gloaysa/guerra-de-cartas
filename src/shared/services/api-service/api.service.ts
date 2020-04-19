import {HttpClient, HttpParams} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';

export const API_URL = new InjectionToken<string>('forRoot() Api service api url.');

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private readonly http: HttpClient, @Inject(API_URL) private readonly apiUrl: string) {}

  /**
   * Creates a http get request. On the server, it saves the data in transfer state. On the browser,
   * checks if there is saved data in order to avoid duplicated request.
   * @param endpoint Url of endpoint to be call.
   * @param params the params of the call
   * @param options aditional options
   */
  get(endpoint: string, params?: Object, options = {}): Observable<any> {
    const requestUrl = this.composeRequestUrl(endpoint);

    const sendOptions = {
      ...options,
      ...{
        params: params && this.createQueryParams(params)
      }
    };

    return this.http.get(requestUrl, sendOptions);
  }

  /**
   * Get the api Url value
   */
  getApiUrl(): string {
    return this.apiUrl;
  }

  /**
   * Creates http post request.
   * @param endpoint Url of endpoint to be call.
   * @param body the body of the call
   */
  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(this.composeRequestUrl(endpoint), body);
  }

  /**
   * Creates a http put request.
   * @param endpoint Url of endpoint to be call.
   * @param body the body of the call
   */
  put(endpoint: string, body: any): Observable<any> {
    return this.http.put(this.composeRequestUrl(endpoint), body);
  }

  /**
   * Creates a http patch request.
   * @param endpoint Url of endpoint to be call.
   * @param body the body of the call
   */
  patch(endpoint: string, body: any): Observable<any> {
    return this.http.patch(this.composeRequestUrl(endpoint), body);
  }

  /**
   * Creates a http delete request.
   * @param endpoint Url of endpoint to be call.
   */
  delete(endpoint: string): Observable<any> {
    return this.http.delete(this.composeRequestUrl(endpoint));
  }

  /**
   * Return static url
   * @param endpoint string
   * @param params Object
   */
  createLinkUrl(endpoint: string, params?: Object): string {
    let requestUrl = `${this.composeRequestUrl(endpoint)}?`;

    Object.keys(params).forEach((key: any, idx: number) => {
      const value = params[key];

      idx === 0 ? (requestUrl += `${key}=${value}`) : (requestUrl += `&${key}=${value}`);
    });

    return requestUrl;
  }

  private composeRequestUrl(endpoint: string) {
    return `${this.apiUrl}/${endpoint}`;
  }

  private createQueryParams(paramsToSet: Object): HttpParams {
    let params = new HttpParams();

    Object.keys(paramsToSet).forEach((key: any) => {
      const value = paramsToSet[key];

      if (['string', 'boolean', 'number'].includes(typeof value) || Array.isArray(value)) {
        if (Array.isArray(value)) {
          // list of query params
          value.forEach(val => {
            params = params.append(key, val.toString());
          });
        } else {
          // simple params
          params = params.set(key, value.toString());
        }
      }
    });

    return params;
  }
}
