import axios from 'axios';

export class Configs {
  // Récupérer les configurations
    static async getConfigs() {
        return axios.get('/configs');
    }
    // Méthode pour mettre à jour la configuration
    static async updateConfigs(configData) {
        return axios.post('/configs', configData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};