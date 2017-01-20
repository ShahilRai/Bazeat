import React from 'react';
import ReactDOM from 'react-dom';
import ReactStormpath from 'react-stormpath';
import { ProjectRouter } from './pages';

ReactStormpath.init();

var _arr  = {};
function loadScript(scriptName, callback) {
  if (!_arr[scriptName]) {
    _arr[scriptName] = true;

    var body   = document.getElementsByTagName('body')[0];
    var script   = document.createElement('script');
    script.type  = 'text/javascript';
    script.src   = scriptName;
    script.onload = callback;
    // fire the loading
    body.appendChild(script);
  } else if (callback) {
    callback();
  }
}

ReactDOM.render(
  <div>
    <ProjectRouter />
  </div>,
  document.getElementById('app-container')
);
