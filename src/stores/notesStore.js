import { defineStore } from 'pinia';

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
  }),
  actions: {
    addNote(note) {
      this.notes.push(note);
    },
    removeNote(index) {
      this.notes.splice(index, 1);
    },
    updateNote(index, newNote) {
        this.notes[index] = newNote; 
      },
  },
});