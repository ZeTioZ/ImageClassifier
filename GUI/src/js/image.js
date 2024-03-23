

export class Image {

  #hash
  #filename
  #size
  #tags
  #toBeDeleted
  #reasonForDeletion

  #archiveEntry
  #thumbnailBlobURL
  #blobURL

  constructor(entry) {
    this.#archiveEntry = entry;
    this.#filename = entry.filename;
    this.#size = entry.uncompressedSize;
    this.#tags = [];
    this.#toBeDeleted = false;
  }

  /**
  * get the entry of the image in the archive
  *
  * @return {import('@zip.js/zip.js').Entry} - the entry of the image 
  */
  get archiveEntry() {
    return this.#archiveEntry;
  }
  
  /**
  * get a hash of the image, used for identification
  *
  * @return {string} - a hash 
  */
  get hash() {
    return this.#hash;
  }

  /**
  * get the name of the image
  *
  * @return {string} - the name of the image
  */
  get filename() {
    return this.filename;
  }

  /**
  * get the extension of the image
  *
  * @return {string} - the extension of the image
  */
  get extension() {
    const re = /(?:\.([^.]+))?$/;
   
    return re.exec(this.#filename)[1];
  }

  /**
  * get the size of the image in bytes 
  *
  * @return {number} - the size of the image
  */
  get size() {
    return this.#size;
  }

  /**
  * get a human readable size of the file (in 'Octets'/bytes)
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
  * get the list of tags of the image
  *
  * @return {Array.<Tag>} - a list of tags
  */
  get tags() {
    return this.#tags;
  }

  /**
  * tell if the image has the 'toBeDeleted' flag
  *
  * @return {boolean} - true if the image is to be deleted, false otherwise
  */
  get toBeDeleted() {
    return this.#toBeDeleted;
  }

  /**
  * get the reason why the image should be deleted (i.e. the unmatched requirements)
  *
  * @return ? 
  */
  get reasonForDeletion() {
    return this.#reasonForDeletion;
  }

  /**
  * get the url pointing to the image (i.e. src in img tag)
  *
  * @param {boolean} [thumbnail=true] - if a thumbnail or the full image should be sourced
  * @returns {string} - the url of the image
  */
  async getBlobURL(thumbnail = true) {
    // create blob url if this.blobURL is undefined, create it otherwise 

    return "";
  }
}
