import { Component, OnInit } from '@angular/core';

import { MessageService } from '../../shared/services/message-service/message.service';

import { Message } from '../../shared/models/message.model';

@Component({
  selector: 'cards-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  message: Message;
  showMessage = false;

  // @ts-ignore
  private timeOut: NodeJS.Timer;
  private readonly durationTime = 2000;

  constructor(private readonly messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.get().subscribe((message) => {
      this.message = message;
      this.showMessage = true;
      this.stopTimeout();
      this.hideMessageOnTimeout();
    });
  }

  hideMessage() {
    this.showMessage = false;
  }

  stopTimeout() {
    clearTimeout(this.timeOut);
  }

  private hideMessageOnTimeout() {
    this.timeOut = setTimeout(() => (this.showMessage = false), this.durationTime);
  }
}
