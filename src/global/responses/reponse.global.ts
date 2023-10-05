import { HttpMessage, HttpStatus } from '../enums/enum';

// Phản về từ server về client
export class ResponseData<T> {
  data: T | T[];
  message: HttpMessage;
  status: HttpStatus;

  constructor(data: T | T[], message: HttpMessage, status: HttpStatus) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}
