import {NgModule} from '@angular/core';

import {MessageService} from './message.service';

import {Spied} from '../api-service/api.service.mock';

export const MessageServiceMock = (): Spied<MessageService> =>
  jasmine.createSpyObj('MessageServiceMock', [
    'emit',
    'get'
  ]);

@NgModule({
  providers: [{ provide: MessageService, useValue: MessageServiceMock()}]
})
export class MessageServiceMockModule {}
