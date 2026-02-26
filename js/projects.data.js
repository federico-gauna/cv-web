export const PROJECTS = [
  {
    id: "esports-db",
    name: "eSports DB + API",
    tech: ["Node.js", "Express", "MySQL", "SQL"],
    short: "Modelo relacional normalizado (15+ entidades) + API REST desarrollada con Node.js y Express para exponer entidades clave (juegos, competidores, torneos).",
    problem: "Centraliza datos y relaciones del ecosistema competitivo para consulta y reporting.",
    implements: ["Relaciones con claves primarias y foráneas.","Endpoints REST (GET por entidad).", "Conexión a MySQL.", "Manejo básico de errores y respuestas JSON."],
    repoUrl: "https://github.com/TU_USUARIO/TU_REPO"
  },
  {
    id: "simulador",
    name: "Simulador CPU 8 BITS",
    tech: ["Java", "POO", "Logica"],
    short: "Simulador de CPU de 8 bits implementando ciclo Fetch-Decode-Execute y operaciones binarias básicas.",
    problem: "Permite comprender cómo se ejecutan instrucciones a bajo nivel y fortalece fundamentos de arquitectura y lógica computacional.",
    implements:["Unidad de control simplificada.","Sumador binario con carry.","Representación interna de registros.","Ejecución paso a paso."],
    repoUrl: "https://github.com/TU_USUARIO/TU_REPO"
  },
  {
    id: "sistema-gestion",
    name: "Sistema de gestión por consola",
    tech: ["Java", "POO", "Estructuras"],
    short: "Sistema de gestión con roles de usuario, ABM completo, búsquedas, ordenamientos y reportes sin uso de frameworks.",
    problem: "Simula un sistema administrativo aplicando principios de modularidad y control de flujo.",
    implements:["Validaciones manuales de datos.","Lógica de autenticación por rol.","Módulo de reportes.","Ordenamiento personalizado."],
    repoUrl: "https://github.com/TU_USUARIO/TU_REPO"
  },
  {
    id: "app-web",
    name: "Mini App Web",
    tech: ["HTML", "CSS", "JS","API"],
    short: "Aplicación web estática con sección dinámica que consume mi API desarrollada en Node/Express.",
    problem: "Integra backend y frontend demostrando flujo completo de datos.",
    implements:["Consumo de API con fetch y async-await.","Render dinámico de datos.","Manejo de estados (loading / error / vacío).","Deploy en GitHub Pages."],

    repoUrl: "https://github.com/TU_USUARIO/TU_REPO"
  }
];