const fs = require("fs").promises;

// Étape 1 : Initialisation de la liste
let tasks = [];

// Étape 2 : Ajouter une Tâche
async function addTask(description) {
  tasks.push({ description, completed: false });
  console.log(`Tâche ajoutée: "${description}"`);
}

// Étape 3 : Afficher les Tâches
function displayTasks() {
  console.log("\nListe des tâches:");
  tasks.map((task, index) => {
    console.log(
      `${index + 1}. ${task.description} - ${
        task.completed ? "✔️ Terminée" : "⏳ En cours"
      }`
    );
  });
}

// Étape 4 : Marquer une Tâche Comme Terminée
const completeTask = (index) => {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    console.log(`Tâche "${tasks[index].description}" marquée comme terminée.`);
  } else {
    console.log("Indice invalide.");
  }
};

// Étape 5 : Supprimer une Tâche
const removeTask = (index) => {
  if (index >= 0 && index < tasks.length) {
    console.log(`Tâche supprimée: "${tasks[index].description}"`);
    tasks = tasks.filter((_, i) => i !== index);
  } else {
    console.log("Indice invalide.");
  }
};

// Étape 6 : Sauvegarder les Tâches dans un Fichier
async function saveTasks() {
  try {
    await fs.writeFile("tasks.json", JSON.stringify(tasks, null, 2));
    console.log("Tâches sauvegardées !");
  } catch (error) {
    console.error("Erreur lors de la sauvegarde :", error);
  }
}

async function loadTasks() {
  try {
    const data = await fs.readFile("tasks.json", "utf-8");
    tasks = JSON.parse(data);
    console.log("Tâches chargées !");
  } catch (error) {
    console.log("Aucune sauvegarde trouvée.");
  }
}

async function main() {
  await loadTasks();
  await addTask("Création d'un seveur");
  completeTask(1);
  removeTask(1);
  displayTasks();
  await saveTasks();
}

main();
