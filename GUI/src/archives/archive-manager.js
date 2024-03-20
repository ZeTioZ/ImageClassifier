import {
  ZipReader,
  BlobReader,
  BlobWriter,
  Entry,
} from '@zip.js/zip.js';


/**
 * Get a list of entries from a file
 * @param {Blob} file - blob of the file in which entries must be read
 * @param {object} options - options
 * @return {Entry[]} - list of entries read
 */
function _getEntries(file, options) {
  const blobReader = new BlobReader(file);
  const zipReader = new ZipReader(blobReader);

  return zipReader.getEntries(options);
}

/**
 * Get the URL of an entry
 * @param {Entry} entry - the entry
 * @param {object} options - options to get data from the entry
 */
async function _getURL(entry, options) {
  const entryData = await entry.getData(new BlobWriter(), options);

  return URL.createObjectURL(entryData);
}

/**
 * Get a list of files present in the archive
 * @param {Entry[]} entries - list of entries to process
 * @return {object[]} - list of object representing an image entry 
 */
function _getFileList(entries) {
  const fileList = [];

  entries.forEach((entry, entryIndex) => {
    if (!entry.directory /* && isImage */) {
      fileList.push({
        index: entryIndex,
        filename: entry.filename,
        lastModDate: entry.lastModDate.toLocaleString(),
      });
    }
  });

  return fileList;
}

/**
 * Load an archive and get a list of entries
 * @param {Blob} archive - blob of the archive in which entries must be read
 * @param {string} filenameEncoding - the encoding of the filename of the entry
 * @return {Entry[]} - list of the entries
 */
async function loadZip(archive, filenameEncoding) {
  const entries = _getEntries(archive, { filenameEncoding });

  if (entries && entries.length) {
    return _getFileList();
  } else {
    return [];
  }
}

/**
 * get entry filename and URL
 * @param {Entry} entry - the entry 
 * @return {} -
 */
async function download(entry /*, li, a*/) {
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
      const blobURL = await _getURL(entry, {
        // password: passwordInput.value,
        onprogress: (index, max) => {
          unzipProgress.index = index;
          unzipProgress.max = max;
        },
        signal
      });

      blobURL;
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
