export const API_BASE_URL = "https://TU-API-DEPLOY.com";

async function request(path){
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, { headers: { "Accept":"application/json" } });
  if(!res.ok){
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} — ${text || "Error al consultar API"}`);
  }
  return res.json();
}

export function ping(){
  return request("/health");
}

export function fetchEntity(entity){
  if(entity === "juegos") return request("/api/juegos");
  if(entity === "competidores") return request("/api/competidores");
  if(entity === "torneos") return request("/api/torneos");
  throw new Error("Entidad no soportada");
}