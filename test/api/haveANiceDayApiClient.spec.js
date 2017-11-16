import { HaveANiceDayApiClient } from "../../src/api/haveANiceDayApiClient";
import { GetSmileError, Page, Smile } from "../../src/domain/model";
import { getSmilesResponse } from "../resources/getSmilesResponse";
import { Maybe } from "monet";

const apiClient = new HaveANiceDayApiClient();
const apiHost = "http://have-a-nice-day-env.eu-west-1.elasticbeanstalk.com/";
const anyPage = new Page(1, 25);

describe("HaveANiceDayApiClient", () => {
  it("should return unknown error if there is something wrong while getting smiles", () => {
    givenGetSmilesEndpointReturns(500);

    return apiClient.getSmiles(anyPage).then(response => {
      expect(response.left()).to.equal(GetSmileError.UnknownError);
    });
  });

  it("should return the list of smiles obtained from our server", () => {
    givenGetSmilesEndpointReturns(200, getSmilesResponse);

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
});

function givenGetSmilesEndpointReturns(status, response) {
  nock(apiHost)
    .get("/api/smiles")
    .query(queryForPage(anyPage))
    .reply(status, response);
}

function queryForPage(page) {
  return {
    page: page.number,
    pageSize: page.pageSize
  };
}
