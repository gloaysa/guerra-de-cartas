import {ApiService} from './api.service';

export type Spied<T> = { [Method in keyof T]: jasmine.Spy };

export const ApiMockService = (): Spied<ApiService> =>
  jasmine.createSpyObj('MockApiService', [
    'get',
    'getApiUrl',
    'post',
    'put',
    'patch',
    'delete',
    'setApiUrl',
    'composeRequestUrl',
    'createQueryParams',
    'doRequest',
    'createLinkUrl'
  ]);
