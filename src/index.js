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
// keyboardWrapper - DOM element for keyboard
let keyboardWrapper = null;
// KeyPressed - what key was pressed in keyboard with mouse
let KeyPressed = null;
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

  const kbWrapper = document.createElement('div');
  kbWrapper.classList.add('keyboard_wrapper');
  main.append(kbWrapper);

  document.body.append(main);

  return keyboardWrapper;
};
// -----------------------------------------------------------------------------
// handlers for keyDown & keyUp ( source of event does not matter )
const onKeyDown = (keyDown) => {
  if (keyDown) {
    const keyBtn = keyDown.firstChild;
    if (keyBtn) {
      keyBtn.classList.add('-pressed');
    }
  }
};
const onKeyUp = (keyUp, code) => {
  if (keyUp) {
    KEYBOARD.update(code);

    const keyBtn = keyUp.firstChild;
    if (keyBtn) {
      keyBtn.classList.remove('-pressed');
      if (code === 'CapsLock' || code === 'ShiftLeft' || code === 'ShiftRight')
        keyBtn.classList.toggle('-active');
    }
  }
};
// -----------------------------------------------------------------------------
// handlers for keyDown & keyUp ( mouse & keyboard )
const onMouseDown = (event) => {
  const keyDown = event.target.closest('.key_wrapper');
  if (keyDown) {
    onKeyDown(keyDown);
    KeyPressed = keyDown; // remember this key
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
        onKeyUp(keyUp, code);
      } else KeyPressed.firstChild.classList.remove('-pressed'); // up key pressed
      // up key pressed
    } else KeyPressed.firstChild.classList.remove('-pressed');

    KeyPressed = null;
  }
};
const onKeyboardDown = (event) => {
  const { code } = event;
  const keyDown = document.querySelector(`.key_wrapper[data-id='${code}']`);

  if (keyDown) onKeyDown(keyDown);
};
const onKeyboardUp = (event) => {
  const { code } = event;
  const keyUp = document.querySelector(`.key_wrapper[data-id='${code}']`);

  if (keyUp) onKeyUp(keyUp, code);
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
  // prepare main html & return keyboardWrapper
  keyboardWrapper = addMainToDOM();

  // add keys in keyboardWrapper
  KEYBOARD.addKeysToDOM(keyboardWrapper);

  // add handler for mouse
  addMouseHandler();

  // add handler for keyboard (physical)
  addKeyboardHandler();
};
