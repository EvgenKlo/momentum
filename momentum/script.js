(()=>{"use strict";(()=>{const t=[{title:"Aqua Caelestis",src:"Aqua Caelestis.mp3",duration:"00:39"},{title:"Ennio Morricone",src:"Ennio Morricone.mp3",duration:"00:01:37"},{title:"River Flows In You",src:"River Flows In You.mp3",duration:"03:50"},{title:"Summer Wind",src:"Summer Wind.mp3",duration:"00:01:50"}],e=document.querySelector(".time"),n=document.querySelector(".date"),o=document.querySelector(".greeting");let a=o.textContent;const c=document.querySelector(".name"),i=document.querySelector("body"),r=document.querySelector(".slide-prev"),s=document.querySelector(".slide-next");let d="";function l(){i.style.backgroundImage="Good morning"===a?`url('https://github.com/EvgenKlo/stage1-tasks/blob/assets/images/morning/${d}.jpg?raw=true')`:"Good afternoon"===a?`url('https://github.com/EvgenKlo/stage1-tasks/blob/assets/images/afternoon/${d}.jpg?raw=true')`:"Good evening"===a?`url('https://github.com/EvgenKlo/stage1-tasks/blob/assets/images/evening/${d}.jpg?raw=true')`:`url('https://github.com/EvgenKlo/stage1-tasks/blob/assets/images/night/${d}.jpg?raw=true')`}!function t(){e.textContent="Text";const c=(new Date).toLocaleTimeString();e.textContent=c,function(){n.textContent="Date";const t=(new Date).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});n.textContent=t}(),function(){const t=["morning","afternoon","evening","night"];o.textContent="Text";const e=(new Date).getHours();o.textContent=e>=5&&e<12?`Good ${t[0]}`:e>=12&&e<16?`Good ${t[1]}`:e>=16&&e<23?`Good ${t[2]}`:`Good ${t[3]}`,a=o.textContent}(),setTimeout(t,1e3)}(),window.addEventListener("beforeunload",(function(){localStorage.setItem("name",c.value)})),window.addEventListener("load",(function(){localStorage.getItem("name")&&(c.value=localStorage.getItem("name"))})),function t(){var e,n;d="",e=1,n=20,e=Math.ceil(e),n=Math.floor(n),d=`${d}${Math.floor(Math.random()*(n-e+1))+e}`.padStart(2,"0"),l(),setTimeout(t,12e5)}(),r.addEventListener("click",(function(){d="01"===d?"20":(""+(d-1)).padStart(2,"0"),l(),L()})),s.addEventListener("click",(function(){d="20"===d?"01":(""+(1*d+1)).padStart(2,"0"),l(),L()}));const u=document.querySelector(".weather-icon"),m=document.querySelector(".temperature"),g=document.querySelector(".weather-description"),h=document.querySelector(".wind"),p=document.querySelector(".humidity"),y=document.querySelector(".weather-error"),v=document.querySelector(".city");async function f(){const t=`https://api.openweathermap.org/data/2.5/weather?q=${v.textContent}&lang=en&appid=5c42939a2a6f2da623f998d99a9d18c8&units=metric`,e=await fetch(t);if(404===e.status||400===e.status)y.textContent=`Error! city not found for ${v.textContent}`,u.classList.remove(u.classList[2]),m.textContent="",g.textContent="",h.textContent="",p.textContent="";else{const t=await e.json();y.textContent="",u.className="weather-icon owf",u.classList.add(`owf-${t.weather[0].id}`),m.textContent=`${t.main.temp.toFixed(0)}°C`,g.textContent=t.weather[0].description,h.textContent=`Wind speed: ${t.wind.speed.toFixed(0)} m/s`,p.textContent=`Humidity: ${t.main.humidity}%`}}document.addEventListener("DOMContentLoaded",f),v.addEventListener("keypress",(function(t){"Enter"!==t.code&&"NumpadEnter"!==t.code||(f(),v.blur())})),window.addEventListener("beforeunload",(function(){localStorage.setItem("city",v.textContent)})),window.addEventListener("load",(function(){localStorage.getItem("city")&&(v.textContent=localStorage.getItem("city"))}));const S=document.querySelector(".quote"),w=document.querySelector(".author");let x;async function L(){const t=await fetch("data.json"),e=await t.json();var n,o;n=0,o=e.length-1,n=Math.ceil(n),o=Math.floor(o),x=Math.floor(Math.random()*(o-n+1))+n,S.textContent=e[x].text,w.textContent=e[x].author,setTimeout(L,12e4)}document.querySelector(".change-quote").addEventListener("click",L),L();let C=0,q=!1;const E=document.querySelector(".play"),b=document.querySelector(".play-prev"),$=document.querySelector(".play-next"),k=document.querySelector(".play-list");t.forEach((t=>{const e=document.createElement("li");e.classList.add("play-item"),e.textContent=t.title,k.append(e)}));const M=document.querySelectorAll("li");M[0].classList.add("item-active");const I=new Audio;function j(){M.forEach((t=>{t.classList.remove("item-active")})),!1===q?(q=!0,E.classList.toggle("pause"),I.src=t[C].src,I.currentTime=0,I.play(),M[C].classList.toggle("item-active")):(q=!1,I.pause(),E.classList.toggle("pause"),M[C].classList.toggle("item-active")),I.addEventListener("ended",G)}function G(){!0===q?(C===t.length-1?C=0:C++,q=!1,j(),E.classList.add("pause")):(C===t.length-1?C=0:C++,M.forEach((t=>{t.classList.remove("item-active")})),M[C].classList.add("item-active"))}E.addEventListener("click",j),$.addEventListener("click",G),b.addEventListener("click",(function(){!0===q?(0===C?C=t.length-1:C--,q=!1,j(),E.classList.add("pause")):(0===C?C=t.length-1:C--,M.forEach((t=>{t.classList.remove("item-active")})),M[C].classList.add("item-active"))}))})()})();