import { FileManager } from './file-manager';


/**
*
* Class representing an image in an archive. Can be used to access data about it, get
* the URL to a representation or access its data.
*
*/
export class Image {

  // All fields are private and should not be accessed outside of the class.
  // The getters bellow should be used instead.
  // ES6 introduced private variable (#myVar), but are currently incompatible with Vue.js.
  _hash
  _filename
  _size
  _width
  _height

  _tags
  _toBeDeleted
  _reasonForDeletion

  _archiveEntry
  _thumbnailBlobURL
  _blobURL
  
  _loading

  constructor(entry) {
    this._archiveEntry = entry;
    this._filename = entry.filename;
    this._size = entry.uncompressedSize;
    this._toBeDeleted = true;
    this._tags = []

    this._loading = false;
  }

  /**
  * Get the entry of the image in the archive.
  *
  * @return {import('@zip.js/zip.js').Entry} - The entry of the image.
  */
  get archiveEntry() {
    return this._archiveEntry;
  }
  
  /**
  * Get a hash of the image, used for identification.
  *
  * @return {string} - A hash.
  */
  get hash() {
    return this._hash;
  }

  /**
  * Get the name of the image.
  *
  * @return {string} - The name of the image.
  */
  get filename() {
    return this._filename;
  }

  /**
  * Get the extension of the image.
  *
  * @return {string} - The extension of the image.
  */
  get extension() {
    return FileManager.getExtension(this._filename);
  }

  /**
  * Get the size of the image in bytes.
  *
  * @return {number} - The size of the image.
  */
  get size() {
    return this._size;
  }

  /**
  * Get the width of the image in pixels
  *
  * @return {number} - The width of the image in pixels.
  */
  get width() {
    return this._width;
  }

  /**
  * Get the height of the image in pixels.
  *
  * @return {number} - the height of the image in pixels.
  */
  get height() {
    return this._height;
  }

  /**
  * Get a human readable size of the file (in 'Octets'/bytes).
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
  * Get the list of tags of the image.
  *
  * @return {Array.<Tag>} - A list of tags linked to the image.
  */
  get tags() {
    return this._tags;
  }

  /**
  * Tell if the image has the 'toBeDeleted' flag.
  *
  * @return {boolean} - true if the image is to be deleted, false otherwise.
  */
  get toBeDeleted() {
    return this._toBeDeleted;
  }

  /**
  * Change the state of the 'toBeDeleted' var.
  *
  * @param {boolean} value - a boolean.
  */
  set toBeDeleted(value) {
    this._toBeDeleted = value;
  }

  /**
  * Get the reason why the image should be deleted (i.e. the unmatched requirements).
  *
  * @return {Array.<string>} - an array containing quality criterions not beeing respected by the image.
  */
  get reasonForDeletion() {
    return this._reasonForDeletion;
  }

  /**
  * Tell if the image is loading, ie. the load() function has been called and is currently running.
  *
  * @return {boolean}
  */
  get loading() {
    return this._loading;
  }

  /**
  * Set properties of the images from response of the REST API.
  *
  * @param {Array.<Tag>} tags - list of tags linked to the image.
  * @param {boolean} toBeDeleted - boolean telling if an image is to be kept or not.
  * @param {Array.<string>} reasonForDeletion - array containing quality criterions not beeing respected by the image.
  */
  setProperties(tags, toBeDeleted, reasonForDeletion) {
    this._tags = tags;
    this._toBeDeleted = toBeDeleted;
    this._reasonForDeletion = reasonForDeletion;
  }

  /**
  * Load the url thumbnail for the image and get its hash.
  */
  async load() {
    this._loading = true;

    // load blob url for thumbnail and image hash
    await FileManager.getURL(this._archiveEntry, true)
      .then((res) => {
        // set blob url
        this._thumbnailBlobURL = res.url;

        // set image hash
        this._hash = res.hash;
      });

    this._loading = false;
  }

  /**
  * Get the url pointing to the image (i.e. src in img tag).
  *
  * @param {boolean} [thumbnail=true] - If a thumbnail or the full image should be sourced.
  * @returns {string} - The url of the image.
  */
  getBlobURL(thumbnail = true) {
    // which blob url to use
    const blobURLToUse = thumbnail ? this._thumbnailBlobURL : this._blobURL;

    // if blob url is null (undefined), ~~create it~~ do nothing
    if (blobURLToUse == null) {
      // const newBlobURL = await FileManager.getURL(this._archiveEntry, thumbnail);

      // if (thumbnail) {
      //   this._thumbnailBlobURL = newBlobURL;
      // } else {
      //   this._blobURL = newBlobURL;
      // }
    }

    return thumbnail ? this._thumbnailBlobURL : this._blobURL;
  }

  /**
  * Destroy URLs for both the preview and full image.
  * Nothing happens if they don't exist.
  */
  destroyBlobURLs() {
    FileManager.destroyURL(this._thumbnailBlobURL);
    FileManager.destroyURL(this._blobURL);
  }
}