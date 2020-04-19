export interface Message {
  value: string;
  icon?: string;
  type?: MessageType;
}

export enum MessageType {
  Success = 'success',
  Error = 'error',
}
