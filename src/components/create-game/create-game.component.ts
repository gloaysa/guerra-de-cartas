import { Component } from '@angular/core';

import { ApiService } from '../../shared/services/api-service/api.service';
import { MessageService } from '../../shared/services/message-service/message.service';

import { MessageType } from '../../shared/models/message.model';
import { GameItem } from '../../shared/models/packs.model';

@Component({
  selector: 'cards-create-game',
  templateUrl: './create-game.component.html',
})
export class CreateGameComponent {
  constructor(private readonly apiService: ApiService, private readonly messageService: MessageService) {}

  createGame() {
    this.apiService.post('create', { ownerGuid: 'guille', nickname: 'guille' }).subscribe(
      (game: GameItem) => this.messageService.emit('todo ok', MessageType.Success),
      (error) => this.messageService.emit('ha habido un error', MessageType.Error)
    );
  }
}
