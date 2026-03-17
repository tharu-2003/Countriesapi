import axios from "axios";

const API = "http://localhost:8080/countries";

export const getAllCountries = () => axios.get(API);

export const searchCountries = (name) =>
  axios.get(`${API}/search?name=${encodeURIComponent(name)}`);