const user = JSON.parse(
  localStorage.getItem("userData") || "{}"
);

const flight = JSON.parse(
  localStorage.getItem("flight") || "{}"
);

const seats = JSON.parse(
  localStorage.getItem("seats") || "[]"
);

const food = JSON.parse(
  localStorage.getItem("food") || "[]"
);

const total = Number(
  localStorage.getItem("totalAmount") || 0
);

document.getElementById("boardingPass").innerHTML = `
  <div class="bp-top">
    <div>
      <span>SKYWAY AIRLINES</span>
      <h1>BOARDING PASS</h1>
    </div>
    <div class="qr">▦</div>
  </div>

  <div class="passenger">
    <span>PASSENGER</span>
    <b>${user.name || "Passenger"}</b>
    <small>${user.gender || ""} · Age ${user.age || ""}</small>
  </div>

  <div class="route-big">
    <div>
      <small>FROM</small>
      <b>${(flight.from || "").toUpperCase()}</b>
      <span>${flight.departure || ""}</span>
    </div>

    <strong>✈</strong>

    <div>
      <small>TO</small>
      <b>${(flight.to || "").toUpperCase()}</b>
      <span>${flight.arrival || ""}</span>
    </div>
  </div>

  <div class="bp-grid">

    <div>
      <small>FLIGHT</small>
      <b>${flight.flightNo || "-"}</b>
    </div>

    <div>
      <small>DATE</small>
      <b>${localStorage.getItem("date") || "-"}</b>
    </div>

    <div>
      <small>SEAT</small>
      <b>${seats.join(", ") || "-"}</b>
    </div>

    <div>
      <small>DURATION</small>
      <b>${flight.duration || "-"}</b>
    </div>

    <div>
      <small>MEAL</small>
      <b>${food.length ? food.join(", ") : "None"}</b>
    </div>

    <div>
      <small>TOTAL PAID</small>
      <b>₹${total.toLocaleString("en-IN")}</b>
    </div>

  </div>

  <div class="bp-footer">
    Please arrive at the airport at least 2 hours before departure.
    This is a frontend project simulation.
  </div>
`;