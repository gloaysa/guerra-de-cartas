import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MessageComponent } from './message.component';

import { MessageService } from '../../shared/services/message-service/message.service';

import { Spied } from '../../shared/services/api-service/api.service.mock';
import { MessageServiceMockModule } from '../../shared/services/message-service/message.service.mock';

describe('MessageComponent', () => {
  let fixture: ComponentFixture<MessageComponent>;
  let component: MessageComponent;
  let messageService: Spied<MessageService>;

  const messageMock = { value: 'test' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MessageServiceMockModule],
      declarations: [MessageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.debugElement.componentInstance;
    messageService = TestBed.get(MessageService);
    messageService.get.and.returnValue(of(messageMock));
    fixture.detectChanges();
  });

  describe('OnInit', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set received message', () => {
      expect(component.message).toEqual(messageMock);
    });

    it('should set showMessage to true', () => {
      expect(component.showMessage).toBeTruthy();
    });
  });

  describe('stopTimeout', () => {
    it('should clear the timeout', () => {
      jasmine.clock().install();
      const timerValue = component['timeOut'];
      component.stopTimeout();
      jasmine.clock().tick(200);
      expect(component['timeOut']).toBe(timerValue);
      jasmine.clock().uninstall();
    });
  });

  describe('hideMessage', () => {
    it('should set showMessage to false', () => {
      component.hideMessage();
      expect(component.showMessage).toBeFalsy();
    });
  });
});
