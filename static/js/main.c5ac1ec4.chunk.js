(this["webpackJsonpreact-deploy"]=this["webpackJsonpreact-deploy"]||[]).push([[0],{12:function(t,e,n){},13:function(t,e,n){},14:function(t,e,n){"use strict";n.r(e);var c=n(0),r=n(1),a=n.n(r),o=n(5),i=n.n(o),u=n(3),l=n(2),s=n(6);function d(t){var e=t.position,n=e.x,r=e.y;if(void 0===r)return null;var a=Object(u.a)(Object(u.a)({},"undefined"!==n?{left:"".concat(Math.round(n),"px")}:{}),{},{top:"".concat(Math.round(r),"px")});return Object(c.jsx)("div",{className:"marker",style:a})}var j=function(t,e){var n=t.getBoundingClientRect();return{x:e.clientX-n.left,y:e.clientY-n.top}},f=function(t,e){var n=e.x,c=e.y;return t.getContext("2d").getImageData(n,c,1,1).data.slice(0,3).reduce((function(t,e){return t+e.toString(16).padStart(2,"0")}),"#")},h=function(t,e){var n=e.width,c=e.height;t.canvas.width=n,t.canvas.height=c,t.clearRect(0,0,n,c)};function b(t){var e=t.hue,n=t.onColourUpdate,a=Object(r.useState)({width:0,height:0}),o=Object(l.a)(a,2),i=o[0],u=o[1],s=Object(r.useState)({x:0,y:0}),b=Object(l.a)(s,2),O=b[0],p=b[1],v=Object(r.useRef)(null);return Object(r.useLayoutEffect)((function(){return v.current&&u({width:v.current.offsetWidth,height:v.current.offsetHeight})}),[]),Object(r.useEffect)((function(){if(v.current){var t=v.current;if(function(t,e,n){var c=n.width,r=n.height;h(t,{width:c,height:r});var a=t.createLinearGradient(0,0,c,0),o=t.createLinearGradient(0,0,0,r);a.addColorStop(0,"hsla(".concat(e,",100%,50%,0)")),a.addColorStop(1,"hsla(".concat(e,",100%,50%,1)")),o.addColorStop(0,"white"),o.addColorStop(1,"black"),t.fillStyle=a,t.fillRect(0,0,c,r),t.globalCompositeOperation="multiply",t.fillStyle=o,t.fillRect(0,0,c,r),t.globalCompositeOperation="source-over"}(t.getContext("2d"),e,i),0!==e){var c=f(t,O);n(c)}}}),[e,i,n,O]),Object(c.jsxs)("div",{className:"palette",children:[Object(c.jsx)("canvas",{ref:v,onClickCapture:function(t){var e=v.current,c=j(e,t);p(c),n(f(e,c))}}),Object(c.jsx)(d,{position:O})]})}function O(t){var e=t.onHueUpdate,n=Object(r.useState)({width:0,height:0}),a=Object(l.a)(n,2),o=a[0],i=a[1],u=Object(r.useState)({y:0}),s=Object(l.a)(u,2),f=s[0],b=s[1],O=Object(r.useRef)(null);return Object(r.useLayoutEffect)((function(){return O.current&&i({width:O.current.offsetWidth,height:O.current.offsetHeight})}),[]),Object(r.useEffect)((function(){return O.current&&function(t,e){var n=e.width,c=e.height;h(t,{width:n,height:c});for(var r=t.createLinearGradient(0,0,0,c),a=0;a<=360;a++)r.addColorStop(1-a/360,"hsla(".concat(a,",100%,50%,1)"));t.fillStyle=r,t.fillRect(0,0,n,c)}(O.current.getContext("2d"),o)}),[o]),Object(c.jsxs)("div",{className:"hueScale",children:[Object(c.jsx)("canvas",{ref:O,onClickCapture:function(t){var n=j(O.current,t).y,c=Math.round(360*(1-n/o.height));b({y:n}),e(c)}}),Object(c.jsx)(d,{position:f})]})}function p(t){var e=t.colour;return Object(c.jsxs)("div",{className:"colourSwatch",children:[Object(c.jsx)("div",{style:{background:e}}),Object(c.jsx)("input",{value:e,readOnly:!0,disabled:!0})]})}n(12);function v(t){var e=t.onColourUpdate,n=void 0===e?function(){}:e,a=Object(s.a)(t,["onColourUpdate"]),o=Object(r.useState)(""),i=Object(l.a)(o,2),d=i[0],j=i[1],f=Object(r.useState)(0),h=Object(l.a)(f,2),v=h[0],g=h[1];return Object(c.jsxs)("div",Object(u.a)(Object(u.a)({},a),{},{children:[Object(c.jsx)(b,{onColourUpdate:function(t){n(t),j(t)},hue:v}),Object(c.jsx)(O,{onHueUpdate:function(t){return g(t)}}),Object(c.jsx)(p,{colour:d})]}))}n(13);function g(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)("h1",{children:"Basic Colour Picker Demo"}),Object(c.jsx)(v,{className:"colourPicker"})]})}var x=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,15)).then((function(e){var n=e.getCLS,c=e.getFID,r=e.getFCP,a=e.getLCP,o=e.getTTFB;n(t),c(t),r(t),a(t),o(t)}))};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(g,{})}),document.getElementById("root")),x()}},[[14,1,2]]]);
//# sourceMappingURL=main.c5ac1ec4.chunk.js.map