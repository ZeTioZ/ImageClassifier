

export class Image {

  #archiveEntry
  #hash
  #filename
  #size
  #tags
  #toBeDeleted
  #reasonForDeletion

  constructor(entry) {
    this.#archiveEntry = entry;
    this.#filename = entry.filename;
    this.#size = entry.uncompressedSize;
    this.#tags = [];
    this.#toBeDeleted = false;
  }

  get archiveEntry() {
    return this.#archiveEntry;
  }
  
  get hash() {
    return this.#hash;
  }

  get filename() {
    return this.filename;
  }

  get extension() {
    const re = /(?:\.([^.]+))?$/;
   
    return re.exec(this.#filename)[1];
  }

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

  get tags() {
    return this.#tags;
  }

  get toBeDeleted() {
    return this.#toBeDeleted;
  }

  get reasonForDeletion() {
    return this.#reasonForDeletion;
  }
}
