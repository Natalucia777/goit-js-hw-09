var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var r={id:e,exports:{}};return t[e]=r,o.call(r.exports,r,r.exports),r.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o),o("7Y9D8");var r=o("iQIUW");const i=document.querySelector(".form");let u=document.querySelector('input[name="delay"]'),l=document.querySelector('input[name="step"]'),a=document.querySelector('input[name="amount"]');function d(e,t){const n=Math.random()>.3;return new Promise(((o,r)=>{setTimeout((()=>{n?o({position:e,delay:t}):r({position:e,delay:t})}),t)}))}i.addEventListener("submit",(function(e){e.preventDefault();let t=Number(u.value);for(let e=1;e<=Number(a.value);e+=1)d(e,t).then((({position:e,delay:t})=>{r.Notify.success(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{r.Notify.failure(`❌ Rejected promise ${e} in ${t}ms`)})),t+=Number(l.value);e.currentTarget.reset()}));
//# sourceMappingURL=03-promises.1841ffd7.js.map