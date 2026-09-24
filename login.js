document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const userData = JSON.parse(localStorage.getItem("userData") || "null");

  if (userData && userData.user === username && userData.pass === password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "search.html";
  } else {
    alert("Invalid username or password. Please sign up first.");
  }
});