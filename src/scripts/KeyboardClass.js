// Class Key - constructor(arr, row, number), createKeyToDOM(language, caseChar)
import Key from './KeyClass';
// -----------------------------------------------------------------------------
// Class Keyboard - constructor(data), generateKeysArray(data), update(type, key, code)
// -----------------------------------------------------------------------------
export default class Keyboard {
  constructor(data) {
    this.keysArray = this.generateKeysArray(data);
    this.langArray = ['EN', 'RU'];
    this.lang = 'EN';
    this.capsLockOn = false;
    this.ShiftLeftOn = false;
    this.ShiftRightOn = false;
  }
  // array of Key class object from data
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
  // add keys to DOM - in keyboardWrapper
  addKeysToDOM(keyboardWrapper) {
    for (let row = 0; row < this.keysArray.length; row++) {
      let keyboardRow = document.createElement('div');
      keyboardRow.classList.add('keyboard_row');

      let arr = this.keysArray[row];
      for (let col = 0; col < arr.length; col++) {
        let newKey = arr[col].createKeyToDOM(this.lang, this.caseStatus());

        keyboardRow.append(newKey);
      }

      keyboardWrapper.append(keyboardRow);
    }
  }
  // update text on keys in DOM
  updateKeysInDOM() {
    let keyDOM = null;
    for (let row = 0; row < this.keysArray.length; row++) {
      const arr = this.keysArray[row];

      for (let col = 0; col < arr.length; col++) {
        keyDOM = arr[col].keyDOM;
        keyDOM.firstChild.textContent = arr[col][this.lang][this.caseStatus()];
      }
    }
  }
  // return low or up case depend of capsLockOn & shiftOn
  caseStatus() {
    if (this.capsLockOn === (this.ShiftLeftOn || this.ShiftRightOn)) return 'low';
    else return 'up';
  }
  // find key object in keysArray
  findKeyOnCode(code) {
    let res = null;

    for (let row = 0; row < this.keysArray.length; row++) {
      const arr = this.keysArray[row];

      for (let col = 0; col < arr.length; col++) {
        if (arr[col].id === code) {
          res = arr[col];
          break;
        }
      }
    }
    return res;
  }
  // switch to next language in langArray
  switchLanguage() {
    this.lang =
      this.langArray[(this.langArray.indexOf(this.lang) + 1) % this.langArray.length];
  }
  // switch Caps and Shift
  switchCase(code) {
    if (code === 'CapsLock') this.capsLockOn = !this.capsLockOn;
    if (code === 'ShiftLeft') this.ShiftLeftOn = !this.ShiftLeftOn;
    if (code === 'ShiftRight') this.ShiftRight = !this.ShiftRight;
  }
  // if any abc key was pressed, remove Shift down
  clearShiftDown() {
    this.ShiftLeftOn = false;
    this.ShiftRight = false;

    let shift = this.findKeyOnCode('ShiftLeft').keyDOM.firstChild;
    shift.classList.remove('-active');

    shift = this.findKeyOnCode('ShiftRight').keyDOM.firstChild;
    shift.classList.remove('-active');
  }
  // update keyboard properties & render
  update(code) {
    if (code) {
      let keyObject = this.findKeyOnCode(code);

      if (keyObject) {
        if (keyObject.type === 'abc') {
          // handler todo

          // if any abc key was pressed, remove Shift down
          if (this.ShiftLeftOn || this.ShiftRightOn) {
            this.clearShiftDown();
            this.updateKeysInDOM();
          }
        }
        // switch to next language in langArray
        else if (code === 'Lang') {
          this.switchLanguage();
          this.updateKeysInDOM();
        }
        // switch Caps or Shift
        else if (code === 'CapsLock' || code === 'ShiftLeft' || code === 'ShiftRight') {
          this.switchCase(code);
          this.updateKeysInDOM();
        }
      }
    }
  }
}
