const domestic = [
  "bangalore", "mumbai", "chennai", "hyderabad", "delhi",
  "kolkata", "jaipur", "pune", "ahmedabad"
];

const international = [
  "singapore", "tokyo", "seoul", "sydney", "london",
  "dubai", "usa", "new york", "california", "ireland", "china"
];

const allCities = [...domestic, ...international];

const airlines = [
  "IndiGo", "Air India", "Vistara",
  "SpiceJet", "Emirates", "Qatar Airways"
];

const domesticTimes = ["06:15", "09:40", "14:10", "19:30"];
const internationalTimes = ["01:30", "07:20", "14:45", "22:10"];

let flights = [];
let flightId = 1;

const from = (localStorage.getItem("from") || "").toLowerCase();
const to = (localStorage.getItem("to") || "").toLowerCase();
const date = localStorage.getItem("date") || "";

function toMinutes(timeValue) {
  const [hours, minutes] = timeValue.split(":").map(Number);
  return hours * 60 + minutes;
}

function formatTime(totalMinutes) {
  totalMinutes = totalMinutes % 1440;

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return String(hours).padStart(2, "0") + ":" +
         String(minutes).padStart(2, "0");
}

function titleCase(value) {
  return value.replace(/\b\w/g, character => character.toUpperCase());
}

function createFlight(source, destination, index) {
  const isDomestic =
    domestic.includes(source) && domestic.includes(destination);

  const departureTimes = isDomestic
    ? domesticTimes
    : internationalTimes;

  const durations = isDomestic
    ? [115, 145, 180, 205]
    : [390, 520, 650, 760];

  const departure = departureTimes[index % 4];
  const durationMinutes = durations[index % 4];

  const basePrice = isDomestic ? 3200 : 18000;

  return {
    id: flightId++,
    airline: airlines[index % airlines.length],
    flightNo: (isDomestic ? "SW-" : "SWI-") +
              String(flightId + 100).padStart(3, "0"),
    from: source,
    to: destination,
    departure: departure,
    arrival: formatTime(toMinutes(departure) + durationMinutes),
    durationMinutes: durationMinutes,
    duration:
      Math.floor(durationMinutes / 60) +
      "h " +
      (durationMinutes % 60) +
      "m",
    price: basePrice + index * (isDomestic ? 650 : 2200),
    seatsLeft: [8, 5, 3, 11][index % 4]
  };
}

/* Generate 4 flights for every possible city-to-city route. */
allCities.forEach(source => {
  allCities.forEach(destination => {
    if (source !== destination) {
      for (let i = 0; i < 4; i++) {
        flights.push(createFlight(source, destination, i));
      }
    }
  });
});

function displayFlights() {
  const container = document.getElementById("flights");
  const timeFilter = document.getElementById("timeFilter").value;
  const sort = document.getElementById("sort").value;

  let routeFlights = flights.filter(
    flight => flight.from === from && flight.to === to
  );

  routeFlights = routeFlights.filter(flight => {
    const hour = Number(flight.departure.substring(0, 2));

    if (!timeFilter) return true;
    if (timeFilter === "morning") return hour >= 6 && hour < 12;
    if (timeFilter === "afternoon") return hour >= 12 && hour < 18;
    if (timeFilter === "evening") return hour >= 18;
    if (timeFilter === "night") return hour < 6;

    return true;
  });

  if (sort === "price") {
    routeFlights.sort((a, b) => a.price - b.price);
  }

  if (sort === "duration") {
    routeFlights.sort(
      (a, b) => a.durationMinutes - b.durationMinutes
    );
  }

  container.innerHTML = `
    <div class="route-head">
      <div>
        <span class="eyebrow">FLIGHT OPTIONS</span>
        <h2>${titleCase(from)} → ${titleCase(to)}</h2>
        <p>📅 ${date} · Daily service</p>
      </div>

      <span class="route-badge">
        ${
          domestic.includes(from) && domestic.includes(to)
            ? "Domestic"
            : "International"
        }
      </span>
    </div>
  `;

  if (routeFlights.length === 0) {
    container.innerHTML += `
      <div class="empty">
        <h2>No flights for this time filter</h2>
        <p>Try another departure time.</p>
      </div>
    `;
    return;
  }

  const cheapest = Math.min(
    ...routeFlights.map(flight => flight.price)
  );

  const fastest = Math.min(
    ...routeFlights.map(flight => flight.durationMinutes)
  );

  routeFlights.forEach(flight => {
    const cheapestTag =
      flight.price === cheapest
        ? '<span class="tag green">💰 Cheapest</span>'
        : "";

    const fastestTag =
      flight.durationMinutes === fastest
        ? '<span class="tag blue">⚡ Fastest</span>'
        : "";

    const seatsText =
      flight.seatsLeft <= 3
        ? `⚠ Only ${flight.seatsLeft} seats left`
        : "✓ Seats available";

    container.innerHTML += `
      <article class="flight-card">

        <div class="airline-col">
          <div class="airline-logo">✈</div>
          <div>
            <b>${flight.airline}</b>
            <small>${flight.flightNo}</small>
          </div>
        </div>

        <div class="time-col">
          <b>${flight.departure}</b>
          <small>${flight.from.toUpperCase()}</small>
        </div>

        <div class="duration-col">
          <span>${flight.duration}</span>
          <div class="flight-line">──── ✈ ────</div>
          <small>Non-stop</small>
        </div>

        <div class="time-col">
          <b>${flight.arrival}</b>
          <small>${flight.to.toUpperCase()}</small>
        </div>

        <div class="price-col">
          ${cheapestTag}
          ${fastestTag}
          <b>₹${flight.price.toLocaleString("en-IN")}</b>
          <small>${seatsText}</small>
          <button class="btn primary"
                  onclick="selectFlight(${flight.id})">
            Select
          </button>
        </div>

      </article>
    `;
  });
}

function selectFlight(id) {
  const selectedFlight = flights.find(
    flight => flight.id === id
  );

  localStorage.setItem(
    "flight",
    JSON.stringify(selectedFlight)
  );

  window.location.href = "seat.html";
}

window.addEventListener("load", function() {
  setTimeout(function() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("flightPage").style.display = "block";
    displayFlights();
  }, 500);
});