'use strict';
window.onload = function () {
  // main

  // Test via a getter in the options object to see if the passive property is accessed
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {}

  function objToStyleStr(obj) {
    const tmp = []
    for (var k in obj) {
      if ( ! obj.hasOwnProperty(k)) {
        continue
      }
      tmp.push(k + ':' + obj[k])
    }
    return tmp.join(';')
  }

  const box = document.getElementById('box')

  function mkHandler(evMsg) {
    const style = objToStyleStr(
      { background: 'rgba(187,187,187,0.3)'
      , width:      '384px'
      , height:     '384px'
      , position:   'absolute'
      , left:       '0px'
      , top:        '0px'
      } )

    return function () {
      console.log(evMsg)
      const overwrapElem = document.createElement('div')
      overwrapElem.setAttribute('style', style)
      overwrapElem.addEventListener('touchend'
        , function () {
          console.log('overwrap: touchend')
          box.removeChild(overwrapElem)
        }, supportsPassive ? { passive: true } : false)
      overwrapElem.addEventListener('click'
        , function () {
          console.log('overwrap: click')
          box.removeChild(overwrapElem)
        }, supportsPassive ? { passive: true } : false)
      box.appendChild(overwrapElem)
    }
  }

  const captarea = document.getElementById('captarea')

  captarea.addEventListener('touchend', mkHandler('captarea: touchend')
    , supportsPassive ? { passive: true } : false)
  captarea.addEventListener('click', mkHandler('captarea: click')
    , supportsPassive ? { passive: true } : false)
}
