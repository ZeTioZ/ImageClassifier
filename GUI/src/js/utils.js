import { Tag } from './tag';

/**
* Function used to wait for the response of a promise object.
*/
export function until(condition) {
  const poll = resolve => {
    if (condition()) resolve();
    else setTimeout(() => poll(resolve), 400);
  }

  return new Promise(poll);
}

/**
* Function used to handle the response gotten after the upload of an archive.
*
* @param {object} response - the response of the POST request.
* @param {Array.<Archive>} archiveList - the list of archive objects.
* @return {Array.<Image>} - the list of image object freshly created with all data loaded.
*/ 
export async function handleApiResponseForArchiveUploads(response, archiveList) {
  // get tags
  const tags = Object.keys(response.generated_tags.classes)
    .map(key => response.generated_tags.classes[key]);

  // create tag objects
  Tag._colorIndex = 0;
  Tag.TAGS = tags
    .map(tag => new Tag(tag, tag));

  // extract images from all archives in a single list
  const images = archiveList
    .map(archive => archive.images)
    .flat();

  // == set image properties ==
  for (let img of images) {

    // wait until image is loaded
    await until(() => !img.loading);

    // retreive data in the response for the image
    const imgData = response.generated_tags[img.hash];

    // change image name if needed
    const newName = imgData.file_name;

    // -- SUBJECT TO CHANGES --
    // create new tag to the list if tag not in default classes
    imgData.detection_tags
      .filter(tag => !Tag.TAGS.map(t => t.tagname).includes(tag))
      .forEach(tag => Tag.TAGS.push(new Tag(tag, tag)));
    // ------------------------

    // get tag objects for the image
    const imageTags = Tag.TAGS
      .filter(tag => imgData.detection_tags.includes(tag.tagname));

    // should the image be deleted...
    const toBeDeleted = !imgData.is_qualitative;

    // ...and why
    const reasonForDeletion = imgData.quality_tags;


    img.setProperties(newName, imageTags, toBeDeleted, reasonForDeletion);
  }


  return images;
}

/**
* This function gives the dimensions of an image from its url.
*
* @param {string} url - the url of the image.
* @param {Function} callback - the callback function that manages the width and the height.
*/
export function sizeOf(url, callback) {
  const img = new Image();
  img.src = url;
  img.onload = () => { callback(img.width, img.height); }
}

