import { FileManager } from './file-manager';
import { Image } from './image';


/**
*
* Class represention an archive. Can be used to access its images and load them.
*
*/
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
  * Get size of the file in bytes.
  *
  * @return {Number} - The size of the file in bytes.
  */
  get size() {
    return this._size;
  } 

  /**
  * Get a human readable file size (in 'Octets'/bytes).
  * 
  * @return {string} - The size of the file in a human readable format.
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
  * Get the list of images within the archive.
  *
  * @return {Array.<Image>} - The number of images present on the root of the archive, 0 if the archive is not loaded.
  */
  get images() {
    return this._images;
  }

  /**
  * Get a representation of the archive as a File object.
  *
  * @return {File} - The archive as a File object.
  */
  get file() {
    return this._file;
  }

  /**
  * Tells if the content of the archive has been seen through (analyze images, prepare blobs, etc.).
  *
  * @return {Boolean} - True if the archive has been loaded, false otherwise.
  */
  get loaded() {
    return this._loaded;
  }

  /**
  * Load the archive and get image entries.
  */
  async load() {
    if(!this._loaded) {
      const entries = await FileManager.getImageEntries(this._file);

      entries.forEach(entry => {
        // create image object
        const newImage = new Image(entry);
        this._images.push(newImage);

        // load image (thumbnail image)
        newImage.load();
      });

      this._loaded = true;
    }
  }

  /**
  * Unload the archive to free resources.
  *
  * /!\ THIS FUNCTION MUST BE CALLED BEFORE THE ARCHIVE INSTANCE
  * IS DESTROYED BY THE GARBAGE COLLECTOR /!\
  *
  * Why ? To remove the blob URL created for images (this process can't be automated).
  */
  unload() {
    // destroy blob URLs for each images (free unused RAM in the browser)
    this._images.forEach(image => {
      image.destroyBlobURLs();
    });

    this._images = [];
    this._loaded = false;
  }
}
