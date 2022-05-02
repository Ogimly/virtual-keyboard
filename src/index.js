// -----------------------------------------------------------------------------
// classes
// Class Key - constructor(arr, row, number), createKeyToDOM() import Key from './scripts/KeyClass';
// Class Keyboard - constructor(data), generateKeysArray(data)
import Keyboard from './scripts/KeyboardClass';
// -----------------------------------------------------------------------------
// global const & data
// KEYS_DATA - array of abc & key properties
import KEYS_DATA from './scripts/KeysData';
// KEYBOARD - object of class Keyboard - keys array & keyboard properties
const KEYBOARD = new Keyboard(KEYS_DATA);
// KeyPressed - what key was pressed in keyboard with mouse
let KeyPressed = null;
// -----------------------------------------------------------------------------
// start on load of page
window.onload = function () {
  // prepare main html & return keyboardWrapper
  const keyboardWrapper = addMainToDOM();

  // add keys in keyboardWrapper
  addKeysToDOM(KEYBOARD.keysArray, keyboardWrapper);

  // add handler for mouse
  addMouseHandler();

  // add handler for keyboard (physical)
  addKeyboardHandler();
};
// -----------------------------------------------------------------------------
// prepare main html & return keyboardWrapper
const addMainToDOM = () => {
  const main = document.createElement('main');
  main.classList.add('wrapper');

  const h1 = document.createElement('h1');
  h1.textContent = 'Virtual keyboard (Windows)';
  main.append(h1);

  const textarea = document.createElement('textarea');
  textarea.rows = 6;
  main.append(textarea);

  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard_wrapper');
  main.append(keyboardWrapper);

  document.body.append(main);

  return keyboardWrapper;
};
// -----------------------------------------------------------------------------
// add keys in keyboardWrapper
const addKeysToDOM = (keysArray, keyboardWrapper) => {
  for (let row = 0; row < keysArray.length; row++) {
    let keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard_row');

    let arr = keysArray[row];
    for (let col = 0; col < arr.length; col++) {
      let newKey = arr[col].createKeyToDOM();

      keyboardRow.append(newKey);
    }

    keyboardWrapper.append(keyboardRow);
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
// handlers for keyDown & keyUp ( mouse & keyboard )
const onMouseDown = (event) => {
  const keyDown = event.target.closest('.key_wrapper');
  if (keyDown) {
    const code = keyDown.getAttribute('data-id');
    const key = keyDown.getAttribute('data-currentKey');

    onKeyDown(keyDown, key, code);
    KeyPressed = keyDown; //remember this key
  }
};
const onMouseUp = (event) => {
  if (KeyPressed) {
    // if key was pressed
    const keyUp = event.target.closest('.key_wrapper');

    if (keyUp) {
      // if target is key
      const code = keyUp.getAttribute('data-id');
      const key = keyUp.getAttribute('data-currentKey');

      if (code === KeyPressed.getAttribute('data-id')) {
        // if target is key, that was pressed
        onKeyUp(keyUp, key, code);
      } else KeyPressed.firstChild.classList.remove('-active'); // up key pressed
      // up key pressed
    } else KeyPressed.firstChild.classList.remove('-active');

    KeyPressed = null;
  }
};
const onKeyboardDown = (event) => {
  const code = event.code;
  const key = event.key;
  const keyDown = document.querySelector(`.key_wrapper[data-id='${code}']`);

  if (keyDown) onKeyDown(keyDown, key, code);
};
const onKeyboardUp = (event) => {
  const code = event.code;
  const key = event.key;
  const keyUp = document.querySelector(`.key_wrapper[data-id='${code}']`);

  if (keyUp) onKeyUp(keyUp, key, code);
};
// -----------------------------------------------------------------------------
// handlers for keyDown & keyUp ( source of event does not matter )
const onKeyDown = (keyDown, key, code) => {
  if (keyDown) {
    const type = keyDown.getAttribute('data-type');
    const keyBtn = keyDown.firstChild;
    if (keyBtn) {
      keyBtn.classList.add('-active');
    }
  }
};
const onKeyUp = (keyUp, key, code) => {
  if (keyUp) {
    const type = keyUp.getAttribute('data-type');
    const keyBtn = keyUp.firstChild;
    if (keyBtn) {
      keyBtn.classList.remove('-active');
    }
  }
};
