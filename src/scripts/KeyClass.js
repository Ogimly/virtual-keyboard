// -----------------------------------------------------------------------------
// Class Key - constructor(arr, row, number), createKeyToDOM(language, caseChar)
// -----------------------------------------------------------------------------
export default class Key {
  constructor(arr) {
    this.type = arr.type;
    this.id = arr.id;
    this.size = arr.size;

    let { label: charArray } = arr;

    if (Array.isArray(charArray)) {
      charArray.forEach((obj) => {
        this[obj.lang] = { low: obj.low, up: obj.up, caps: obj.caps };
      });
    } else {
      charArray = `${charArray}`;
      this.EN = { low: charArray, up: charArray, caps: false };
      this.RU = { low: charArray, up: charArray, caps: false };
    }

    this.keyDOM = null;
  }

  createKeyToDOM(language, caseStatus) {
    const keyWrapper = document.createElement('div');
    keyWrapper.classList.add('key_wrapper');
    keyWrapper.classList.add(`-${this.type}`);
    keyWrapper.classList.add(`-${this.size}`);

    keyWrapper.setAttribute('data-id', this.id);
    keyWrapper.setAttribute('data-type', this.type);

    const char = this[language][caseStatus];
    keyWrapper.setAttribute('data-currentKey', char);

    const key = document.createElement('div');

    key.classList.add('key');
    key.classList.add(`key_${this.type}`);
    key.textContent = char;

    keyWrapper.append(key);

    this.keyDOM = keyWrapper;

    return keyWrapper;
  }
}
