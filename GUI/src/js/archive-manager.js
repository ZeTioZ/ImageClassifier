import {
  ZipReader,
  BlobReader,
  BlobWriter,
} from '@zip.js/zip.js';


export class ArchiveManager {

  /**
  * list of allowed extensions
  */
  static allowedImageExtensions = [
    'bmp', 'dib',
    'jpeg','jpg', 'jpe',
    'jp2',
    'png',
    'webp',
    'avif',
    'pbm', 'pgm', 'ppm', 'pxm', 'pnm',
    'pfm',
    'sr', 'ras',
    'tiff', 'tif',
    'exr',
    'hdr', 'pic'
  ];


  /**
  * Get a list of entries from a blob
  *
  * @param {Blob} blob - blob of the file in which entries must be read (must be a zip)
  * @param {object} options - options
  * @return {Array.<import('@zip.js/zip.js').Entry>} - list of entries read
  */
  async #getEntries(blob, options) {
    const blobReader = new BlobReader(blob);
    const zipReader = new ZipReader(blobReader);

    return await zipReader.getEntries(options);
  }

  /**
  * Create the URL for an entry
  *
  * @param {Entry} entry - the entry
  * @param {object} options - options to get data from the entry
  * @return {string} - the URL to the content of the blob (e.g.: blob:http://localhost/b97103f1-8aaa-4a82-9358-5f1e7e55087c)
  */
  async #createURL(entry, options) {
    const entryData = await entry.getData(new BlobWriter(), options);

    return URL.createObjectURL(entryData);
  }

  /**
  * Get a list of image files present in the archive
  *
  * @param {Array.<import('@zip.js/zip.js').Entry>} entries - list of entries to process
  * @return {Array.<{file: import('@zip.js/zip.js').Entry, index: Number}>} - list of object representing an image entry on the root 
  */
  #getImageList(entries) {
    const imageList = [];

    entries.forEach((entry, entryIndex) => {
      const extEndsWith = (ext) => entry.filename.toLowerCase().endsWith(ext);
      const isImage = Boolean(ArchiveManager.allowedImageExtensions.find(extEndsWith));

      const isInRootFolder = !entry.filename.includes("/");

      if (!entry.directory && isImage && isInRootFolder) {
        imageList.push({
          file: entry,
          index: entryIndex
        });
      }
    });

    return imageList;
  }

  /**
  * Load an archive and get a list of entries
  *
  * @param {Blob} archive - blob of the archive in which entries must be read
  * @param {string} filenameEncoding - the encoding of the filename of the entry
  * @return {Array.<import('@zip.js/zip.js').Entry>} - list of the entries
  */
  async loadArchive(archive, filenameEncoding) {
    let entries = await this.#getEntries(archive, { filenameEncoding });

    if (entries && entries.length) {

      // TODO: manage archive encoding and encryption
      //
      // const filenamesUTF8 = Boolean(!entries.find(entry => !entry.filenameUTF8));
      // const encrypted = Boolean(entries.find(entry => entry.encrypted));
      // encodingInput.value = filenamesUTF8 ? "utf-8" : filenameEncoding || "cp437";
      // encodingInput.disabled = filenamesUTF8;
      // passwordInput.value = "";
      // passwordInput.disabled = !encrypted;

      return this.#getImageList(entries);
    }

    return [];
  }

  /**
  * Get the URL for an entry
  *
  * @param {import('@zip.js/zip.js').Entry} entry - the entry 
  * @return {} -
  */
  async getURL(entry) {
    // to keep track of the extraction progress
    let unzipProgress = {
      index: null,
      max: null
    };

    const controller = new AbortController();
    const signal = controller.signal;

    // To abort the extraction, execute the following instruction:
    // `controller.abort()`

    try {
      const blobURL = await this.#createURL(entry, {
        // password: passwordInput.value,
        onprogress: (index, max) => {
          unzipProgress.index = index;
          unzipProgress.max = max;
        },
        signal
      });

      return blobURL;

    } catch (error) {
      if (!signal.reason || signal.reason.code != error.code) {
        throw error;
      }

    } finally {
      // unzipProgress.remove();
      // abortButton.remove();
    }
  }
}

