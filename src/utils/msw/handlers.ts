import { http, HttpResponse, JsonBodyType } from 'msw';

const moskDetailsData: unknown = (await import('./details.json')).default;
const moskMainData: unknown = (await import('./main.json')).default;

export const handlers = [
  http.get(`https://swapi.dev/api/`, () => {
    const response = HttpResponse.json(moskMainData as JsonBodyType);

    return response;
  }),
  http.get(`https://swapi.dev/api/people/:id`, () => {
    const response = HttpResponse.json(moskDetailsData as JsonBodyType);

    return response;
  }),
];
