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

