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


    // return axios.post(ROUTE, data, CONFIGS);
    return JSON.parse('{"message":"Successfuly uploaded test.zip!","generated_tags":{"classes":{"0":"activity","1":"animal","2":"equipment","3":"food","4":"music-instrument","5":"nasty","6":"nature","7":"person","8":"scout","9":"sport","10":"transport"},"13528c89cbbad4bea979a5786b4bb78e":{"file_name":"pexels-chevanon-photography-1108099.jpg","detection_tags":["animal"],"is_qualitative":false,"quality_tags":["blurry"]},"5aaac9ef602cf7618d853aa7b15ce427":{"file_name":"pexels-pixabay-280229.jpg","detection_tags":["nature"],"is_qualitative":true,"quality_tags":[]},"f43cef21c335cbfbeaaa041a82e9b008":{"file_name":"pexels-valeria-boltneva-1805164.jpg","detection_tags":["animal"],"is_qualitative":false,"quality_tags":["blurry"]}}}');
  }
}
