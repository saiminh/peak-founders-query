(()=>{let e=!1;document.addEventListener("DOMContentLoaded",(()=>{document.querySelector(".peak-founders-query-loop")&&(s(),o(),setTimeout((()=>{window.location.hash&&r(document.getElementById(window.location.hash.replace("#","")))}),500)),document.querySelector(".peak-founders-query-loop-home")&&(t(),l(),n.observe(document.querySelector(".peak-founders-query-loop-home")))}));const t=function(){document.querySelector(".peak-founders-query-loop-home").querySelectorAll(".founders").forEach(((e,t)=>{const n=Array.from(e.classList).filter((e=>e.startsWith("post-")))[0];if(n){let t=document.createElement("a");t.classList.add("home-founder-link"),t.setAttribute("href","/founders/#"+n),t.innerHTML="Read More",e.appendChild(t)}}))};let n=new IntersectionObserver(((t,n)=>{t.forEach((t=>{e=!!t.isIntersecting}))}),{rootMargin:"0px",threshold:1});const l=function(){let t=document.createElement("div");t.classList.add("dots-container"),document.querySelectorAll(".founders").forEach(((e,o)=>{let r=document.createElement("span");r.classList.add("dot"),r.addEventListener("click",(e=>{s(n=o+1),clearInterval(l),l=setInterval((()=>{n++,s(n)}),3e3)})),t.appendChild(r)})),document.querySelector(".peak-founders-query-loop-home").appendChild(t);let n=1;s(n);let l=setInterval((()=>{e&&(n++,s(n))}),3e3);function s(e){const t=document.querySelector(".peak-founders-query-loop-home .wp-block-post-template");let l,s=document.querySelectorAll(".founders"),o=document.querySelectorAll(".dot");for(e>s.length&&(n=1),e<1&&(n=s.length),t.style.transition="transform 0.5s ease-in-out",t.style.transform=1==n?"translateX(0px)":"translateX(-"+t.querySelector(".founders").getBoundingClientRect().width*(e-1)+"px)",l=0;l<s.length;l++)o[l].className=o[l].className.replace(" active","");o[n-1].className+=" active"}document.querySelectorAll(".home-founder-link").forEach((e=>{e.addEventListener("click",(e=>{clearInterval(l)}))}))},s=function(){let e=document.querySelectorAll(".founders");e.forEach(((t,n)=>{const l=Array.from(t.classList).filter((e=>e.startsWith("post-")))[0];t.setAttribute("id",l),n>6?setTimeout((()=>{t.classList.add("loaded")}),100*n):setTimeout((()=>{t.classList.add("loaded")}),100);const s=document.createElement("div");s.classList.add("founder-toggle"),t.querySelector(".founder-coin").parentElement.appendChild(s),t.addEventListener("click",(t=>{t.preventDefault(),r(e[n])}))}))},o=function(){const e=document.createElement("div");e.classList.add("content-filter"),e.innerHTML='\n    <a href="#" class="filter-link" data-filter="businessmodel-saas">Saas</a>\n    <a href="#" class="filter-link" data-filter="businessmodel-platform-marketplace">Platforms & Marketplaces</a>\n    <a href="#" class="filter-link" data-filter="has-exited">Exits</a>\n  ',document.querySelector(".peak-founders-query-loop").prepend(e),document.querySelectorAll(".filter-link").forEach((e=>{const t=e.getAttribute("data-filter");e.addEventListener("click",(n=>{if(n.preventDefault(),e.classList.contains("active"))e.classList.remove("active"),document.querySelectorAll(".founders").forEach(((e,t)=>{e.style.transition="all .3s cubic-bezier(0.165, 0.84, 0.44, 1)",setTimeout((()=>{e.style.transform="translateY(50%)",e.style.opacity=0}),50),setTimeout((()=>{e.style.display="block",e.style.transition="all .5s cubic-bezier(0.165, 0.84, 0.44, 1)"}),300),setTimeout((()=>{e.style.transform="translateY(0px)",e.style.opacity=1}),301+100*(t+1))}));else{document.querySelector(".filter-link.active")&&document.querySelector(".filter-link.active").classList.remove("active"),e.classList.add("active");let n=[];document.querySelectorAll(".founders").forEach(((e,l)=>{let s=0,o=!1;e.classList.contains(t)&&(n.push(e),s=n.length-1,o=!0),e.style.transition="all .3s cubic-bezier(0.165, 0.84, 0.44, 1)",setTimeout((()=>{e.style.transform=o?"translateY(30%)":"translateY(50%)",e.style.opacity=0}),50),setTimeout((()=>{e.style.display="block",e.classList.contains(t)||(e.style.display="none"),e.style.transition="all .5s cubic-bezier(0.165, 0.84, 0.44, 1)"}),300),setTimeout((()=>{e.style.transform="translateY(0px)",e.style.opacity=1}),301+100*(s+1))}))}}))}))},r=function(e){let t=[];document.querySelectorAll(".founders").forEach((e=>{"none"!=e.style.display&&t.push(e)}));let n=e.cloneNode(!0);e.parentNode.appendChild(n),n.classList.add("founder-full-popup"),n.querySelector(".founder-toggle").remove();const l=document.createElement("div");l.classList.add("founder-toggle"),n.querySelector(".founder-coin").parentElement.appendChild(l),l.addEventListener("click",(e=>{a(n)}));const s=document.createElement("div");if(s.classList.add("founder-prevnext"),n.appendChild(s),t[0]!=e){const l=document.createElement("div");l.classList.add("founder-prev"),s.appendChild(l),l.addEventListener("click",(l=>{l.preventDefault(),a(n),r(t[t.indexOf(e)-1])}))}if(0==e.nextElementSibling.classList.contains("founder-full-popup")&&t.indexOf(e)!=t.length-1){const l=document.createElement("div");l.classList.add("founder-next"),s.appendChild(l),l.addEventListener("click",(l=>{l.preventDefault(),a(n),r(t[t.indexOf(e)+1])}))}},a=function(e){e.classList.add("reverse"),setTimeout((()=>{e.remove()}),600)}})();