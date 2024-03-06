import axios from 'axios';


export const getAll = (params) => {
  return axios.get('/example', {
    params: params
  });
};

export const get = (id) => {
  return axios.get('/example' + id);
};

export const put = (id, data) => {
  return axios.put('/example' + id, data);
};

export const post = (data) => {
  return axios.post('/example', data);
};

export const del = (id) => {
  return axios.delete('/example' + id);
};

