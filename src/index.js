// -----------------------------------------------------------------------------
// classes
// Class Key - constructor(arr, row, number), createKeyToDOM() import Key from './scripts/KeyClass';
// Class Keyboard - constructor(data), generateKeysArray(data), ...
import Keyboard from './scripts/KeyboardClass';
// -----------------------------------------------------------------------------
// global const & data
// KEYS_DATA - array of abc & key properties
import { KEYS_DATA, EGG_DATA } from './scripts/KeysData';
// KEYBOARD - object of class Keyboard - keys array & keyboard properties
const KEYBOARD = new Keyboard(KEYS_DATA);
// keyboardWrapper - DOM element for keyboard
let keyboardWrapper = null;
// inputText - DOM element for textarea
let inputText = null;
// hotKey - DOM element for output pressed hot key
let hotKey = null;
// KeyPressed - what key was pressed in keyboard with mouse
let KeyPressed = null;

// -----------------------------------------------------------------------------
const checkEasterEgg = () => {
  let res = '';
  const str = inputText.value.toUpperCase();
  EGG_DATA.forEach((el) => {
    const key = el.key.toUpperCase();
    if (str.slice(str.length - key.length) === key) res = el.text;
  });
  return res;
};
// -----------------------------------------------------------------------------
// prepare main html
const addMainToDOM = () => {
  const main = document.createElement('main');
  main.classList.add('wrapper');

  const h1 = document.createElement('h1');
  h1.textContent = 'Virtual keyboard (Windows)';
  main.append(h1);

  inputText = document.createElement('textarea');
  inputText.rows = 6;
  main.append(inputText);

  hotKey = document.createElement('p');
  hotKey.classList.add('-hidden');
  hotKey.textContent = 'hot key';
  main.append(hotKey);

  keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard_wrapper');
  main.append(keyboardWrapper);

  const p = document.createElement('p');
  p.textContent = 'Change language <Shift + Ctrl>';
  main.append(p);

  document.body.append(main);
};

