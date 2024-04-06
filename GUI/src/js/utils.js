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

    // get tag objects for the image
    const imageTags = Tag.TAGS
      .filter(tag => imgData.detection_tags.includes(tag.tagname));

    // should the image be deleted...
    const toBeDeleted = imgData.is_qualitative;

    // ...and why
    const reasonForDeletion = imgData.quality_tags;


    img.setProperties(imageTags, toBeDeleted, reasonForDeletion);
  }


  return images;
}
