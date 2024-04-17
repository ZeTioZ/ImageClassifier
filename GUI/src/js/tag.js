
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

  constructor(tagname, displayName, qualityTag = false) {
    this._tagname = tagname;
    switch (displayName) {
      case "food":
        this._displayName = "nourriture";
        break;
      case "activity":
        this._displayName = "activité";
        break;
      case "equipment":
        this._displayName = "équipement";
        break;
      case "music-instrument":
        this._displayName = "musique-instrument";
        break;
      case "nasty":
        this._displayName = "nuisible";
        break;
      case "person":
        this._displayName = "personne";
        break;
      case "blurry":
        this._displayName = "flou";
        break;
      case "not_bright":
        this._displayName = "luminosité";
        break;
      case "min_width":
        this._displayName = "largeur minimale";
        break;
      case "min_height":
        this._displayName = "hauteur minimale";
        break;
      default:
        this._displayName = displayName;
    }

    if (qualityTag) {
      this._cssColorClass = "bg-black";
    } else {
      this._cssColorClass = Tag._CSS_COLOR_CLASSES[Tag._colorIndex];
      Tag._colorIndex = (Tag._colorIndex + 1) % Tag._CSS_COLOR_CLASSES.length;
    }
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
