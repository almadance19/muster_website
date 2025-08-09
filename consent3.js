const storageItem = 'mapsConsent';
const cookieItem = 'CookiesPolicy';


const style = document.createElement('style');
style.textContent = `#cookies-popup {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  color: #333;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.15);
  padding: 8px 12px;
  max-width: 400px;
  width: 95%;
  font-family: sans-serif;
  z-index: 9999;
  animation: fadeIn 0.3s ease-in-out;
}

.consent-container p {
  margin: 0 0 4px 0;
  font-size: 12px;
  line-height: 1.25;
}

.consent-container a {
  color: #0030c0;
  text-decoration: underline;
}

.consent-row {
  display: flex;
  justify-content: space-between;
  gap: 6px;
}

.consent-col {
  flex: 1;
  text-align: center;
}

.consent-btn {
  padding: 6px 8px;
  border: none;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
}

.consent-btn-accept {
  background-color: #0030c0;
  color: #fff;
}

.consent-btn-accept:hover {
  background-color: #0020a0;
}

.consent-btn-essential {
  background-color: #555;
  color: #fff;
}

.consent-btn-essential:hover {
  background-color: #333;
}

.consent-info {
  font-size: 10px;
  color: #777;
  margin-top: 2px;
}

@keyframes fadeIn {
  from {opacity: 0; transform: translate(-50%, 10px);}
  to {opacity: 1; transform: translate(-50%, 0);}
}

@media (max-width: 480px) {
  #cookies-popup {
    padding: 6px 8px;
  }
  .consent-btn {
    font-size: 10px;
    padding: 5px 6px;
  }
}
`;

document.head.appendChild(style);

// Read consent from cookies
let consent_type = getCookie(cookieItem);
let consent = getCookie(storageItem);

if (consent === 'true') {
  if (consent_type === "ALL") {
    loadScript('FacebookPixel.js');
    console.log("ALL CONSENT GIVEN");
  } else if (consent_type === "ONLY") {
    console.log("CONSENT GIVEN");
  } else if (consent_type === "NOT") {
    console.log("NO CONSENT GIVEN");
    $(".popup-youtube").removeAttr("data-target data-url data-toggle");
  }
} else {
  showConsentPopup();
}

function showConsentPopup() {
  const popupHTML = `
  <div id="cookies-popup">
    <div class="consent-container">
      <p>
        Wir nutzen Cookies für Funktionen & Analyse. 
        <a href="https://alma-dance.de/privacy-policy" target="_blank">Details</a>
      </p>
      <div class="consent-row">
        <div class="consent-col">
          <button class="consent-btn consent-btn-accept" onclick="acceptAllCookies()">Alle akzeptieren</button>
        </div>
        <div class="consent-col">
          <button class="consent-btn consent-btn-essential" onclick="acceptEssentialCookies()">Nur nötig</button>
        </div>
      </div>
    </div>
  </div>`;
  
  document.getElementById("consent_data").innerHTML = popupHTML;
}

function saveConsent(policy) {
  localStorage.setItem(storageItem, true);
  localStorage.setItem("CookiesPolicy", policy);
  setCookie("mapsConsent", "true", 30);
  setCookie("CookiesPolicy", policy, 30);
}

function acceptAllCookies() {
  console.log("ALL CONSENT GIVEN");
  saveConsent("ALL");
  loadScript("FacebookPixel.js");
  loadScript("googleTag.js");
  removeConsentPopup();
}

function acceptEssentialCookies() {
  console.log("CONSENT GIVEN");
  saveConsent("ONLY");
  removeConsentPopup();
}

function denyAllCookies() {
  console.log("NO CONSENT GIVEN");
  $(".popup-youtube").removeAttr("data-target data-url data-toggle");
  saveConsent("NOT");
  removeConsentPopup();
}

function removeConsentPopup() {
  const popup = document.getElementById("cookies-popup");
  if (popup) popup.remove();
}

function loadScript(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  document.head.appendChild(script);
}

// Cookie helpers
function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${cName}=${cValue}; samesite=strict; ${expires}; path=/`;
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}