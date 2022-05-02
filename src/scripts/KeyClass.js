// -----------------------------------------------------------------------------
// Class Key - constructor(arr, row, number), createKeyToDOM()
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
      this.enLower = label[0];
      this.enUpper = label[1];
      this.ruLower = label[2];
      this.ruUpper = label[3];
    } else {
      label = '' + label;
      this.enLower = label;
      this.enUpper = label;
      this.ruLower = label;
      this.ruUpper = label;
    }
  }
  createKeyToDOM() {
    const keyWrapper = document.createElement('div');
    keyWrapper.classList.add('key_wrapper');
    keyWrapper.classList.add('-' + this.type);
    if (this.type === 'ctrl') keyWrapper.classList.add('-' + this.size);

    keyWrapper.setAttribute('data-id', this.id);
    keyWrapper.setAttribute('data-type', this.type);
    // keyWrapper.setAttribute('data-row', this.row);
    // keyWrapper.setAttribute('data-number', this.number);

    keyWrapper.setAttribute('data-currentKey', this.enLower);

    const key = document.createElement('div');

    key.classList.add('key');
    key.classList.add('key_' + this.type);

    let span = document.createElement('span');
    span.classList.add('enLower');
    span.textContent = this.enLower;
    key.append(span);

    span = document.createElement('span');
    span.classList.add('enUpper');
    span.classList.add('-hidden');
    span.textContent = this.enUpper;
    key.append(span);

    span = document.createElement('span');
    span.classList.add('ruLower');
    span.classList.add('-hidden');
    span.textContent = this.ruLower;
    key.append(span);

    span = document.createElement('span');
    span.classList.add('ruUpper');
    span.classList.add('-hidden');
    span.textContent = this.ruUpper;
    key.append(span);

    keyWrapper.append(key);

    return keyWrapper;
  }
}
