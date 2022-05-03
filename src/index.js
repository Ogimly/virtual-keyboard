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
// inputText - DOM element for textarea
let inputText = null;
// KeyPressed - what key was pressed in keyboard with mouse
let KeyPressed = null;
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

  keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard_wrapper');
  main.append(keyboardWrapper);

  document.body.append(main);
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
    // input handler
    inputText.focus();

    let text = '';

    const keyObject = KEYBOARD.findKeyOnCode(code);
    if (keyObject.type === 'abc') {
      text = keyObject.keyDOM.firstChild.textContent;

      const textBeforeCursor = inputText.value.substring(0, inputText.selectionStart);
      const textAfterCursor = inputText.value.substring(inputText.selectionEnd);

      inputText.value = textBeforeCursor + text + textAfterCursor;
    }

    // keyboard update property & render in DOM
    KEYBOARD.update(code);

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
    event.preventDefault();
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
        event.preventDefault();
        onKeyUp(keyUp, code, event);
      } else KeyPressed.firstChild.classList.remove('-pressed'); // up key pressed
      // up key pressed
    } else KeyPressed.firstChild.classList.remove('-pressed');

    KeyPressed = null;
  }
};
const onKeyboardDown = (event) => {
  const { code } = event;
  const keyDown = document.querySelector(`.key_wrapper[data-id='${code}']`);

  event.preventDefault();
  if (keyDown) onKeyDown(keyDown);
};
const onKeyboardUp = (event) => {
  const { code } = event;
  const keyUp = document.querySelector(`.key_wrapper[data-id='${code}']`);

  event.preventDefault();
  if (keyUp) onKeyUp(keyUp, code, event);
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
