import {
  ZipReader,
  BlobReader,
  BlobWriter,
} from '@zip.js/zip.js';


// allowed formats for images
const allowedImageFormats = [
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
async function getEntries(blob, options) {
  const blobReader = new BlobReader(blob);
  const zipReader = new ZipReader(blobReader);

  return await zipReader.getEntries(options);
}

/**
 * Get the URL for an entry
 *
 * @param {Entry} entry - the entry
 * @param {object} options - options to get data from the entry
 * @return {string} - the URL to the content of the blob (e.g.: blob:http://localhost/b97103f1-8aaa-4a82-9358-5f1e7e55087c)
 */
async function getURL(entry, options) {
  const entryData = await entry.getData(new BlobWriter(), options);

  return URL.createObjectURL(entryData);
}

/**
 * Get a list of image files present in the archive
 *
 * @param {Entry[]} entries - list of entries to process
 * @return {Array.<{file: import('@zip.js/zip.js').Entry, index: Number}>} - list of object representing an image entry on the root 
 */
function getImageList(entries) {
  const imageList = [];

  entries.forEach((entry, entryIndex) => {
    const isImage = Boolean(allowedImageFormats.find(f => entry.filename.toLowerCase().endsWith(f)));
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
async function loadZip(archive, filenameEncoding) {
  let entries = await getEntries(archive, { filenameEncoding });

  if (entries && entries.length) {

    // const filenamesUTF8 = Boolean(!entries.find(entry => !entry.filenameUTF8));
    // const encrypted = Boolean(entries.find(entry => entry.encrypted));
    // encodingInput.value = filenamesUTF8 ? "utf-8" : filenameEncoding || "cp437";
    // encodingInput.disabled = filenamesUTF8;
    // passwordInput.value = "";
    // passwordInput.disabled = !encrypted;

    return getImageList(entries);
  }
  
  return [];
}

/**
 * get entry filename and URL
 *
 * @param {import('@zip.js/zip.js').Entry} entry - the entry 
 * @return {} -
 */
async function download(entry) {
  let busy = false;


  if (!busy) {
    let unzipProgress = {
      index: null,
      max: null
    };

    const controller = new AbortController();
    const signal = controller.signal;
    // const abortButton = document.createElement("button");
    // abortButton.onclick = () => controller.abort();
    // abortButton.textContent = "✖";
    // abortButton.title = "Abort";

    busy = true;

    // li.onclick = event => event.preventDefault();

    try {
      const blobURL = await getURL(entry, {
        // password: passwordInput.value,
        onprogress: (index, max) => {
          unzipProgress.index = index;
          unzipProgress.max = max;
        },
        signal
      });

      console.log(blobURL);
      entry.filename;

    } catch (error) {
      if (!signal.reason || signal.reason.code != error.code) {
        throw error;
      }
    } finally {
      busy = false;

      // unzipProgress.remove();
      // abortButton.remove();
    }
  }
}


export {
  loadZip,
  download
};
