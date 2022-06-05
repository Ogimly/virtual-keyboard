// Class Key - constructor(arr, row, number), createKeyToDOM(language, caseChar)
import Key from './KeyClass';
// -----------------------------------------------------------------------------
// Class Keyboard - constructor(data), generateKeysArray(data), ...
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

    this.ControlLeftOn = false;
    this.ControlRightOn = false;

    this.AltLeftOn = false;
    this.AltRightOn = false;

    // returns a string identifying the platform on which the user’s browser is running
    this.userOS = `${navigator.platform}`.substring(0, 3).toUpperCase();
  }

  // array of Key class object from data
  static generateKeysArray(data) {
    const resArray = [];

    data.forEach((row) => {
      const newArr = [];

      row.forEach((col) => {
        newArr.push(new Key(col));
      });

      resArray.push(newArr);
    });

    return resArray;
  }

  // add keys to DOM - in keyboardWrapper
  addKeysToDOM(keyboardWrapper) {
    this.keysArray.forEach((row) => {
      const keyboardRow = document.createElement('div');
      keyboardRow.classList.add('keyboard_row');

      row.forEach((key) => {
        const newKey = key.createKeyToDOM(this.lang, this.caseStatus(this.lang, key));

        keyboardRow.append(newKey);
      });

      keyboardWrapper.append(keyboardRow);
    });
  }

  // update text on keys in DOM
  updateKeysInDOM() {
    let keyDOM = null;

    this.keysArray.forEach((row) => {
      row.forEach((key) => {
        keyDOM = key.keyDOM;
        keyDOM.firstChild.textContent = key[this.lang][this.caseStatus(this.lang, key)];
      });
    });
  }

  // return low or up case depend of capsLockOn & shiftOn
  caseStatus(lang, key) {
    let res = '';

    const capsAllow = key[lang].caps;

    if (capsAllow)
      if (this.capsLockOn === (this.ShiftLeftOn || this.ShiftRightOn)) {
        res = 'low';
      } else {
        res = 'up';
      }
    // for digits & some symbols caps dont work
    else if (this.ShiftLeftOn || this.ShiftRightOn) {
      res = 'up';
    } else {
      res = 'low';
    }

    return res;
  }

  // find key object in keysArray
  findKeyOnCode(code) {
    let res = null;

    this.keysArray.forEach((row) => {
      row.forEach((key) => {
        if (key.id === code) {
          res = key;
        }
      });
    });
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

  // switch Key
  switchKey(code, keyObject) {
    if (code === 'CapsLock') this.capsLockOn = !this.capsLockOn;
    if (code === 'ShiftLeft') this.ShiftLeftOn = !this.ShiftLeftOn;
    if (code === 'ShiftRight') this.ShiftRightOn = !this.ShiftRightOn;
    if (code === 'ControlLeft') this.ControlLeftOn = !this.ControlLeftOn;
    if (code === 'ControlRight') this.ControlRightOn = !this.ControlRightOn;
    if (code === 'AltLeft') this.AltLeftOn = !this.AltLeftOn;
    if (code === 'AltRight') this.AltRightOn = !this.AltRightOn;
    keyObject.keyDOM.firstChild.classList.toggle('-active');
  }

  // if any key was pressed, remove Shift, Control or Alt down
  clearKeyDown(code) {
    this[`${code}LeftOn`] = false;
    this[`${code}RightOn`] = false;

    let key = this.findKeyOnCode(`${code}Left`).keyDOM.firstChild;
    key.classList.remove('-active');

    key = this.findKeyOnCode(`${code}Right`).keyDOM.firstChild;
    key.classList.remove('-active');
  }

  // if any key was pressed, remove CapsLock down
  clearCapsLockDown() {
    this.capsLockOn = false;

    const key = this.findKeyOnCode('CapsLock').keyDOM.firstChild;
    key.classList.remove('-active');
  }

  hotKeyPressed(code) {
    return (
      (this.ShiftLeftOn && !(code === 'ShiftLeft')) ||
      (this.ShiftRightOn && !(code === 'ShiftRight')) ||
      (this.ControlLeftOn && !(code === 'ControlLeft')) ||
      (this.ControlRightOn && !(code === 'ControlRight')) ||
      (this.AltLeftOn && !(code === 'AltLeft')) ||
      (this.AltRightOn && !(code === 'AltRight'))
    );
  }

  getHotKey(code) {
    if (this.ShiftLeftOn) return `ShiftLeft + ${code}`;
    if (this.ShiftRightOn) return `ShiftRight + ${code}`;
    if (this.ControlLeftOn) return `ControlLef + ${code}`;
    if (this.ControlRightOn) return `ControlRight + ${code}`;
    if (this.AltLeftOn) return `AltLeft + ${code}`;
    if (this.AltRightOn) return `AltRight + ${code}`;
    return 'none';
  }
}
