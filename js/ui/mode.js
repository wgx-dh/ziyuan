const rootElement=document.documentElement,darkModeStorageKey="user-color-scheme",darkModeMediaQueryKey="--hty-mode",rootElementDarkModeAttributeName="data-user-color-scheme",setLS=(e,t)=>{try{localStorage.setItem(e,t)}catch(e){console.log(e.message)}},removeLS=e=>{try{localStorage.removeItem(e)}catch(e){console.log(e.message)}},getLS=e=>{try{return localStorage.getItem(e)}catch(e){return console.log(e.message),null}},getModeFromCSSMediaQuery=()=>window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light",resetRootDarkModeAttributeAndLS=()=>{rootElement.removeAttribute("data-user-color-scheme"),removeLS(darkModeStorageKey)},validColorModeKeys={dark:!0,light:!0},applyCustomDarkModeSettings=e=>{const t=e||getLS(darkModeStorageKey);t===getModeFromCSSMediaQuery()?resetRootDarkModeAttributeAndLS():validColorModeKeys[t]?rootElement.setAttribute("data-user-color-scheme",t):resetRootDarkModeAttributeAndLS()},invertDarkModeObj={dark:"light",light:"dark"},toggleCustomDarkMode=()=>{let e=getLS(darkModeStorageKey);if(validColorModeKeys[e])e=invertDarkModeObj[e];else{if(null!==e)return;e=invertDarkModeObj[getModeFromCSSMediaQuery()]}return setLS(darkModeStorageKey,e),e};function bindToggleButton(){window["toggle-mode-btn"]&&window["toggle-mode-btn"].addEventListener("click",()=>{const e=toggleCustomDarkMode();applyCustomDarkModeSettings(e),toggleCodeblockCss(e)})}function toggleCodeblockCss(e){const t=invertDarkModeObj[e],o=document.getElementById(`${t}-prism-css`);o&&(o.setAttribute("media","(prefers-color-scheme: no-preference)"),document.getElementById(`${e}-prism-css`).removeAttribute("media"))}applyCustomDarkModeSettings();const mode=getLS(darkModeStorageKey);if(toggleCodeblockCss(mode),document.addEventListener("DOMContentLoaded",bindToggleButton),document.addEventListener("pjax:success",bindToggleButton),"time"===CONFIG.mode){const e=(new Date).getHours();if(e<7&&e>=19){setTimeout(()=>{toggleCodeblockCss("dark")},200);const e=toggleCustomDarkMode();"dark"===e&&(applyCustomDarkModeSettings(e),toggleCodeblockCss(e))}}