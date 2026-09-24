const domesticCities = [
  "Bangalore", "Mumbai", "Chennai", "Hyderabad", "Delhi",
  "Kolkata", "Jaipur", "Pune", "Ahmedabad"
];

const internationalCities = [
  "Singapore", "Tokyo", "Seoul", "Sydney", "London",
  "Dubai", "USA", "New York", "California", "Ireland", "China"
];

const allCities = [...domesticCities, ...internationalCities];

function showSuggestions(field) {
  const input = document.getElementById(field).value.trim().toLowerCase();
  const list = document.getElementById(field + "List");

  list.innerHTML = "";

  if (!input) return;

  const matches = allCities.filter(city =>
    city.toLowerCase().includes(input)
  );

  matches.forEach(city => {
    const item = document.createElement("div");
    item.className = "suggestion-item";
    item.textContent = "📍 " + city;

    item.onclick = function() {
      document.getElementById(field).value = city;
      list.innerHTML = "";
    };

    list.appendChild(item);
  });
}

function swapLocations() {
  const from = document.getElementById("from");
  const to = document.getElementById("to");

  [from.value, to.value] = [to.value, from.value];
}

function searchFlights() {
  const source = document.getElementById("from").value.trim();
  const destination = document.getElementById("to").value.trim();
  const date = document.getElementById("date").value;
  const type = document.getElementById("type").value;

  if (!source || !destination || !date) {
    alert("Please complete From, To and Travel Date.");
    return;
  }

  if (source.toLowerCase() === destination.toLowerCase()) {
    alert("Source and destination cannot be the same.");
    return;
  }

  const validSource = allCities.some(
    city => city.toLowerCase() === source.toLowerCase()
  );

  const validDestination = allCities.some(
    city => city.toLowerCase() === destination.toLowerCase()
  );

  if (!validSource || !validDestination) {
    alert("Please choose cities from the suggestions.");
    return;
  }

  localStorage.setItem("from", source.toLowerCase());
  localStorage.setItem("to", destination.toLowerCase());
  localStorage.setItem("type", type);
  localStorage.setItem("date", date);

  window.location.href = "flights.html";
}

window.addEventListener("load", function() {
  document.getElementById("date").min =
    new Date().toISOString().split("T")[0];
});