import http from "src/libs/axios";

export default class Api {
  constructor(url) {
    this.baseURL = process.env.VUE_APP_BACKEND;
    this.apiUrl = url;
    this.$http = http;
  }

  get = (params) => http.get(this.apiUrl, { params });

  getOne = (id, params) => http.get(`${this.apiUrl}${id}/`, { params });

  update = (data) => http.put(`${this.apiUrl}`, data);

  create = (data) => http.post(this.apiUrl, data);

  delete = (id) => http.delete(`${this.apiUrl}${id}/`);
}
