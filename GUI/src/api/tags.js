import axios from 'axios';


const ROUTE = "/tags";


export class Tags {

  static async get() {
    return axios.get(ROUTE);
  }

  static async post() {
    return null;
  }
}