// -----------------------------------------------------------------------------
// handler for key press (main handler)
const keyPressHandler = (code) => {
  inputText.focus();

  let text = '';

  const keyObject = KEYBOARD.findKeyOnCode(code);

  if (keyObject) {
    let cursorStart = inputText.selectionStart;
    let cursorEnd = inputText.selectionEnd;
    const textBeforeCursor = inputText.value.substring(0, cursorStart);
    const textAfterCursor = inputText.value.substring(cursorEnd);

    if (KEYBOARD.hotKeyPressed(code)) {
      // Hot Key handler
      if (keyObject.type === 'abc' && (KEYBOARD.ShiftLeftOn || KEYBOARD.ShiftRightOn)) {
        // upper case
        text = keyObject.keyDOM.firstChild.textContent;
      } else if (
        // selection Shift + ArrowLeft
        (KEYBOARD.ShiftLeftOn || KEYBOARD.ShiftRightOn) &&
        code === 'ArrowLeft'
      ) {
        text = '←←';
      } else if (
        // selection Shift + ArrowRight
        (KEYBOARD.ShiftLeftOn || KEYBOARD.ShiftRightOn) &&
        code === 'ArrowRight'
      ) {
        text = '→→';
      } else if (
        // switch to next language in langArray
        ((KEYBOARD.ShiftLeftOn || KEYBOARD.ShiftRightOn) &&
          (code === 'ControlLeft' || code === 'ControlRight')) ||
        ((KEYBOARD.ControlLeftOn || KEYBOARD.ControlRightOn) &&
          (code === 'ShiftLeft' || code === 'ShiftRight'))
      ) {
        KEYBOARD.switchLanguage();
        KEYBOARD.updateKeysInDOM();
      } else {
        // output hot key
        hotKey.textContent = `<${KEYBOARD.getHotKey(code)}> was pressed`;
        text = '';
        hotKey.classList.remove('-hidden');
        window.setTimeout(() => {
          hotKey.classList.add('-hidden');
        }, 3000);
      }
    } else if (code === 'Lang') {
      // switch to next language in langArray
      KEYBOARD.switchLanguage();
      KEYBOARD.updateKeysInDOM();
    } else if (code === 'CapsLock' || code === 'ShiftLeft' || code === 'ShiftRight') {
      // switch Caps or Shift
      KEYBOARD.switchKey(code, keyObject);
      KEYBOARD.updateKeysInDOM();
    } else if (code === 'ControlLeft' || code === 'ControlRight') {
      // switch Control
      KEYBOARD.switchKey(code, keyObject);
    } else if (code === 'AltLeft' || code === 'AltRight') {
      // switch Alt
      KEYBOARD.switchKey(code, keyObject);
    } else if (keyObject.type === 'abc') {
      text = keyObject.keyDOM.firstChild.textContent;
    } else if (code === 'Enter') {
      text = '\n';
    } else if (code === 'Tab') {
      text = '\t';
    } else if (code === 'Backspace') {
      text = 'Backspace';
    } else if (code === 'Delete') {
      text = 'Delete';
    } else if (code === 'ArrowLeft') {
      text = '←';
    } else if (code === 'ArrowRight') {
      text = '→';
    } else if (code === 'ArrowUp') {
      text = '↑';
    } else if (code === 'ArrowDown') {
      text = '↓';
    }

    if (text) {
      // Backspace
      if (text === 'Backspace') {
        if (cursorStart === cursorEnd) {
          // no selection
          inputText.value = textBeforeCursor.slice(0, -1) + textAfterCursor;
          cursorStart = cursorStart === 0 ? 0 : cursorStart - 1;
          cursorEnd = cursorStart;
        } else {
          inputText.value = textBeforeCursor + textAfterCursor;
          cursorEnd = cursorStart;
        }
      }
      // Delete
      else if (text === 'Delete') {
        if (cursorStart === cursorEnd) {
          // no selection
          inputText.value = textBeforeCursor + textAfterCursor.slice(1);
        } else {
          inputText.value = textBeforeCursor + textAfterCursor;
          cursorEnd = cursorStart;
        }
      }
      // ArrowLeft & selection
      else if (text === '←') {
        cursorStart =
          cursorStart === 0
            ? 0 // start of line
            : cursorStart - 1;
        cursorEnd = cursorStart;
      } else if (text === '←←') {
        cursorStart =
          cursorStart === 0
            ? 0 // start of line
            : cursorStart - 1;
        inputText.selectionDirection = 'backward';
      }
      // ArrowRight & selection
      else if (text === '→') {
        cursorStart =
          cursorStart === inputText.value.length - 1
            ? inputText.value.length // end of line
            : cursorStart + 1;
        cursorEnd = cursorStart;
      } else if (text === '→→') {
        cursorEnd =
          cursorEnd === inputText.value.length - 1
            ? inputText.value.length // end of line
            : cursorEnd + 1;
        inputText.selectionDirection = 'forward';
      }
      // ArrowUp, ArrowDown - TODO || !TODO
      // abc & other
      else {
        inputText.value = textBeforeCursor + text + textAfterCursor;
        cursorStart =
          cursorStart === inputText.value.length - 1
            ? inputText.value.length // end of line
            : cursorStart + text.length;
        cursorEnd = cursorStart;
      }

      text = checkEasterEgg();
      if (text) {
        inputText.value = textBeforeCursor + text + textAfterCursor;
        cursorStart =
          cursorStart === inputText.value.length - 1
            ? inputText.value.length // end of line
            : cursorStart + text.length;
        cursorEnd = cursorStart;
      }

      inputText.selectionStart = cursorStart;
      inputText.selectionEnd = cursorEnd;
    }
  }
};
// -----------------------------------------------------------------------------
// add or remove class -pressed
const addPressed = (keyDown) => {
  if (keyDown) {
    const keyBtn = keyDown.firstChild;
    if (keyBtn) {
      keyBtn.classList.add('-pressed');
    }
  }
};
const removePressed = (keyUp) => {
  if (keyUp) {
    const keyBtn = keyUp.firstChild;
    if (keyBtn) {
      keyBtn.classList.remove('-pressed');
    }
  }
};
// -----------------------------------------------------------------------------
// handlers for keyDown & keyUp ( mouse & keyboard )
const onMouseDown = (event) => {
  const keyDown = event.target.closest('.key_wrapper');
  if (keyDown) {
    // const code = keyDown.getAttribute('data-id');
    addPressed(keyDown);

    // remember this key
    KeyPressed = keyDown;
  }
};
const onMouseUp = (event) => {
  if (KeyPressed) {
    // if key was pressed
    const keyUp = event.target.closest('.key_wrapper');

    if (keyUp) {
      // if target is key
      const code = keyUp.getAttribute('data-id');

      if (code === KeyPressed.getAttribute('data-id')) {
        // if target is key, that was pressed
        event.preventDefault();

        // main handler
        keyPressHandler(code);

        // if any key was pressed, remove Shift, Control or Alt down
        if (
          (KEYBOARD.ShiftLeftOn || KEYBOARD.ShiftRightOn) &&
          !(code === 'ShiftLeft' || code === 'ShiftRight')
        ) {
          KEYBOARD.clearKeyDown('Shift');
          KEYBOARD.updateKeysInDOM();
        }
        if (
          (KEYBOARD.ControlLeftOn || KEYBOARD.ControlRightOn) &&
          !(code === 'ControlLeft' || code === 'ControlRight')
        ) {
          KEYBOARD.clearKeyDown('Control');
        }
        if (
          (KEYBOARD.AltLeftOn || KEYBOARD.AltRightOn) &&
          !(code === 'AltLeft' || code === 'AltRight')
        ) {
          KEYBOARD.clearKeyDown('Alt');
        }

        removePressed(keyUp);
      } else removePressed(KeyPressed); // up key pressed
      // up key pressed
    } else removePressed(KeyPressed);

    KeyPressed = null;
  }
};
const onKeyboardDown = (event) => {
  const { code } = event;
  const keyDown = document.querySelector(`.key_wrapper[data-id='${code}']`);

  event.preventDefault();

  // sticky key protection)
  if (
    !(
      (code === 'ShiftLeft' || code === 'ShiftRight') &&
      (KEYBOARD.ShiftLeftOn || KEYBOARD.ShiftRightOn)
    )
  ) {
    // main handler
    keyPressHandler(code);
  }

  if (keyDown) addPressed(keyDown);
};
const onKeyboardUp = (event) => {
  const { code } = event;
  const keyUp = document.querySelector(`.key_wrapper[data-id='${code}']`);

  if (keyUp) removePressed(keyUp);

  if (code === 'CapsLock' && KEYBOARD.userOS === 'MAC') {
    // Если на винде зажатие капса вызывает keydown, а отжатие - keyup, то на маке первое нажатие-отжатие вызывает keydown, а второе - keyup
    KEYBOARD.clearCapsLockDown();
    KEYBOARD.updateKeysInDOM();
  }

  // need to remove press shifts
  if (code === 'ShiftLeft' || code === 'ShiftRight') {
    KEYBOARD.clearKeyDown('Shift');
    KEYBOARD.updateKeysInDOM();
  }
  if (code === 'ControlLeft' || code === 'ControlRight') {
    KEYBOARD.clearKeyDown('Control');
  }
  if (code === 'AltLeft' || code === 'AltRight') {
    KEYBOARD.clearKeyDown('Alt');
  }
};
// -----------------------------------------------------------------------------
// add handler for mouse
const addMouseHandler = () => {
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
};
// -----------------------------------------------------------------------------
// add handler for keyboard (physical)
const addKeyboardHandler = () => {
  document.addEventListener('keydown', onKeyboardDown);
  document.addEventListener('keyup', onKeyboardUp);
};
// -----------------------------------------------------------------------------
// start on load of page
// -----------------------------------------------------------------------------
window.onload = () => {
  // prepare main html
  addMainToDOM();

  // add keys in keyboardWrapper
  KEYBOARD.addKeysToDOM(keyboardWrapper);

  // add handler for mouse
  addMouseHandler();

  // add handler for keyboard (physical)
  addKeyboardHandler();
};
