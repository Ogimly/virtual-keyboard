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
// handler for key press (main handler)
const keyPressHandler = (code) => {
  inputText.focus();

  let text = '';

  const keyObject = KEYBOARD.findKeyOnCode(code);

  let cursorStart = inputText.selectionStart;
  let cursorEnd = inputText.selectionEnd;
  const textBeforeCursor = inputText.value.substring(0, cursorStart);
  const textAfterCursor = inputText.value.substring(cursorEnd);

  if (keyObject.type === 'abc') {
    text = keyObject.keyDOM.firstChild.textContent;
  } else if (code === 'Enter') {
    text = '\n';
  } else if (code === 'Tab') {
    text = '\t';
  } else if (code === 'Backspace') {
    text = '\b';
  } else if (code === 'Delete') {
    text = 'del';
  }

  if (text) {
    if (text === '\b') {
      // Backspace
      if (cursorStart === cursorEnd) {
        // no selection
        inputText.value = textBeforeCursor.slice(0, -1) + textAfterCursor;
        cursorStart = cursorStart === 0 ? 0 : cursorStart - 1;
        cursorEnd = cursorStart;
      } else {
        inputText.value = textBeforeCursor + textAfterCursor;
        cursorEnd = cursorStart;
      }
    } else if (text === 'del') {
      // Delete
      if (cursorStart === cursorEnd) {
        // no selection
        inputText.value = textBeforeCursor + textAfterCursor.slice(1);
      } else {
        inputText.value = textBeforeCursor + textAfterCursor;
        cursorEnd = cursorStart;
      }
    } else {
      inputText.value = textBeforeCursor + text + textAfterCursor;
      cursorStart = inputText.value.length;
      cursorEnd = cursorStart;
    }

    inputText.selectionStart = cursorStart;
    inputText.selectionEnd = cursorEnd;
  }

  // keyboard update property & render in DOM
  KEYBOARD.update(code);
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

        removePressed(keyUp);
      } else removePressed(KeyPressed); // KeyPressed.firstChild.classList.remove('-pressed'); // up key pressed
      // up key pressed
    } else removePressed(KeyPressed); // KeyPressed.firstChild.classList.remove('-pressed');

    KeyPressed = null;
  }
};
const onKeyboardDown = (event) => {
  const { code } = event;
  const keyDown = document.querySelector(`.key_wrapper[data-id='${code}']`);

  event.preventDefault();

  // main handler
  keyPressHandler(code);

  if (keyDown) addPressed(keyDown);
};
const onKeyboardUp = (event) => {
  const { code } = event;
  const keyUp = document.querySelector(`.key_wrapper[data-id='${code}']`);

  if (keyUp) removePressed(keyUp);
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
