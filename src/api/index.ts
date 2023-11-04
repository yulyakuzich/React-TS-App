import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api/';

export const getPeople = (search?: string) => {
  return axios.get(BASE_URL + 'people/' + (search ? `?search=${search}` : ''));
};
export const getPerson = (id?: string) => {
  return axios.get(BASE_URL + 'people/' + id);
};
