import { openDatabase } from '../modules/db.js';

window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      alert('Please log in from the main app.');
      window.top.location.href = "../index.html";
    } else {
      console.log("It works");
      // Load notes for that user
    }
  });

// Logout functionality
const logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
  const warning = confirm("Are you sure you want to logout?");

  if(!warning){
    return;
  }
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    window.top.location.href = "../index.html";
});


const saveNoteBtn = document.getElementById('saveNote');

saveNoteBtn.addEventListener("click", () => {
 const noteTitle = document.getElementById('noteTitle').value;
 const noteContent = document.getElementById('noteContent').value;

  if(!noteTitle || !noteContent){
    alert("Please fill in both fields.");
    return;
  }

  // Save note to IndexedDB
  const note = {
    title: noteTitle,
    content: noteContent,
    createdAt: new Date().toISOString(),
    username: localStorage.getItem('loggedInUser')
  };

  // Save the note to the database
  saveNoteToDB(note);
  alert("Note saved successfully!");

  // Clear input fields
  document.getElementById('noteTitle').value = '';
  document.getElementById('noteContent').value = '';  

});

function saveNoteToDB(note) {
  openDatabase().then(db => {
    const tx = db.transaction('notes', 'readwrite');
    const store = tx.objectStore('notes');
    store.add(note);
  });
}