import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Message, MessageType } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly messages: Subject<Message> = new Subject();

  constructor() {}

  /**
   * Send a new message
   * @param message value of the message
   * @param type if success or error
   */
  emit(message: string, type?: MessageType) {
    const messageToSend: Message = {
      value: message,
      type,
    };
    this.messages.next(messageToSend);
  }

  /**
   * An observable that receives new errors
   */
  get(): Observable<Message> {
    return this.messages.asObservable();
  }
}
