
/**
 *
 * Class representing a tag for an image.
 *
 */
export class Tag {
  _tagname
  _displayName
  _cssColorClass

  constructor(tagname, displayName) {
    this._tagname = tagname;
    this._displayName = displayName;
    this._cssColorClass = "bg-ls-vert-base";
  }

  /**
  * Get the name of the tag, act as a sort of unique identifier.
  *
  * @return {string} - the normally unique name of the tag.
  */
  get tagname() {
    return this.tagname;
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
}
