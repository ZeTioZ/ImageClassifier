import CryptoJS from "crypto-js";


function readChunked(file, chunkCallback, endCallback) {
  const fileSize = file.size;
  const chunkSize = 4 * 1024 * 1024;  // 4MB
  let offset = 0;

  const reader = new FileReader();

  reader.onload = () => {
    if (reader.error) {
      endCallback(reader.error || {});
      return;
    }

    offset += reader.result.length;
    // callback for handling read chunk
    // TODO: handle errors
    chunkCallback(reader.result, offset, fileSize); 

    if (offset >= fileSize) {
      endCallback(null);
      return;
    }

    readNext();
  };

  reader.onerror = (err) => {
    endCallback(err || {});
  };

  function readNext() {
    const fileSlice = file.slice(offset, offset + chunkSize);
    reader.readAsBinaryString(fileSlice);
  }

  readNext();
}

export function getMD5(blob, cbProgress) {
  return new Promise((resolve, reject) => {
    const md5 = CryptoJS.algo.MD5.create();

    const chunkCallback = (chunk, offs, total) => {
      md5.update(CryptoJS.enc.Latin1.parse(chunk));
      if (cbProgress) {
        cbProgress(offs / total);
      }
    };

    const endCallback = (err) => {
      if (err) {
        reject(err);
      } else {
        // TODO: Handle errors
        var hash = md5.finalize();
        var hashHex = hash.toString(CryptoJS.enc.Hex);
        resolve(hashHex);
      }
    }; 

    readChunked(blob, chunkCallback, endCallback);
  });
}
