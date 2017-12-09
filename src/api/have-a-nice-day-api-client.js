import rest from "rest";
import errorCode from "rest/interceptor/errorCode";
import { Maybe, Either } from "monet";
import { GetSmileError, Smile } from "../domain/model";

const basePath =
  "http://have-a-nice-day-env.eu-west-1.elasticbeanstalk.com/api";
const client = rest.wrap(errorCode, { code: 300 });

export class HaveANiceDayApiClient {
  getSmiles(page) {
    const pageNumber = page.number;
    const pageSize = page.pageSize;
    const requestPath = `${basePath}/smiles?page=${pageNumber}&pageSize=${
      pageSize
    }`;
    return client(requestPath).then(
      response => Either.Right(toSmiles(response)),
      error => Either.Left(toSmilesError(error))
    );
  }

  getRandomSmile() {
    let requestPath = `${basePath}/smile`;
    return client(requestPath).then(
      response => Either.Right(toSmile(JSON.parse(response.entity))),
      error => Either.Left(toSmilesError(error))
    );
  }
}

function toSmiles(response) {
  const json = JSON.parse(response.entity);
  const jsonSmiles = json["data"];
  if (jsonSmiles) {
    return jsonSmiles.map(jsonSmile => toSmile(jsonSmile));
  } else {
    return [];
  }
}

function toSmile(jsonSmile) {
  return new Smile(
    jsonSmile["id"],
    jsonSmile["title"],
    Maybe.fromNull(jsonSmile["message"]),
    Maybe.fromNull(jsonSmile["photoUrl"])
  );
}

function toSmilesError(response) {
  const errorStatusCode = response.status.code;
  if (errorStatusCode === 404) {
    return GetSmileError.SmileNotFound;
  } else if (errorStatusCode) {
    return GetSmileError.UnknownError;
  } else {
    return GetSmileError.NetworkError;
  }
}
