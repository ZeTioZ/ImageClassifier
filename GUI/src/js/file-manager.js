import { ZipReader, BlobReader, BlobWriter, getMimeType } from '@zip.js/zip.js';
import imageCompression from 'browser-image-compression';
import { getMD5 } from './hash';
import { sizeOf } from './utils';


/**
*
* Class used to manage and manipulate files on the page.
* Functions are archives reading, images extraction, URL creation etc.
*
*/
export class FileManager {

  /**
  * List of allowed extensions.
  */
  static ALLOWED_IMAGE_EXTENSIONS = [
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
  * Options for image compression.
  */
  static MAX_SIZE_MB = 0.5;
  static MAX_SIZE_PX = 400;
  static NEW_FORMAT  = 'image/webp';


  /**
  * Get a list of entries from a blob.
  *
  * @param {Blob} blob - Blob of the file in which entries must be read (must be a zip).
  * @param {object} options - Options.
  * @return {Array.<import('@zip.js/zip.js').Entry>} - List of entries read.
  */
  static async #getEntries(blob, options) {
    const blobReader = new BlobReader(blob);
    const zipReader = new ZipReader(blobReader);

    return await zipReader.getEntries(options);
  }

  /**
  * Create the URL for an entry.
  *
  * @param {Entry} entry - The entry.
  * @param {object} options - Options to get data from the entry.
  * @return {object} - The URL pointing to the content of the blob (e.g.: blob:http://localhost/b97103f1-8aaa-4a82-9358-5f1e7e55087c)
  *                    the hash of the file (uncompressed) and its dimensions.
  */
  static async #createURL(entry, compressed, options) {
    let entryData = await entry.getData(new BlobWriter(), options);

    // generate hash of the image to avoid loading file content twice
    const hashMD5 = await getMD5(entryData);

    // get image size
    let dim = {};
    let url = URL.createObjectURL(entryData);
    sizeOf(url, (width, height) => {
      dim.width = width;
      dim.height = height;
    });
    URL.revokeObjectURL(url);

    // compress the image if compressed is true
    if (compressed) {
      const mimeType = getMimeType(FileManager.getExtension(entry.filename));
      entryData = await FileManager.#compressImage(entryData, entry.filename, mimeType);
    }

    return {
      url: URL.createObjectURL(entryData),
      hash: hashMD5,
      dimensions: dim
    };
  }

  /**
  * Get a list of image files present in the archive.
  *
  * @param {Array.<import('@zip.js/zip.js').Entry>} entries - List of entries to process.
  * @return {Array.<import('@zip.js/zip.js').Entry>} - List of object representing an image entry on the root. 
  */
  static #getImageList(entries) {
    const imageList = [];

    entries.forEach(entry => {
      const extEndsWith = (ext) => entry.filename.toLowerCase().endsWith(ext);
      const isImage = Boolean(FileManager.ALLOWED_IMAGE_EXTENSIONS.find(extEndsWith));

      const isInRootFolder = !entry.filename.includes("/");

      if (!entry.directory && isImage && isInRootFolder) {
        imageList.push(entry);
      }
    });

    return imageList;
  }

  /**
  * Compress the raw data of an image.
  *
  * @param {Blob} data - The raw data of the image.
  * @param {string} - The name of the file.
  * @param {string} mimeType - The MIME type of the image.
  * @return {Blob} - The compressed data of the image.
  */
  static async #compressImage(data, filename, mimeType) {
    // options for image compression
    const options = {
      maxSizeMB: FileManager.MAX_SIZE_MB,
      maxWidthOrHeight: FileManager.MAX_SIZE_PX,
      fileType: FileManager.NEW_FORMAT,
      
      // Turn this option to false to avoid creating too much web workers,
      // causing lag/crash or even skiping some compression.
      // A consequence is that all the jobs run on the main thread.
      useWebWorker: false
    }

    const file = new File([data], `compressed_${filename}`, {
      type: mimeType,
    });

    return await imageCompression(file, options);    
  }

  /**
  * Get the extension of a file given it filename.
  * 
  * @param {string} filename - The name of the file.
  * @return {string} - The extension of the file.
  */
  static getExtension(filename) {
    const re = /(?:\.([^.]+))?$/;
   
    return re.exec(filename)[1];
  }

  /**
  * Load an archive and get a list of image entries.
  *
  * @param {Blob} archive - Blob of the archive in which entries must be read.
  * @param {string} filenameEncoding - The encoding of the filename of the entry.
  * @return {Array.<import('@zip.js/zip.js').Entry>} - List of image entries.
  */
  static async getImageEntries(archive, filenameEncoding) {
    let entries = await FileManager.#getEntries(archive, { filenameEncoding });

    if (entries && entries.length) {

      // TODO: manage archive encoding and encryption
      //
      // const filenamesUTF8 = Boolean(!entries.find(entry => !entry.filenameUTF8));
      // const encrypted = Boolean(entries.find(entry => entry.encrypted));
      // encodingInput.value = filenamesUTF8 ? "utf-8" : filenameEncoding || "cp437";
      // encodingInput.disabled = filenamesUTF8;
      // passwordInput.value = "";
      // passwordInput.disabled = !encrypted;

      return FileManager.#getImageList(entries);
    }

    return [];
  }

  /**
  * Get the URL for an entry.
  *
  * @param {import('@zip.js/zip.js').Entry} entry - The entry .
  * @param {boolean} compressed - If the URL created should be of a compressed image or not.
  * @return {string} - The URL for an image in a blob URL format, its hash in an object and its dimensions.
  *                    (i.e. https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static).
  */
  static async getURL(entry, compressed = true) {
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
      return await FileManager.#createURL(entry, compressed, {
        // password: passwordInput.value,
        onprogress: (index, max) => {
          unzipProgress.index = index;
          unzipProgress.max = max;
        },
        signal
      });
    }
    catch (error) {
      if (!signal.reason || signal.reason.code != error.code) {
        throw error;
      }
    }
  }

  /**
  * Remove a previously created blob URL. This function exists because
  * a blob URL is persistant to the page when created. It should be used when
  * an image is to be removed.
  *
  * @param {string} url - The URL of the blob object to remove.
  */
  static destroyURL(url) {
    URL.revokeObjectURL(url);
  }
}

