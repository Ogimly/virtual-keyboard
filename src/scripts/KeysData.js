// -----------------------------------------------------------------------------
// KEYS_DATA - array of abc & key properties
// -----------------------------------------------------------------------------
// prettier-ignore
const KEYS_DATA = [
  [
    {type: 'abc',   id: 'Backquote',      size: 'mini',   label: ['`', '~', 'ё', 'Ё']},
    {type: 'abc',   id: 'Digit1',         size: 'mini',   label: ['1', '!', '1', '!']},
    {type: 'abc',   id: 'Digit2',         size: 'mini',   label: ['2', '@', '2', '"']},
    {type: 'abc',   id: 'Digit3',         size: 'mini',   label: ['3', '#', '3', '№']},
    {type: 'abc',   id: 'Digit4',         size: 'mini',   label: ['4', '$', '4', ';']},
    {type: 'abc',   id: 'Digit5',         size: 'mini',   label: ['5', '%', '5', '%']},
    {type: 'abc',   id: 'Digit6',         size: 'mini',   label: ['6', '^', '6', '?']},
    {type: 'abc',   id: 'Digit7',         size: 'mini',   label: ['7', '&', '7', '?']},
    {type: 'abc',   id: 'Digit8',         size: 'mini',   label: ['8', '*', '8', '*']},
    {type: 'abc',   id: 'Digit9',         size: 'mini',   label: ['9', '(', '9', '(']},
    {type: 'abc',   id: 'Digit0',         size: 'mini',   label: ['0', ')', '0', ')']},
    {type: 'abc',   id: 'Minus',          size: 'mini',   label: ['-', '_', '-', '_']},
    {type: 'abc',   id: 'Equal',          size: 'mini',   label: ['=', '+', '=', '+']},
    {type: 'ctrl',  id: 'Backspace',      size: 'large',  label: 'Backspaсe'},
  ],
  [
    {type: 'ctrl',  id: 'Tab',            size: 'midi',   label: 'Tab'},
    {type: 'abc',   id: 'KeyQ',           size: 'mini',   label: ['q', 'Q', 'й', 'Й']},
    {type: 'abc',   id: 'KeyW',           size: 'mini',   label: ['w', 'W', 'ц', 'Ц']},
    {type: 'abc',   id: 'KeyE',           size: 'mini',   label: ['e', 'E', 'у', 'У']},
    {type: 'abc',   id: 'KeyR',           size: 'mini',   label: ['r', 'R', 'к', 'К']},
    {type: 'abc',   id: 'KeyT',           size: 'mini',   label: ['t', 'T', 'е', 'Е']},
    {type: 'abc',   id: 'KeyY',           size: 'mini',   label: ['y', 'Y', 'н', 'Н']},
    {type: 'abc',   id: 'KeyU',           size: 'mini',   label: ['u', 'U', 'г', 'Г']},
    {type: 'abc',   id: 'KeyI',           size: 'mini',   label: ['i', 'I', 'ш', 'Ш']},
    {type: 'abc',   id: 'KeyO',           size: 'mini',   label: ['o', 'O', 'щ', 'Щ']},
    {type: 'abc',   id: 'KeyP',           size: 'mini',   label: ['p', 'P', 'з', 'З']},
    {type: 'abc',   id: 'BracketLeft',    size: 'mini',   label: ['[', '{', 'х', 'Х']},
    {type: 'abc',   id: 'BracketRight',   size: 'mini',   label: [']', '}', 'ъ', 'Ъ']},
    {type: 'ctrl',  id: 'NumpadDecimal',  size: 'midi',   label: 'Delete'},
  ],
  [
    {type: 'ctrl',  id: 'CapsLock',       size: 'large',  label: 'CapsLock'},
    {type: 'abc',   id: 'KeyA',           size: 'mini',   label: ['a', 'A', 'ф', 'Ф']},
    {type: 'abc',   id: 'KeyS',           size: 'mini',   label: ['s', 'S', 'ы', 'Ы']},
    {type: 'abc',   id: 'KeyD',           size: 'mini',   label: ['d', 'D', 'в', 'В']},
    {type: 'abc',   id: 'KeyF',           size: 'mini',   label: ['f', 'F', 'а', 'А']},
    {type: 'abc',   id: 'KeyG',           size: 'mini',   label: ['g', 'G', 'п', 'П']},
    {type: 'abc',   id: 'KeyH',           size: 'mini',   label: ['h', 'H', 'р', 'Р']},
    {type: 'abc',   id: 'KeyJ',           size: 'mini',   label: ['j', 'J', 'о', 'О']},
    {type: 'abc',   id: 'KeyK',           size: 'mini',   label: ['k', 'K', 'л', 'Л']},
    {type: 'abc',   id: 'KeyL',           size: 'mini',   label: ['l', 'L', 'д', 'Д']},
    {type: 'abc',   id: 'Semicolon',      size: 'mini',   label: [';', ':', 'ж', 'Ж']},
    {type: 'abc',   id: 'Quote',          size: 'mini',   label: ["'", '"', 'э', 'Э']},
    {type: 'ctrl',  id: 'Enter',          size: 'large',  label: 'Enter'},
  ],
  [
    {type: 'ctrl',  id: 'ShiftLeft',      size: 'midi',   label: 'Shift'},
    {type: 'abc',   id: 'Backslash',      size: 'mini',   label: ['\\', '|', '\\', '/']},
    {type: 'abc',   id: 'KeyZ',           size: 'mini',   label: ['z', 'Z', 'я', 'Я']},
    {type: 'abc',   id: 'KeyX',           size: 'mini',   label: ['x', 'X', 'ч', 'Ч']},
    {type: 'abc',   id: 'KeyC',           size: 'mini',   label: ['c', 'C', 'с', 'С']},
    {type: 'abc',   id: 'KeyV',           size: 'mini',   label: ['v', 'V', 'м', 'М']},
    {type: 'abc',   id: 'KeyB',           size: 'mini',   label: ['b', 'B', 'и', 'И']},
    {type: 'abc',   id: 'KeyN',           size: 'mini',   label: ['n', 'N', 'т', 'Т']},
    {type: 'abc',   id: 'KeyM',           size: 'mini',   label: ['m', 'M', 'ь', 'Ь']},
    {type: 'abc',   id: 'Comma',          size: 'mini',   label: [',', ',', 'б', 'Б']},
    {type: 'abc',   id: 'Period',         size: 'mini',   label: ['.', '.', 'ю', 'Ю']},
    {type: 'abc',   id: 'Slash',          size: 'mini',   label: ['/', '?', '.', ',']},
    {type: 'arrow', id: 'ArrowUp',        size: 'mini',   label: '↑'},
    {type: 'ctrl',  id: 'ShiftRight',     size: 'midi',   label: 'Shift'},
  ],
  [
    {type: 'ctrl',  id: 'ControlLeft',    size: 'mini',   label: 'Ctrl'},
    {type: 'ctrl',  id: 'Lang',           size: 'mini',   label: ['EN', 'EN', 'RU', 'RU']},
    {type: 'ctrl',  id: 'AltLeft',        size: 'mini',   label: 'Alt'},
    {type: 'space', id: 'Space',          size: 'space',  label: ' '},
    {type: 'ctrl',  id: 'AltRight',       size: 'mini',   label: 'Alt'},
    {type: 'ctrl',  id: 'ControlRight',   size: 'mini',   label: 'Ctrl'},
    {type: 'arrow', id: 'ArrowLeft',      size: 'mini',   label: '←'},
    {type: 'arrow', id: 'ArrowDown',      size: 'mini',   label: '↓'},
    {type: 'arrow', id: 'ArrowRight',     size: 'mini',   label: '←'},
  ],
];

export default KEYS_DATA;
