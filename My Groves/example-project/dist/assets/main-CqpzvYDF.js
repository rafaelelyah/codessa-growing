(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();getComputedStyle(document.documentElement);document.addEventListener("DOMContentLoaded",()=>{console.log("🚀 Example Project loaded with Codessa Growing!");const s=document.getElementById("app"),t=document.createElement("div");t.innerHTML=`
    <div class="project-header">
      <h2>Projeto Exemplo</h2>
      <p>Usando Codessa Growing com foundation customizada</p>
    </div>
    <div class="project-card">
      <h3>Recursos Disponíveis:</h3>
      <ul>
        <li>✅ Seeds customizados (cores da marca)</li>
        <li>✅ Soils específicos (tema do projeto)</li>
        <li>✅ Barks próprios (estilos customizados)</li>
        <li>✅ Acesso às bibliotecas do terrain</li>
      </ul>
    </div>
  `,s.appendChild(t)});
