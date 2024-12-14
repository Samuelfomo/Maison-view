// const config = require('../utils/defaults');
// const { Requiement } = require('../class/Requiements');
// const axios = require('axios');
//
// class RequiementSearch {
//     constructor() {
//         this.baseUrl = config.api.baseURL;
//         this.username = config.api.username;
//         this.password = config.api.password;
//     }
//
//     async search() {
//         try {
//             const response = await axios.get(`${this.baseUrl}/requiement`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
//                 }
//             });
//             return new Requiement(response.data);
//
//         } catch (error) {
//             console.error('element search failed:', error);
//             return null;
//         }
//     }
// }
//
// module.exports = RequiementSearch;
const config = require('../utils/defaults');
const Requirement = require('../class/Requiement');
const axios = require('axios');

class RequirementSearch {
    constructor() {
        this.baseUrl = config.api.baseURL;
        this.username = config.api.username;
        this.password = config.api.password;
    }

    async search() {
        try {
            const response = await axios.get(`${this.baseUrl}/requirement`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + Buffer.from(`${this.username}:${this.password}`).toString('base64')
                }
            });

            if (!response.data) {
                throw new Error('Données de réponse invalides ou absentes');
            }

            console.log(response.data.response);
            // console.log(response.data)

            // return new Requirement(response.data);
            return response.data;

        } catch (error) {
            if (error.response) {
                // Gestion des erreurs HTTP spécifiques
                console.error(`Erreur HTTP ${error.response.status}:`, error.response.data);
            } else {
                // Erreurs non liées à HTTP
                console.error('Erreur réseau ou interne:', error.message);
            }
            return null; // Vous pourriez lever une exception selon le contexte.
        }
    }
}

module.exports = RequirementSearch;
