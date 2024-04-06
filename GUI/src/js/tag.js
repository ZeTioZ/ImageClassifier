
/**
 *
 * Class representing a tag for an image.
 *
 */
export class Tag {
  _tagname
  _displayName
  _cssColorClass

  static _TAGS = [];

  static _colorIndex = 0;
  static _CSS_COLOR_CLASSES = [
    "bg-ls-vert-base",
    "bg-ls-vert-fonce",
    "bg-ls-bleu-fonce",
    "bg-ls-prune",
    "bg-ls-orange",
    "bg-ls-gris",
    "bg-ls-turquoise",
    "bg-ls-bleu-clair",
    "bg-ls-rouge",
    "bg-ls-rose",
    "bg-ls-baladins",
    "bg-ls-louveteaux",
    "bg-ls-eclaireurs",
    "bg-ls-pionniers",
    "bg-ls-mondial",

    // point of failure: if there are more tags than elements in this list,
    // an unexpected error will occur.
  ];

  constructor(tagname, displayName) {
    this._tagname = tagname;
    this._displayName = displayName;
    this._cssColorClass = Tag._CSS_COLOR_CLASSES[Tag._colorIndex];
    Tag._colorIndex++;
  }

  /**
  * Get the name of the tag, act as a sort of unique identifier.
  *
  * @return {string} - the normally unique name of the tag.
  */
  get tagname() {
    return this._tagname;
  }

  /**
  * Get the display name of the tag. This value can store the translation for a tag for instance.
  *
  * @return {string} - the display name of the tag.
  */
  get displayName() {
    return this._displayName;
  }

  /**
  * Get the css class use for a representation of the tag in a component.
  * This class is a css class for a background (see Tailwindcss background classes).
  *
  * @return {string} - the css class for the tag.
  */
  get cssColorClass() {
    return this._cssColorClass;
  }

  static set TAGS(tags) {
    Tag._TAGS = tags;
  }

  static get TAGS() {
    return Tag._TAGS;
  }
}
