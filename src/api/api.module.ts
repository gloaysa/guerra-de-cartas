import {ModuleWithProviders, NgModule} from '@angular/core';

import {API_URL} from './api.service';

@NgModule()
export class ApiModule {
  static forRoot(apiUrl: string): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [{ provide: API_URL, useValue: apiUrl }]
    };
  }
}
