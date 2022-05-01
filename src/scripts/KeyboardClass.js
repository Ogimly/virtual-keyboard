// Class Key - constructor(arr, row, number), createKeyToDOM()
import Key from './KeyClass';
// -----------------------------------------------------------------------------
// Class Keyboard - constructor(data), generateKeysArray(data)
// -----------------------------------------------------------------------------
export default class Keyboard {
  constructor(data) {
    this.keysArray = this.generateKeysArray(data);
    this.lang = 'EN';
    this.capsLockOn = false;
    this.shiftOn = false;
  }
  generateKeysArray(data) {
    let resArray = [];

    for (let row = 0; row < data.length; row++) {
      const arr = data[row];
      let newArr = [];

      for (let col = 0; col < arr.length; col++) {
        newArr.push(new Key(arr[col], row, col));
      }

      resArray.push(newArr);
    }
    return resArray;
  }
}
