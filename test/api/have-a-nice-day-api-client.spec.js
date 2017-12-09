import { HaveANiceDayApiClient } from "../../src/api/have-a-nice-day-api-client";
import { GetSmileError, Page, Smile } from "../../src/domain/model";
import {
  getRandomSmileResponse,
  getSmilesEmptyPageResponse,
  getSmilesResponse
} from "../resources/get-smiles-response";
import { Maybe } from "monet";

const apiClient = new HaveANiceDayApiClient();
const apiHost = "http://have-a-nice-day-env.eu-west-1.elasticbeanstalk.com/";
const anyPage = new Page(1, 25);

describe("HaveANiceDayApiClient", () => {
  it("should return unknown error if there is something wrong while getting smiles", () => {
    givenGetSmilesEndpointReturns(anyPage, 500);

    return apiClient.getSmiles(anyPage).then(response => {
      expect(response.left()).to.equal(GetSmileError.UnknownError);
    });
  });

  it("should return the list of smiles obtained from our server", () => {
    givenGetSmilesEndpointReturns(anyPage, 200, getSmilesResponse);

    return apiClient.getSmiles(anyPage).then(response => {
      let smiles = response.right();
      expect(smiles[0]).to.deep.equal(
        new Smile(
          1,
          "Title 1",
          Maybe.Some("Message 1"),
          Maybe.Some("http://photos.com/random1.png")
        )
      );
    });
  });

  it("should return an empty list of smiles if there are no smiles", () => {
    givenGetSmilesEndpointReturns(anyPage, 200, getSmilesEmptyPageResponse);

    return apiClient.getSmiles(anyPage).then(response => {
      expect(response.right().length).to.equal(0);
    });
  });

  it("should return smile not found error if there are no smiles when getting a random smile", () => {
    givenGetRandomSmileEndpointReturns(404);

    return apiClient.getRandomSmile().then(response => {
      expect(response.left()).to.equal(GetSmileError.SmileNotFound);
    });
  });

  it("should return an unknown error if something went wrong while getting a random smile", () => {
    givenGetRandomSmileEndpointReturns(500);

    return apiClient.getRandomSmile().then(response => {
      expect(response.left()).to.equal(GetSmileError.UnknownError);
    });
  });

  it("should return a random smile obtained from our server", () => {
    givenGetRandomSmileEndpointReturns(200, getRandomSmileResponse);

    return apiClient.getRandomSmile().then(response => {
      expect(response.right()).to.deep.equal(
        new Smile(2, "Title", Maybe.None(), Maybe.None())
      );
    });
  });
});

function givenGetRandomSmileEndpointReturns(status, response) {
  nock(apiHost)
    .get("/api/smile")
    .reply(status, response);
}

function givenGetSmilesEndpointReturns(page, status, response) {
  nock(apiHost)
    .get("/api/smiles")
    .query(queryForPage(page))
    .reply(status, response);
}

function queryForPage(page) {
  return {
    page: page.number,
    pageSize: page.pageSize
  };
}
