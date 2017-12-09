import { HaveANiceDayApiClient } from "../api/have-a-nice-day-api-client";
import { Page } from "./model";

let defaultPage = new Page(1, 10);

export class GetSmiles {
  constructor(apiClient = new HaveANiceDayApiClient()) {
    this.apiClient = apiClient;
  }

  execute(page = defaultPage) {
    return this.apiClient.getSmiles(page);
  }
}

export class GetRandomSmile {
  constructor(apiClient = new HaveANiceDayApiClient()) {
    this.apiClient = apiClient;
  }

  execute() {
    return this.apiClient.getRandomSmile();
  }
}
