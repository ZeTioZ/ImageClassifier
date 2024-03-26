import axios from 'axios';


const ROUTE = '/uploads';
const CONFIGS = {headers: {'Content-Type': 'multipart/form-data'}};

/**
* @param {Array.<File>} files
* @param {string} batchName
* @param {Array.<string>} defaultTags
*/
export async function post(files, defaultTags, batchName) {
  const data = new FormData();

  // append non-file fields
  data.append("batch_name", batchName);
  data.append("default_tags", defaultTags.join(','));

  // append files
  files.forEach(file => {
    data.append("files", file);
  });


  return axios.post(ROUTE, data, CONFIGS);
}
