// -----------------------------------------------------------------------------
// Class Key - constructor(arr, row, number), createKeyToDOM(language, caseChar)
// -----------------------------------------------------------------------------
export default class Key {
  constructor(arr, row, number) {
    this.row = row;
    this.number = number;

    this.type = arr.type;
    this.id = arr.id;
    this.size = arr.size;

    let label = arr.label;

    if (Array.isArray(label)) {
      this.EN = { low: label[0], up: label[1] };
      this.RU = { low: label[2], up: label[3] };
    } else {
      label = '' + label;
      this.EN = { low: label, up: label };
      this.RU = { low: label, up: label };
    }

    this.keyDOM = null;
  }
  createKeyToDOM(language, caseStatus) {
    const keyWrapper = document.createElement('div');
    keyWrapper.classList.add('key_wrapper');
    keyWrapper.classList.add('-' + this.type);
    keyWrapper.classList.add('-' + this.size);

    keyWrapper.setAttribute('data-id', this.id);
    keyWrapper.setAttribute('data-type', this.type);
    // keyWrapper.setAttribute('data-row', this.row);
    // keyWrapper.setAttribute('data-number', this.number);

    let char = this[language][caseStatus];
    keyWrapper.setAttribute('data-currentKey', char);

    const key = document.createElement('div');

    key.classList.add('key');
    key.classList.add('key_' + this.type);
    key.textContent = char;

    keyWrapper.append(key);

    this.keyDOM = keyWrapper;

    return keyWrapper;
  }
}
