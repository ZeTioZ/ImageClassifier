import { FileManager } from './file-manager';


export class Image {

  // All fields are private and should not be accessed outside of the class.
  // The getters bellow should be used instead.
  // ES6 introduced private variable (#myVar), but are currently incompatible with Vue.js.
  _hash
  _filename
  _size
  _tags
  _toBeDeleted
  _reasonForDeletion

  _archiveEntry
  _thumbnailBlobURL
  _blobURL

  constructor(entry) {
    this._archiveEntry = entry;
    this._filename = entry.filename;
    this._size = entry.uncompressedSize;
    this._tags = [];
    this._toBeDeleted = false;
  }

  /**
  * get the entry of the image in the archive
  *
  * @return {import('@zip.js/zip.js').Entry} - the entry of the image 
  */
  get archiveEntry() {
    return this._archiveEntry;
  }
  
  /**
  * get a hash of the image, used for identification
  *
  * @return {string} - a hash 
  */
  get hash() {
    return this._hash;
  }

  /**
  * get the name of the image
  *
  * @return {string} - the name of the image
  */
  get filename() {
    return this._filename;
  }

  /**
  * get the extension of the image
  *
  * @return {string} - the extension of the image
  */
  get extension() {
    return FileManager.getExtension(this._filename);
  }

  /**
  * get the size of the image in bytes 
  *
  * @return {number} - the size of the image
  */
  get size() {
    return this._size;
  }

  /**
  * get a human readable size of the file (in 'Octets'/bytes)
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
  * get the list of tags of the image
  *
  * @return {Array.<Tag>} - a list of tags
  */
  get tags() {
    return this._tags;
  }

  /**
  * tell if the image has the 'toBeDeleted' flag
  *
  * @return {boolean} - true if the image is to be deleted, false otherwise
  */
  get toBeDeleted() {
    return this._toBeDeleted;
  }

  /**
  * get the reason why the image should be deleted (i.e. the unmatched requirements)
  *
  * @return ? 
  */
  get reasonForDeletion() {
    return this._reasonForDeletion;
  }

  /**
  * get the url pointing to the image (i.e. src in img tag).
  * create the blob url if the blob URL is undefined, return it otherwise
  *
  * @param {boolean} [thumbnail=true] - if a thumbnail or the full image should be sourced
  * @returns {string} - the url of the image
  */
  async getBlobURL(thumbnail = true) {
    // which blob url to use
    const blobURLToUse = thumbnail ? this._thumbnailBlobURL : this._blobURL;

    // if blob url is null (undefined), create it 
    if (blobURLToUse == null) {
      const newBlobURL = await FileManager.getURL(this._archiveEntry, thumbnail);

      if (thumbnail) {
        this._thumbnailBlobURL = newBlobURL;
      } else {
        this._blobURL = newBlobURL;
      }
    }

    return thumbnail ? this._thumbnailBlobURL : this._blobURL;
  }
}
