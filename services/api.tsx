import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sw-api.starnavi.io/api',
});

export const fetchHeroes = (page = 1) => {
  return api.get(`/heroes?page=${page}`);
};

export const fetchHeroDetails = (id: string) => {
  return api.get(`/heroes/${id}`);
};
