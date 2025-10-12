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

logoutBtn = document.getElementById('logout');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('loggedInUser');
    window.top.location.href = "../index.html";
});