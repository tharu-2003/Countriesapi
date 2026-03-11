import axios from "axios";

const API_URL = "http://localhost:8080/countries";

export const getAllCountries = () => {
  return axios.get(API_URL);
};

export const searchCountries = (name) => {
  return axios.get(`${API_URL}/search?name=${encodeURIComponent(name)}`);
};