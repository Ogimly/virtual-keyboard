// Class Key - constructor(arr, row, number), createKeyToDOM(language, caseChar)
import Key from './KeyClass';
// -----------------------------------------------------------------------------
// Class Keyboard - constructor(data), generateKeysArray(data), update(type, key, code)
// -----------------------------------------------------------------------------
export default class Keyboard {
  constructor(data) {
    this.keysArray = Keyboard.generateKeysArray(data);

    this.langArray = ['EN', 'RU'];
    [this.lang] = this.langArray;

    this.getLangFromLocalStorage();

    this.capsLockOn = false;
    this.ShiftLeftOn = false;
    this.ShiftRightOn = false;
  }

  // array of Key class object from data
  static generateKeysArray(data) {
    const resArray = [];

    for (let row = 0; row < data.length; row += 1) {
      const arr = data[row];
      const newArr = [];

      for (let col = 0; col < arr.length; col += 1) {
        newArr.push(new Key(arr[col], row, col));
      }

      resArray.push(newArr);
    }
    return resArray;
  }

  // add keys to DOM - in keyboardWrapper
  addKeysToDOM(keyboardWrapper) {
    for (let row = 0; row < this.keysArray.length; row += 1) {
      const keyboardRow = document.createElement('div');
      keyboardRow.classList.add('keyboard_row');

      const arr = this.keysArray[row];
      for (let col = 0; col < arr.length; col += 1) {
        const newKey = arr[col].createKeyToDOM(this.lang, this.caseStatus());

        keyboardRow.append(newKey);
      }

      keyboardWrapper.append(keyboardRow);
    }
  }

  // update text on keys in DOM
  updateKeysInDOM() {
    let keyDOM = null;
    for (let row = 0; row < this.keysArray.length; row += 1) {
      const arr = this.keysArray[row];

      for (let col = 0; col < arr.length; col += 1) {
        keyDOM = arr[col].keyDOM;
        keyDOM.firstChild.textContent = arr[col][this.lang][this.caseStatus()];
      }
    }
  }

  // return low or up case depend of capsLockOn & shiftOn
  caseStatus() {
    if (this.capsLockOn === (this.ShiftLeftOn || this.ShiftRightOn)) return 'low';
    return 'up';
  }

  // find key object in keysArray
  findKeyOnCode(code) {
    let res = null;

    for (let row = 0; row < this.keysArray.length; row += 1) {
      const arr = this.keysArray[row];

      for (let col = 0; col < arr.length; col += 1) {
        if (arr[col].id === code) {
          res = arr[col];
          break;
        }
      }
    }
    return res;
  }

  // get lang property from localStorage (set if it not defend)
  getLangFromLocalStorage() {
    if (localStorage.getItem('virtual-keyboard.lang')) {
      this.lang = localStorage.getItem('virtual-keyboard.lang');
    } else {
      localStorage.setItem('virtual-keyboard.lang', this.lang);
    }
  }

  // switch to next language in langArray & save it to localStorage
  switchLanguage() {
    this.lang =
      this.langArray[(this.langArray.indexOf(this.lang) + 1) % this.langArray.length];

    localStorage.setItem('virtual-keyboard.lang', this.lang);
  }

  // switch Caps and Shifts
  switchCase(code, keyObject) {
    if (code === 'CapsLock') this.capsLockOn = !this.capsLockOn;
    if (code === 'ShiftLeft') this.ShiftLeftOn = !this.ShiftLeftOn;
    if (code === 'ShiftRight') this.ShiftRightOn = !this.ShiftRightOn;
    keyObject.keyDOM.firstChild.classList.toggle('-active');
  }

  // if any key was pressed, remove Shift down
  clearShiftDown() {
    this.ShiftLeftOn = false;
    this.ShiftRightOn = false;

    let shift = this.findKeyOnCode('ShiftLeft').keyDOM.firstChild;
    shift.classList.remove('-active');

    shift = this.findKeyOnCode('ShiftRight').keyDOM.firstChild;
    shift.classList.remove('-active');
  }

  // update keyboard properties & render
  update(code) {
    if (code) {
      const keyObject = this.findKeyOnCode(code);

      if (keyObject) {
        // case of type & code
        if (keyObject.type === 'abc') {
          // handler todo

          // if any key was pressed, remove Shift down
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
          this.switchCase(code, keyObject);
          this.updateKeysInDOM();
        }
      }
    }
  }
}
