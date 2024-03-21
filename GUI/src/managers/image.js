

export class Image {

  #archiveEntry
  #URL
  #hash
  #filename
  #size
  #extension
  #tags
  #loaded

  constructor(entry) {
    this.#archiveEntry = entry;
    this.#filename = entry.filename;
    this.#size = entry.uncompressedSize;
    this.#extension = this.#filename.substring(this.#filename.lastIndexOf('.') + 1, this.#filename.length) || undefined;

  }
  
}
