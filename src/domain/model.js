import { Enum } from "enumify";

export class GetSmileError extends Enum {}
GetSmileError.initEnum(["NetworkError", "UnknownError"]);

export class Page {
  constructor(number = 1, pageSize = 5) {
    this.number = number;
    this.pageSize = pageSize;
  }
}

export class Smile {
  constructor(id, title, message, photo) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.photo = photo;
  }
}
