import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api/';

export const getPeople = (search?: string) => {
  return axios.get(BASE_URL + 'people/' + (search ? `?search=${search}` : ''));
};
