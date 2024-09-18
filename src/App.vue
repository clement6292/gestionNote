<template>
  <div class="container">
    <input type="search" placeholder="Rechercher une note">
    <h1>Gestion de Notes</h1>
    <input v-model="newNote" placeholder="Ajouter une note" />
    <button @click="isEditing ? updateNote() : addNewNote()">
      {{ isEditing ? 'Mettre à jour' : 'Ajouter' }}
    </button>

    <ul>
      <li v-for="(note, index) in notes" :key="index">
        {{ note }}
        <div>
          <button class="edit" @click="editNote(index)">Modifier</button>
          <button class="delete" @click="removeNote(index)">Supprimer</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNotesStore } from './stores/notesStore';

// Créer une instance du store
const store = useNotesStore();

// Déclarer les variables réactives
const newNote = ref('');
const isEditing = ref(false);
const currentIndex = ref(null);

// Fonctions
const addNewNote = () => {
  if (newNote.value) {
    store.addNote(newNote.value);
    newNote.value = '';
  }
};

const removeNote = (index) => {
  store.removeNote(index);
};

const editNote = (index) => {
  newNote.value = store.notes[index]; // Charge la note à modifier
  isEditing.value = true;
  currentIndex.value = index; // Conserve l'index de la note à modifier
};

const updateNote = () => {
  if (newNote.value && currentIndex.value !== null) {
    store.updateNote(currentIndex.value, newNote.value);
    newNote.value = '';
    isEditing.value = false;
    currentIndex.value = null; // Réinitialiser après la mise à jour
  }
};

// Exposer les données et fonctions
const notes = store.notes;
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input {
  width: calc(100% - 22px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #28a79a;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
  background-color: #218838;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

li:last-child {
  border-bottom: none;
}

button.delete {
  background-color: #dc3545;
}

button.delete:hover {
  background-color: #c82333;
}

button.edit {
  background-color: #007bff;
}

button.edit:hover {
  background-color: #0069d9;
}
</style>

