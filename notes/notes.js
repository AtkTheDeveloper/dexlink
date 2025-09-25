window.addEventListener('DOMContentLoaded', () => {
    const user = localStorage.getItem('loggedInUser');
    if (!user) {
      // Not logged in — optionally redirect or show message
      alert('Please log in from the main app.');
    } else {
      console.log("It works");
      
      // Load notes for that user
    }
  });

