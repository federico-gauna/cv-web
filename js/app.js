import { PROJECTS } from "./projects.data.js";
import { API_BASE_URL, ping, fetchEntity } from "./api.js";
import { setText, setHidden, setDotState, escapeHtml, pickColumns } from "./ui.js";

const $ = (sel) => document.querySelector(sel);

function initYear(){
    const y = new Date().getFullYear();
    const el = $("#year");
    if(el) el.textContent = String(y);
}

function initTheme(){
    const key = "theme";
    const saved = localStorage.getItem(key);
    const prefersLight = window.matchMedia?.("(prefers-color-scheme: light)")?.matches;
    const initial = saved || (prefersLight ? "light" : "dark");
    document.documentElement.dataset.theme = initial;

    const btn = $("#themeToggle");
    const label = $("#themeLabel");

    const paintLabel = () => {
        const t = document.documentElement.dataset.theme;
        if(label) label.textContent = t === "light" ? "Claro" : "Oscuro";
    };

    paintLabel();

    btn?.addEventListener("click", () => {
        const current = document.documentElement.dataset.theme;
        const next = current === "light" ? "dark" : "light";
        document.documentElement.dataset.theme = next;
        localStorage.setItem(key, next);
        paintLabel();
    });
}

function initSectionObserver(){
    const sections = Array.from(document.querySelectorAll(".section[data-section]"));
    const navLinks = Array.from(document.querySelectorAll(".nav__link[data-nav]"));

    const setActiveNav = (id) => {
        navLinks.forEach(a => {
            a.classList.toggle("is-active", a.dataset.nav === id);
        });
    };

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.dataset.section;
            if(entry.isIntersecting){
                entry.target.classList.add("is-active");
                setActiveNav(id);
            }else{
                entry.target.classList.remove("is-active");
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => obs.observe(s));
}

function renderProjects(){
    const grid = $("#projectsGrid");
    const filter = $("#techFilter");
    const search = $("#projectSearch");

    const techs = Array.from(new Set(PROJECTS.flatMap(p => p.tech))).sort((a,b) => a.localeCompare(b));
    const options = ["Todas", ...techs];

    filter.innerHTML = options.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("");

    const state = { tech: "Todas", q: "" };

    const matches = (p) => {
        const okTech = state.tech === "Todas" || p.tech.includes(state.tech);
        const haystack = `${p.name} ${p.short} ${p.problem} ${p.tech.join(" ")}`.toLowerCase();
        const okQ = !state.q || haystack.includes(state.q.toLowerCase());
        return okTech && okQ;
    };

    const paint = () => {
        const list = PROJECTS.filter(matches);

        if(list.length === 0){
            grid.innerHTML = `<div class="card"><h3 class="card__title">Sin resultados</h3><p class="card__text">Probá otro filtro o búsqueda.</p></div>`;
            return;
        }

        grid.innerHTML = list.map(p => `
            <article class="card project">
                <div class="project__top">
                    <div>
                        <h3 class="project__name">${escapeHtml(p.name)}</h3>
                        <div class="project__meta">
                            ${p.tech.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
                        </div>
                    </div>
                    <a class="btn btn--ghost" href="${escapeHtml(p.repoUrl)}" target="_blank" rel="noopener noreferrer">Ver código</a>
                </div>
            
                <p class="project__body"><strong>Descripción:</strong> ${escapeHtml(p.short)}</p>
                <div class="project__body">
                    <strong>Qué implementé:</strong>
                    <ul class="project__list">
                        ${p.implements
                        .map(item => `<li>${escapeHtml(item)}</li>`)
                        .join("")}
                    </ul>
                </div>
                        
                <p class="project__body"><strong>Problema que resuelve:</strong> ${escapeHtml(p.problem)}</p>
            </article>
        `).join("");
    };

    filter.addEventListener("change", (e) => {
        state.tech = e.target.value;
        paint();
    });

    search.addEventListener("input", (e) => {
        state.q = e.target.value.trim();
        paint();
    });

    paint();
}

function renderTable(rows){
    const head = $("#dataHead");
    const body = $("#dataBody");

    if(!Array.isArray(rows) || rows.length === 0){
        head.innerHTML = `<tr><th>Sin datos</th></tr>`;
        body.innerHTML = `<tr><td class="muted">La API devolvió 0 registros.</td></tr>`;
        return;
    }

    const cols = pickColumns(rows);
    head.innerHTML = `<tr>${cols.map(c => `<th>${escapeHtml(c)}</th>`).join("")}</tr>`;

    body.innerHTML = rows.slice(0, 50).map(r => `
        <tr>
            ${cols.map(c => `<td>${escapeHtml(r?.[c] ?? "")}</td>`).join("")}
        </tr>
    `).join("");
}

async function initApiSection(){
    const entitySelect = $("#entitySelect");
    const reloadBtn = $("#reloadEntity");
    const dot = $("#apiDot");

    setText("apiBaseUrlText", `(${API_BASE_URL})`);

    const setError = (msg) => {
        setText("apiError", msg);
        setHidden("apiError", false);
        setDotState(dot, "error");
    };

    const clearError = () => {
        setHidden("apiError", true);
        setText("apiError", "");
    };

    const check = async () => {
        try{
            clearError();
            setDotState(dot, "idle");
            setText("apiStatusText", "API: verificando...");
            await ping();
            setDotState(dot, "ok");
            setText("apiStatusText", "API: OK");
        }catch(e){
        setText("apiStatusText", "API: error");
        setError(`No se pudo conectar a la API. Verificá CORS y /health. Detalle: ${e.message}`);
        }
    };

    const loadEntity = async () => {
        const entity = entitySelect.value;
        try{
            clearError();
            setText("apiStatusText", `API: cargando ${entity}...`);
            const rows = await fetchEntity(entity);
            setText("apiStatusText", `API: OK — ${entity} (${Array.isArray(rows) ? rows.length : 0})`);
            setDotState(dot, "ok");
            renderTable(rows);
        }catch(e){
        setText("apiStatusText", `API: error en ${entity}`);
        setError(`Error al cargar ${entity}: ${e.message}`);
        renderTable([]);
        }
    };

    await check();
    await loadEntity();

    entitySelect.addEventListener("change", loadEntity);
    reloadBtn.addEventListener("click", loadEntity);
}

initYear();
initTheme();
initSectionObserver();
renderProjects();
initApiSection();

// ==============================
// CONTACT MODAL
// ==============================

const openBtn = document.getElementById('openContact');
const modal = document.getElementById('contactModal');
const closeBtn = document.getElementById('closeModal');
const copyBtn = document.getElementById('copyEmail');
const emailText = document.getElementById('emailText');

if (openBtn && modal && closeBtn && copyBtn && emailText) {

    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(emailText.textContent);
            copyBtn.textContent = 'Copiado ✔';
            setTimeout(() => {
            copyBtn.textContent = 'Copiar';
            }, 2000);
        } catch (err) {
        copyBtn.textContent = 'Error';
        }
    });
}