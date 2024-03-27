import axios from 'axios';


const ROUTE = '/uploads';
const CONFIGS = {headers: {'Content-Type': 'multipart/form-data'}};


export class Uploads {
  /**
  * @param {Array.<File>} files
  * @param {string} batchName
  * @param {Array.<string>} defaultTags
  */
  static async post(files, defaultTags, batchName) {
    const data = new FormData();

    // append non-file fields if not null
    if (batchName) {
      data.append("batch_name", batchName);
    }
    if (defaultTags && defaultTags.length > 0) {
      data.append("default_tags", defaultTags.join(','));
    }

    // append files
    files.forEach(file => {
      data.append("files", file);
    });


    return axios.post(ROUTE, data, CONFIGS);
  }
}
