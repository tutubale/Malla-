// Estados posibles: locked, available, approved, failed
const subjectsStateKey = "kinesiologiaSubjectsState";

// Datos de prerrequisitos por código
const prereqs = {
  "BIO129": ["BIO1123"],             // Anatomía Humana 2 requiere Anatomía Humana 1
  "KIN236": ["BIO131"],             // Fisiología de Sistemas requiere Biología Celular
  "KIN242": ["BIO129"],             // Biomecánica 1 requiere Anatomía Humana 2
  "KIN248": ["BIO131"],             // Neurofisiología requiere Biología Celular
  "KIN285": ["KIN220"],             // Traumatología Infanto requiere Traumatología Adultos
  "KIN262": ["KIN236"],             // Fisiopatología 1 requiere Fisiología de Sistemas
  "KIN252": ["KIN242"],             // Biomecánica 2 requiere Biomecánica 1
  "KIN247": ["KIN248"],             // Neuropsicología requiere Neurofisiología
  "KIN346": ["KIN285"],             // Enfermería y Primeros Auxilios requiere Traumatología Infanto
  "KIN355": ["KIN330"],             // Kinesiología Adulto Mayor requiere Kinesiología Respiratoria
  "KIN364": ["KIN248"],             // Kinesiología Neurológica 1 requiere Neurofisiología
  "KIN362": ["KIN242"],             // Kinesiología Deportiva requiere Biomecánica 1
  "KIN367": ["KIN285"],             // Kinesiología Pediátrica requiere Traumatología Infanto
  "KIN440": ["KIN355"],             // Terapia Física Integral requiere Kinesiología Adulto Mayor
  "KIN442": ["KIN355"],             // Práctica Profesional I requiere Kinesiología Adulto Mayor
  "KIN446": ["KIN355"],             // Psicología de la Salud requiere Kinesiología Adulto Mayor
  "KIN543": ["KIN364"],             // Kinesiología Neurológica 2 requiere Neurológica 1
  "KIN545": ["KIN442"],             // Práctica Profesional II requiere Práctica Profesional I
  "KIN546": ["KIN442"],             // Gestión en Salud requiere Práctica Profesional I
  "KIN644": ["KIN546"],             // Seminario de Investigación requiere Gestión en Salud
  "KIN645": ["KIN545"],             // Práctica Profesional III requiere Práctica Profesional II
  "KIN646": ["KIN545"],             // Kinesiología en Rehabilitación requiere Práctica Profesional II
  "KIN745": ["KIN645"],             // Memoria de Título requiere Práctica Profesional III
};

function loadState() {
  const stored = localStorage.getItem(subjectsStateKey);
  if (stored) {
    return JSON.parse(stored);
  }
  return {};
}

function saveState(state) {
  localStorage.setItem(subjectsStateKey, JSON.stringify(state));
}

function checkPrereqsPassed(subjectCode, state) {
  const required = prereqs[subjectCode];
  if (!required) return true;
  return required.every(r => state[r] === "approved");
}

function updateSubjects() {
  const state = loadState();
  const allSubjects = document.querySelectorAll(".subject");

  allSubjects.forEach(subj => {
    const code = subj.dataset.code;
    let subjState = state[code] || "locked";

    // Si está aprobado, failed o available pero no debería desbloquear
    // evaluamos prerrequisitos para locked/available.
    if (!checkPrereqsPassed(code, state)) {
      subjState = "locked";
    } else {
      // Si no está aprobado ni reprobado, puede estar disponible
      if (!["approved", "failed"].includes(subjState)) {
        subjState = "available";
      }
    }

    // Asignar clases CSS para colores y estilos
    subj.classList.remove("locked", "available", "approved", "failed", "tachado");

    if (subjState === "approved") {
      subj.classList.add("approved", "tachado");
    } else if (subjState === "failed") {
      subj.classList.add("failed");
    } else if (subjState === "available") {
      subj.classList.add("available");
    } else {
      subj.classList.add("locked");
    }

    // No tacha por defecto, el tachado se pone solo si clickeas "aprobado"
  });
}

function cycleState(code) {
  const state = loadState();
  const current = state[code] || "locked";

  // Ciclo: locked → available → approved → failed → locked
  // Pero permitir desbloquear locked con clic manual.
  let next;
  if (current === "locked") next = "available";
  else if (current === "available") next = "approved";
  else if (current === "approved") next = "failed";
  else next = "locked";

  state[code] = next;
  saveState(state);
  updateSubjects();
}

function setup() {
  updateSubjects();

  document.querySelectorAll(".subject").forEach(el => {
    el.addEventListener("click", () => {
      cycleState(el.dataset.code);
    });
  });
}

window.onload = setup;

