import { FileManager } from './file-manager';
import { Image } from './image';


export class Archive {

  // All fields are private and should not be accessed outside of the class.
  // The getters bellow should be used instead.
  // ES6 introduced private variable (#myVar), but are currently incompatible with Vue.js.
  _file;
  _filename;
  _size;
  _images;
  _loaded;

  constructor(file) {
    this._file = file;
    this._filename = file.name;
    this._size = file.size;
    this._images = [];

    this._loaded = false;
  }

  get filename() {
    return this._filename;
  }

  /**
  * get size of the file in bytes
  *
  * @return {Number} - the size of the file in bytes 
  */
  get size() {
    return this._size;
  } 

  /**
  * get a human readable file size (in 'Octets'/bytes)
  * 
  * @return {string} - the size of the file in a human readable format
  */
  get readableSize() {
    const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
    const i = this._size == 0 
      ? 0 
      : Math.floor(Math.log(this._size) / Math.log(1000));

    const size = (this._size / Math.pow(1000, i)).toFixed(2) * 1;
    const unit = units[i];

    return `${size} ${unit}`;
  }

  /**
  * get the list of images within the archive 
  *
  * @return {Array.<Image>} - the number of images present on the root of the archive, 0 if the archive is not loaded
  */
  get images() {
    return this._images;
  }

  /**
  * get a representation of the archive as a File object
  *
  * @return {File} - the archive as a File object
  */
  get file() {
    return this._file;
  }

  /**
  * tells if the content of the archive has been seen through (analyze images, prepare blobs, etc.)
  *
  * @return {Boolean} - true if the archive has been loaded, false otherwise
  */
  get loaded() {
    return this._loaded;
  }

  async load() {
    if(!this._loaded) {
      const entries = await FileManager.loadArchive(this._file);

      entries.forEach(entry => {
        this._images.push(new Image(entry));
      });

      this._loaded = true;
    }
  }
}
