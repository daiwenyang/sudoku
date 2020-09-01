import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
(function () {
  var dpr = window.devicePixelRatio;
  var meta = document.createElement('meta');
  var scale = 1 / dpr;
  meta.setAttribute('name', 'viewport');
  meta.setAttribute('content', 'width=device-width, user-scalable=no, initial-scale=' + scale +
    ', maximum-scale=' + scale + ', minimum-scale=' + scale);
  document.getElementsByTagName('head')[0].appendChild(meta);
  // 动态设置的缩放大小会影响布局视口的尺寸
  function resize() {
    var deviceWidth  = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = (deviceWidth / 10) +'px';
  }
  resize();
  window.onresize = resize;
})()
