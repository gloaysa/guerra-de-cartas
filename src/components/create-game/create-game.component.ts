import {Component} from '@angular/core';

import {ApiService} from '../../api/api.service';

import {GameItem} from '../../shared/models/packs.model';

@Component({
  selector: 'cards-create-game',
  templateUrl: './create-game.component.html'
})
export class CreateGameComponent {

  constructor(
    private readonly apiService: ApiService) {
  }

  createGame() {
    this.apiService.post('create', {ownerGuid: 'guille', nickname: 'guille'})
      .subscribe(
        (game: GameItem) => console.log(game),
        (error) => console.log('ERROR:', error)
      );
  }
}
