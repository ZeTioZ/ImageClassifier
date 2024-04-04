import axios from 'axios';


export default {
  // create a GET request (params object represents query on the request (i.e. "?"))
  getAll(params) {
    return axios.get('/example', {
      params: params
    });
  },

  // create a GET request to get an object
  get(id) {
    return axios.get('/example' + id);
  },

  // create a PUT request to update an object
  put(id, data) {
    return axios.put('/example' + id, data);
  },

  // create a POST request to create an object
  post(data) {
    return axios.post('/example', data);
  },

  // create a DELETE request to delete an object
  del(id) {
    return axios.delete('/example' + id);
  }
}
