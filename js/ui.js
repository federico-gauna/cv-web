export function setText(id, text){
  const el = document.getElementById(id);
  if(el) el.textContent = text;
}

export function setHidden(id, hidden){
  const el = document.getElementById(id);
  if(el) el.hidden = hidden;
}

export function setDotState(dotEl, state){
  if(!dotEl) return;
  if(state === "ok"){
    dotEl.style.background = "rgba(56,213,235,.9)";
    dotEl.style.boxShadow = "0 0 0 4px rgba(56,213,235,.18)";
    return;
  }
  if(state === "error"){
    dotEl.style.background = "rgba(132,62,240,.9)";
    dotEl.style.boxShadow = "0 0 0 4px rgba(132,62,240,.18)";
    return;
  }
  dotEl.style.background = "rgba(255,255,255,.25)";
  dotEl.style.boxShadow = "0 0 0 4px rgba(255,255,255,.08)";
}

export function escapeHtml(str){
  return String(str)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

export function pickColumns(rows){
  const first = rows?.[0];
  if(!first || typeof first !== "object") return [];
  return Object.keys(first).slice(0, 8);
}