// -----------------------------------------------------------------------------
// Class Key - constructor(arr, row, number), createKeyToDOM()
// -----------------------------------------------------------------------------
export default class Key {
  constructor(arr, row, number) {
    this.type = arr[0];
    this.row = row;
    this.number = number;

    if (this.type === 'ctrl') {
      this.id = arr[1];

      this.label = [arr[2], arr[2], arr[2], arr[2]];
      if (this.id === 'Lang') this.label = [arr[2], arr[2], 'RU', 'RU'];

      this.size = arr[3];
    } else if (this.type === 'space') {
      this.id = arr[1];

      this.label = [arr[2], arr[2], arr[2], arr[2]];

      this.size = arr[3];
    } else if (this.type === 'arrow') {
      this.id = arr[1];

      this.label = [arr[2], arr[2], arr[2], arr[2]];

      this.size = arr[3];
    } else {
      this.type = 'abc';
      this.id = 'abc' + arr[1].charCodeAt(0);

      this.label = [arr[0], arr[1], arr[2], arr[3]];

      this.size = 'mini';
    }
  }
  createKeyToDOM() {
    const keyWrapper = document.createElement('div');
    keyWrapper.classList.add('key_wrapper');
    keyWrapper.classList.add('-' + this.type);
    if (this.type === 'ctrl') keyWrapper.classList.add('-' + this.size);

    keyWrapper.setAttribute('data-id', this.id);
    keyWrapper.setAttribute('data-row', this.row);
    keyWrapper.setAttribute('data-number', this.number);

    const key = document.createElement('div');

    key.classList.add('key');
    key.classList.add('key_' + this.type);

    let span = document.createElement('span');
    span.classList.add('engLower');
    span.textContent = this.label[0];
    key.append(span);

    span = document.createElement('span');
    span.classList.add('engUpper');
    span.classList.add('-hidden');
    span.textContent = this.label[1];
    key.append(span);

    span = document.createElement('span');
    span.classList.add('ruLower');
    span.classList.add('-hidden');
    span.textContent = this.label[2];
    key.append(span);

    span = document.createElement('span');
    span.classList.add('ruUpper');
    span.classList.add('-hidden');
    span.textContent = this.label[3];
    key.append(span);

    keyWrapper.append(key);

    return keyWrapper;
  }
}
