(()=>{"use strict";(()=>{class t{constructor(t){this.type=t.type,this.id=t.id,this.size=t.size;let{label:e}=t;Array.isArray(e)?(this.EN={low:e[0],up:e[1]},this.RU={low:e[2],up:e[3]}):(e=`${e}`,this.EN={low:e,up:e},this.RU={low:e,up:e}),this.keyDOM=null}createKeyToDOM(t,e){const i=document.createElement("div");i.classList.add("key_wrapper"),i.classList.add(`-${this.type}`),i.classList.add(`-${this.size}`),i.setAttribute("data-id",this.id),i.setAttribute("data-type",this.type);const l=this[t][e];i.setAttribute("data-currentKey",l);const a=document.createElement("div");return a.classList.add("key"),a.classList.add(`key_${this.type}`),a.textContent=l,i.append(a),this.keyDOM=i,i}}class e{constructor(t){this.keysArray=e.generateKeysArray(t),this.langArray=["EN","RU"],[this.lang]=this.langArray,this.getLangFromLocalStorage(),this.capsLockOn=!1,this.ShiftLeftOn=!1,this.ShiftRightOn=!1,this.ControlLeftOn=!1,this.ControlRightOn=!1,this.AltLeftOn=!1,this.AltRightOn=!1,this.userOS=`${navigator.platform}`.substring(0,3)}static generateKeysArray(e){const i=[];for(let l=0;l<e.length;l+=1){const a=e[l],n=[];for(let e=0;e<a.length;e+=1)n.push(new t(a[e]));i.push(n)}return i}addKeysToDOM(t){for(let e=0;e<this.keysArray.length;e+=1){const i=document.createElement("div");i.classList.add("keyboard_row");const l=this.keysArray[e];for(let t=0;t<l.length;t+=1){const a=l[t].createKeyToDOM(this.lang,this.caseStatus(e));i.append(a)}t.append(i)}}updateKeysInDOM(){let t=null;for(let e=0;e<this.keysArray.length;e+=1){const i=this.keysArray[e];for(let l=0;l<i.length;l+=1)t=i[l].keyDOM,t.firstChild.textContent=i[l][this.lang][this.caseStatus(e)]}}caseStatus(t){let e="";return e=0===t?this.ShiftLeftOn||this.ShiftRightOn?"up":"low":this.capsLockOn===(this.ShiftLeftOn||this.ShiftRightOn)?"low":"up",e}findKeyOnCode(t){let e=null;for(let i=0;i<this.keysArray.length;i+=1){const l=this.keysArray[i];for(let i=0;i<l.length;i+=1)if(l[i].id===t){e=l[i];break}}return e}getLangFromLocalStorage(){localStorage.getItem("virtual-keyboard.lang")?this.lang=localStorage.getItem("virtual-keyboard.lang"):localStorage.setItem("virtual-keyboard.lang",this.lang)}switchLanguage(){this.lang=this.langArray[(this.langArray.indexOf(this.lang)+1)%this.langArray.length],localStorage.setItem("virtual-keyboard.lang",this.lang)}switchKey(t,e){"CapsLock"===t&&(this.capsLockOn=!this.capsLockOn),"ShiftLeft"===t&&(this.ShiftLeftOn=!this.ShiftLeftOn),"ShiftRight"===t&&(this.ShiftRightOn=!this.ShiftRightOn),"ControlLeft"===t&&(this.ControlLeftOn=!this.ControlLeftOn),"ControlRight"===t&&(this.ControlRightOn=!this.ControlRightOn),"AltLeft"===t&&(this.AltLeftOn=!this.AltLeftOn),"AltRight"===t&&(this.AltRightOn=!this.AltRightOn),e.keyDOM.firstChild.classList.toggle("-active")}clearKeyDown(t){this[`${t}LeftOn`]=!1,this[`${t}RightOn`]=!1;let e=this.findKeyOnCode(`${t}Left`).keyDOM.firstChild;e.classList.remove("-active"),e=this.findKeyOnCode(`${t}Right`).keyDOM.firstChild,e.classList.remove("-active")}hotKeyPressed(t){return this.ShiftLeftOn&&!("ShiftLeft"===t)||this.ShiftRightOn&&!("ShiftRight"===t)||this.ControlLeftOn&&!("ControlLeft"===t)||this.ControlRightOn&&!("ControlRight"===t)||this.AltLeftOn&&!("AltLeft"===t)||this.AltRightOn&&!("AltRight"===t)}getHotKey(t){return this.ShiftLeftOn?`ShiftLeft + ${t}`:this.ShiftRightOn?`ShiftRight + ${t}`:this.ControlLeftOn?`ControlLef + ${t}`:this.ControlRightOn?`ControlRight + ${t}`:this.AltLeftOn?`AltLeft + ${t}`:this.AltRightOn?`AltRight + ${t}`:"none"}}const i=new e([[{type:"abc",id:"Backquote",size:"mini",label:["`","~","ё","Ё"]},{type:"abc",id:"Digit1",size:"mini",label:["1","!","1","!"]},{type:"abc",id:"Digit2",size:"mini",label:["2","@","2",'"']},{type:"abc",id:"Digit3",size:"mini",label:["3","#","3","№"]},{type:"abc",id:"Digit4",size:"mini",label:["4","$","4",";"]},{type:"abc",id:"Digit5",size:"mini",label:["5","%","5","%"]},{type:"abc",id:"Digit6",size:"mini",label:["6","^","6","?"]},{type:"abc",id:"Digit7",size:"mini",label:["7","&","7","?"]},{type:"abc",id:"Digit8",size:"mini",label:["8","*","8","*"]},{type:"abc",id:"Digit9",size:"mini",label:["9","(","9","("]},{type:"abc",id:"Digit0",size:"mini",label:["0",")","0",")"]},{type:"abc",id:"Minus",size:"mini",label:["-","_","-","_"]},{type:"abc",id:"Equal",size:"mini",label:["=","+","=","+"]},{type:"ctrl",id:"Backspace",size:"large",label:"Backspace"}],[{type:"ctrl",id:"Tab",size:"midi",label:"Tab"},{type:"abc",id:"KeyQ",size:"mini",label:["q","Q","й","Й"]},{type:"abc",id:"KeyW",size:"mini",label:["w","W","ц","Ц"]},{type:"abc",id:"KeyE",size:"mini",label:["e","E","у","У"]},{type:"abc",id:"KeyR",size:"mini",label:["r","R","к","К"]},{type:"abc",id:"KeyT",size:"mini",label:["t","T","е","Е"]},{type:"abc",id:"KeyY",size:"mini",label:["y","Y","н","Н"]},{type:"abc",id:"KeyU",size:"mini",label:["u","U","г","Г"]},{type:"abc",id:"KeyI",size:"mini",label:["i","I","ш","Ш"]},{type:"abc",id:"KeyO",size:"mini",label:["o","O","щ","Щ"]},{type:"abc",id:"KeyP",size:"mini",label:["p","P","з","З"]},{type:"abc",id:"BracketLeft",size:"mini",label:["[","{","х","Х"]},{type:"abc",id:"BracketRight",size:"mini",label:["]","}","ъ","Ъ"]},{type:"ctrl",id:"Delete",size:"midi",label:"Delete"}],[{type:"ctrl",id:"CapsLock",size:"large",label:"CapsLock"},{type:"abc",id:"KeyA",size:"mini",label:["a","A","ф","Ф"]},{type:"abc",id:"KeyS",size:"mini",label:["s","S","ы","Ы"]},{type:"abc",id:"KeyD",size:"mini",label:["d","D","в","В"]},{type:"abc",id:"KeyF",size:"mini",label:["f","F","а","А"]},{type:"abc",id:"KeyG",size:"mini",label:["g","G","п","П"]},{type:"abc",id:"KeyH",size:"mini",label:["h","H","р","Р"]},{type:"abc",id:"KeyJ",size:"mini",label:["j","J","о","О"]},{type:"abc",id:"KeyK",size:"mini",label:["k","K","л","Л"]},{type:"abc",id:"KeyL",size:"mini",label:["l","L","д","Д"]},{type:"abc",id:"Semicolon",size:"mini",label:[";",":","ж","Ж"]},{type:"abc",id:"Quote",size:"mini",label:["'",'"',"э","Э"]},{type:"ctrl",id:"Enter",size:"large",label:"Enter"}],[{type:"ctrl",id:"ShiftLeft",size:"midi",label:"Shift"},{type:"abc",id:"Backslash",size:"mini",label:["\\","|","\\","/"]},{type:"abc",id:"KeyZ",size:"mini",label:["z","Z","я","Я"]},{type:"abc",id:"KeyX",size:"mini",label:["x","X","ч","Ч"]},{type:"abc",id:"KeyC",size:"mini",label:["c","C","с","С"]},{type:"abc",id:"KeyV",size:"mini",label:["v","V","м","М"]},{type:"abc",id:"KeyB",size:"mini",label:["b","B","и","И"]},{type:"abc",id:"KeyN",size:"mini",label:["n","N","т","Т"]},{type:"abc",id:"KeyM",size:"mini",label:["m","M","ь","Ь"]},{type:"abc",id:"Comma",size:"mini",label:[",",",","б","Б"]},{type:"abc",id:"Period",size:"mini",label:[".",".","ю","Ю"]},{type:"abc",id:"Slash",size:"mini",label:["/","?",".",","]},{type:"arrow",id:"ArrowUp",size:"mini",label:"↑"},{type:"ctrl",id:"ShiftRight",size:"midi",label:"Shift"}],[{type:"ctrl",id:"ControlLeft",size:"mini",label:"Ctrl"},{type:"ctrl",id:"Lang",size:"mini",label:["EN","EN","RU","RU"]},{type:"ctrl",id:"AltLeft",size:"mini",label:"Alt"},{type:"abc",id:"Space",size:"space",label:" "},{type:"ctrl",id:"AltRight",size:"mini",label:"Alt"},{type:"ctrl",id:"ControlRight",size:"mini",label:"Ctrl"},{type:"arrow",id:"ArrowLeft",size:"mini",label:"←"},{type:"arrow",id:"ArrowDown",size:"mini",label:"↓"},{type:"arrow",id:"ArrowRight",size:"mini",label:"→"}]]);let l=null,a=null,n=null;const s=t=>{a.focus();let e="";const l=i.findKeyOnCode(t);if(l){let n=a.selectionStart,s=a.selectionEnd;const r=a.value.substring(0,n),o=a.value.substring(s);i.hotKeyPressed(t)?"abc"===l.type&&(i.ShiftLeftOn||i.ShiftRightOn)?e=l.keyDOM.firstChild.textContent:(i.ShiftLeftOn||i.ShiftRightOn)&&("ControlLeft"===t||"ControlRight"===t)||(i.ControlLeftOn||i.ControlRightOn)&&("ShiftLeft"===t||"ShiftRight"===t)?(i.switchLanguage(),i.updateKeysInDOM()):e=`<${i.getHotKey(t)}>`:"Lang"===t?(i.switchLanguage(),i.updateKeysInDOM()):"CapsLock"===t||"ShiftLeft"===t||"ShiftRight"===t?(i.switchKey(t,l),i.updateKeysInDOM()):"ControlLeft"===t||"ControlRight"===t||"AltLeft"===t||"AltRight"===t?i.switchKey(t,l):"abc"===l.type?e=l.keyDOM.firstChild.textContent:"Enter"===t?e="\n":"Tab"===t?e="\t":"Backspace"===t?e="Backspace":"Delete"===t?e="Delete":"ArrowLeft"===t?e="←":"ArrowRight"===t?e="→":"ArrowUp"===t?e="↑":"ArrowDown"===t&&(e="↓"),e&&("Backspace"===e?n===s?(a.value=r.slice(0,-1)+o,n=0===n?0:n-1,s=n):(a.value=r+o,s=n):"Delete"===e?n===s?a.value=r+o.slice(1):(a.value=r+o,s=n):"←"===e?(n=0===n?0:n-1,s=n):"<ShiftLeft + ArrowLeft>"===e||"<ShiftRight + ArrowLeft>"===e?(n=0===n?0:n-1,a.selectionDirection="backward"):"→"===e?(n=n===a.value.length-1?a.value.length:n+1,s=n):"<ShiftLeft + ArrowRight>"===e||"<ShiftRight + ArrowRight>"===e?(s=s===a.value.length-1?a.value.length:s+1,a.selectionDirection="forward"):(a.value=r+e+o,n=n===a.value.length-1?a.value.length:n+e.length,s=n),a.selectionStart=n,a.selectionEnd=s)}},r=t=>{if(t){const e=t.firstChild;e&&e.classList.add("-pressed")}},o=t=>{if(t){const e=t.firstChild;e&&e.classList.remove("-pressed")}},h=t=>{const e=t.target.closest(".key_wrapper");e&&(r(e),n=e)},c=t=>{if(n){const e=t.target.closest(".key_wrapper");if(e){const l=e.getAttribute("data-id");l===n.getAttribute("data-id")?(t.preventDefault(),s(l),(i.ShiftLeftOn||i.ShiftRightOn)&&"ShiftLeft"!==l&&"ShiftRight"!==l&&(i.clearKeyDown("Shift"),i.updateKeysInDOM()),(i.ControlLeftOn||i.ControlRightOn)&&"ControlLeft"!==l&&"ControlRight"!==l&&i.clearKeyDown("Control"),(i.AltLeftOn||i.AltRightOn)&&"AltLeft"!==l&&"AltRight"!==l&&i.clearKeyDown("Alt"),o(e)):o(n)}else o(n);n=null}},d=t=>{const{code:e}=t,l=document.querySelector(`.key_wrapper[data-id='${e}']`);t.preventDefault(),("ShiftLeft"!==e&&"ShiftRight"!==e||!i.ShiftLeftOn&&!i.ShiftRightOn)&&s(e),l&&r(l),"CapsLock"===e&&"Mac"===i.userOS&&window.setTimeout((()=>l.firstChild.classList.remove("-pressed")),300)},y=t=>{const{code:e}=t,l=document.querySelector(`.key_wrapper[data-id='${e}']`);l&&o(l),"ShiftLeft"!==e&&"ShiftRight"!==e||(i.clearKeyDown("Shift"),i.updateKeysInDOM()),"ControlLeft"!==e&&"ControlRight"!==e||i.clearKeyDown("Control"),"AltLeft"!==e&&"AltRight"!==e||i.clearKeyDown("Alt")};window.onload=()=>{(()=>{const t=document.createElement("main");t.classList.add("wrapper");const e=document.createElement("h1");e.textContent="Virtual keyboard (Windows)",t.append(e),a=document.createElement("textarea"),a.rows=6,t.append(a),l=document.createElement("div"),l.classList.add("keyboard_wrapper"),t.append(l);const i=document.createElement("p");i.textContent="Change language <Shift + Control>",t.append(i),document.body.append(t)})(),i.addKeysToDOM(l),document.addEventListener("mousedown",h),document.addEventListener("mouseup",c),document.addEventListener("keydown",d),document.addEventListener("keyup",y)}})()})();