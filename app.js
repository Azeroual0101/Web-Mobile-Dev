const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const taskInput = document.getElementById("taskInput");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const setTaskBtn = document.getElementById("setTask");
const currentTask = document.getElementById("currentTask");

let timeLeft = 1500; // 25 minutes en secondes (valeur par défaut)
let interval = null; // Initialisation de l'intervalle
let taskName = ""; // Variable pour stocker le nom de la tâche

// Fonction pour mettre à jour le timer
const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// Fonction pour définir la tâche et le temps
const setTask = () => {
    // Récupérer la tâche
    taskName = taskInput.value.trim() || "Tâche sans nom";
    currentTask.textContent = taskName;
    
    // Récupérer les minutes et les secondes
    const minutes = parseInt(minutesInput.value) || 25;
    const seconds = parseInt(secondsInput.value) || 0;
    
    // Mettre à jour le temps total en secondes
    timeLeft = (minutes * 60) + seconds;
    
    // Mettre à jour l'affichage du timer
    updateTimer();
    
    // Réinitialiser l'intervalle si le timer était en cours
    if (interval !== null) {
        stopTimer();
    }
};

// Fonction pour démarrer le timer
const startTimer = () => {
    if (interval !== null) return; // Empêche de démarrer plusieurs intervalles
    interval = setInterval(() => {
        timeLeft--; // Décrémente le temps
        updateTimer(); // Met à jour l'affichage

        // Si le temps est écoulé
        if (timeLeft === 0) {
            clearInterval(interval); // Arrête le timer
            interval = null; // Réinitialise l'intervalle
            alert(`Temps écoulé pour la tâche: ${taskName}!`); // Affiche une alerte avec le nom de la tâche
        }
    }, 1000); // Intervalle de 1 seconde
};

// Fonction pour arrêter le timer
const stopTimer = () => {
    if (interval !== null) {
        clearInterval(interval); // Arrête le timer
        interval = null; // Réinitialise l'intervalle
    }
};

// Fonction pour réinitialiser le timer
const resetTimer = () => {
    stopTimer(); // Arrête le timer
    
    // Récupérer les valeurs actuelles des champs
    const minutes = parseInt(minutesInput.value) || 25;
    const seconds = parseInt(secondsInput.value) || 0;
    
    // Réinitialiser le temps avec les valeurs actuelles
    timeLeft = (minutes * 60) + seconds;
    updateTimer(); // Met à jour l'affichage
};

// Ajout des écouteurs d'événements
start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);
setTaskBtn.addEventListener("click", setTask);

// Validation des entrées pour les secondes (0-59)
secondsInput.addEventListener("change", () => {
    const value = parseInt(secondsInput.value);
    if (value < 0) secondsInput.value = 0;
    if (value > 59) secondsInput.value = 59;
});

// Validation des entrées pour les minutes (1-60)
minutesInput.addEventListener("change", () => {
    const value = parseInt(minutesInput.value);
    if (value < 1) minutesInput.value = 1;
    if (value > 60) minutesInput.value = 60;
});

// Initialiser l'affichage
updateTimer();