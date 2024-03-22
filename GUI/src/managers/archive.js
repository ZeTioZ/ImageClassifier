import { loadArchive } from './archive-reader';
import { Image } from './image';


export class Archive {

  #file;
  #filename;
  #size;
  #images;
  #loaded;

  constructor(file) {
    this.#file = file;
    this.#filename = file.name;
    this.#size = file.size;
    this.#images = [];

    this.#loaded = false;
  }

  get filename() {
    return this.#filename;
  }

  /**
  * get size of the file in bytes
  *
  * @return {Number} - the size of the file in bytes 
  */
  get size() {
    return this.#size;
  } 

  /**
  * get a human readable file size (in 'Octets'/bytes)
  * 
  * @return {string} - the size of the file in a human readable format
  */
  get readableSize() {
    const units = ['o', 'Ko', 'Mo', 'Go', 'To'];
    const i = this.#size == 0 
      ? 0 
      : Math.floor(Math.log(this.#size) / Math.log(1000));

    const size = (this.#size / Math.pow(1000, i)).toFixed(2) * 1;
    const unit = units[i];

    return `${size} ${unit}`;
  }

  /**
  * get the list of images within the archive 
  *
  * @return {Array.<Image>} - the number of images present on the root of the archive, 0 if the archive is not loaded
  */
  get images() {
    return this.#images;
  }

  /**
  * get a representation of the archive as a File object
  *
  * @return {File} - the archive as a File object
  */
  get file() {
    return this.#file;
  }

  /**
  * tells if the content of the archive has been seen through (analyze images, prepare blobs, etc.)
  *
  * @return {Boolean} - true if the archive has been loaded, false otherwise
  */
  get loaded() {
    return this.#loaded;
  }

  async loadArchive() {
    if(!this.#loaded) {
      const entries = await loadArchive(this.#file);
      
      entries.forEach(entry => {
        this.#images.push(new Image(entry));
      });

      this.#loaded = true;
    }
  }
}
