import {
  ZipReader,
  BlobReader,
  BlobWriter,
} from '@zip.js/zip.js';

// get entries from a file
function getEntries(file, options) {
  return (new ZipReader(new BlobReader(file))).getEntries(options);
}

// get URL of an entry
async function getURL(entry, options) {
  return URL.createObjectURL(await entry.getData(new BlobWriter(), options));
}

// load files and get list
async function loadFiles(blob, filenameEncoding) {
  const entries = await getEntries(blob, { filenameEncoding });

  if (entries && entries.length) {
    return getFileList();
  }
}

// get file list
function getFileList(entries) {
  const fileList = [];

  entries.forEach((entry, entryIndex) => {
    if (!entry.directory) {
      fileList.push({
        index: entryIndex,
        filename: entry.filename,
        lastModDate: entry.lastModDate.toLocaleString(),
      });
    }
  });

  return fileList;
}

async function download(entry, li, a) {
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
