import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { MessageService } from './message.service';

import { Message, MessageType } from '../../models/message.model';

describe('MessageService', () => {
  let service: MessageService;
  let receivedMessage: Message;
  const testErrorMessage: Message = { value: 'test', type: undefined };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(MessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to emit/receive errors messages', fakeAsync(() => {
    service.get().subscribe((errorMessage: Message) => (receivedMessage = errorMessage));
    service.emit(testErrorMessage.value);
    tick();

    expect(receivedMessage).toEqual(testErrorMessage);
  }));

  it('should be able to take a message type', fakeAsync(() => {
    service.get().subscribe((errorMessage: Message) => (receivedMessage = errorMessage));
    service.emit(testErrorMessage.value, MessageType.Error);
    tick();

    expect(receivedMessage).toEqual({ value: 'test', type: MessageType.Error });
  }));
});
