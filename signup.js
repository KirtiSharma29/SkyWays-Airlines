document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const userData = {
    name: document.getElementById("name").value.trim(),
    age: document.getElementById("age").value,
    gender: document.getElementById("gender").value,
    user: document.getElementById("username").value.trim(),
    pass: document.getElementById("password").value
  };

  if (userData.pass.length < 6) {
    alert("Password must contain at least 6 characters.");
    return;
  }

  localStorage.setItem("userData", JSON.stringify(userData));
  alert("Account created successfully!");
  window.location.href = "login.html";
});