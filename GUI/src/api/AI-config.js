import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5173';

export default {
  // Récupérer les configurations
  getConfigs() {
    return axios.get('/configs');
  },
  // Méthode pour mettre à jour la configuration
  updateConfigs(configData) {
    return axios.post('/configs', configData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  
  // D'autres fonctions pour interagir avec votre API
};