<template>
  <div class="container">
    <input type="search" placeholder="Rechercher une note">
    <h1>Gestion de Notes</h1>
    <input v-model="newTitle" placeholder="Ajouter un titre" />
    <input v-model="newText" placeholder="Ajouter une note" />
    <input v-model="newCategory" placeholder="Ajouter une catégorie" />
    <button @click="isEditing ? updateNote() : addNewNote()">
      {{ isEditing ? 'Mettre à jour' : 'Ajouter' }}
    </button>

    

  </div>
      <div v-for="(note, index) in notes" :key="index" class="bloc">
        <h1>{{ note.title }}</h1>  
        <p>{{ note.text }}</p>
        <p>( {{ note.category }})</p>
        <div>
          <button class="edit" @click="editNote(index)">Modifier</button>
          <button class="delete" @click="removeNote(index)">Supprimer</button>
        </div>
      </div>
</template>

<script setup>
import { ref } from 'vue';
import { useNotesStore } from './stores/notesStore';

const store = useNotesStore();
const newTitle = ref('');
const newText = ref('');
const newCategory = ref('');
const isEditing = ref(false);
const currentIndex = ref(null);

const addNewNote = () => {
  if (newTitle.value && newText.value && newCategory.value) {
    store.addNote({ title: newTitle.value, text: newText.value, category: newCategory.value });
    newTitle.value = '';
    newText.value = '';
    newCategory.value = '';
  }
};

const removeNote = (index) => {
  store.removeNote(index);
};

const editNote = (index) => {
  newTitle.value = store.notes[index].title;
  newText.value = store.notes[index].text;
  newCategory.value = store.notes[index].category;
  isEditing.value = true;
  currentIndex.value = index;
};

const updateNote = () => {
  if (newTitle.value && newText.value && newCategory.value && currentIndex.value !== null) {
    store.updateNote(currentIndex.value, { title: newTitle.value, text: newText.value, category: newCategory.value });
    newTitle.value = '';
    newText.value = '';
    newCategory.value = '';
    isEditing.value = false;
    currentIndex.value = null;
  }
};

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

p{
  text-align: center;
}
.bloc{
  border: 1px solid;
  box-shadow: 2px 2px 2px;
  margin: 5px;
  padding: auto;
  border-radius: 5px;
}
</style>

