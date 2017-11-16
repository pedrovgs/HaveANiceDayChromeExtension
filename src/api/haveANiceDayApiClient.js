import rest from "rest";

//const basePath = "http://localhost:9000/api";
const basePath =
  "http://have-a-nice-day-env.eu-west-1.elasticbeanstalk.com/api";

export class Page {
  constructor(number = 1, pageSize = 5) {
    this.number = number;
    this.pageSize = pageSize;
  }
}

export function getSmiles(page) {
  const pageNumber = page.number;
  const pageSize = page.pageSize;
  //return rest(`${basePath}/smiles?page=${pageNumber}&pageSize=${pageSize}`);
  return Promise.resolve([1, 2, 3, 4]);
}
