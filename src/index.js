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
// -----------------------------------------------------------------------------
// start on load of page
window.onload = function () {
  //console.log('go!');

  // prepare main html & return keyboard
  const keyboardWrapper = addMainToDOM();

  // add keys in keyboard
  addKeysToDOM(KEYBOARD.keysArray, keyboardWrapper);

  // add handler for keyboard (physical)
  addKeyboardHandler();
};
// -----------------------------------------------------------------------------
// prepare main html & return keyboard
const addMainToDOM = () => {
  const main = document.createElement('main');
  main.classList.add('wrapper');

  const h1 = document.createElement('h1');
  h1.textContent = 'Virtual keyboard';
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
// add keys in keyboard
const addKeysToDOM = (keysArray, keyboardWrapper) => {
  for (let row = 0; row < keysArray.length; row++) {
    let keyboardRow = document.createElement('div');
    keyboardRow.classList.add('keyboard_row');

    let arr = keysArray[row];
    for (let col = 0; col < arr.length; col++) {
      let newKey = arr[col].createKeyToDOM();

      // on mouse click handler
      //   newKey.addEventListener('click', onKeyClick);
      newKey.addEventListener('mousedown', onMouseDown);
      newKey.addEventListener('mouseup', onMouseUp);

      keyboardRow.append(newKey);
    }

    keyboardWrapper.append(keyboardRow);
  }
};
// -----------------------------------------------------------------------------
// add handler for keyboard (physical)
const addKeyboardHandler = () => {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
};
const onKeyClick = (event) => {
  console.log(event.currentTarget);
};
const onMouseDown = (event) => {
  console.log(event.currentTarget);
};
const onMouseUp = (event) => {
  console.log(event.currentTarget);
};
const onKeyDown = (event) => {
  console.log(event.key);
  console.log(event.code);
};
const onKeyUp = (event) => {
  console.log(event.key);
  console.log(event.code);
};
