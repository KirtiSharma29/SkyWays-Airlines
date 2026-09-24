const flight = JSON.parse(
  localStorage.getItem("flight") || "null"
);

const occupiedSeats = [
  "A2", "B4", "C1",
  "D5", "E3", "F6"
];

let selectedSeats = [];

if (!flight) {
  window.location.href = "search.html";
} else {
  document.getElementById("flightSummary").innerHTML = `
    <p><b>${flight.airline}</b> ${flight.flightNo}</p>
    <p>${flight.from.toUpperCase()} → ${flight.to.toUpperCase()}</p>
    <p>${flight.departure} · ${flight.duration}</p>
  `;

  const seatMap = document.getElementById("seatMap");
  const rows = ["A", "B", "C", "D", "E", "F"];

  rows.forEach(rowLetter => {
    const row = document.createElement("div");
    row.className = "seat-row";

    const rowLabel = document.createElement("span");
    rowLabel.className = "row-label";
    rowLabel.textContent = rowLetter;
    row.appendChild(rowLabel);

    for (let number = 1; number <= 6; number++) {
      const seatNumber = rowLetter + number;
      const button = document.createElement("button");

      button.className = "seat";

      if (occupiedSeats.includes(seatNumber)) {
        button.classList.add("occupied");
        button.disabled = true;
      } else {
        button.classList.add("available");

        button.addEventListener("click", function() {
          toggleSeat(seatNumber, button);
        });
      }

      button.textContent = seatNumber;
      row.appendChild(button);
    }

    seatMap.appendChild(row);
  });
}

function toggleSeat(seatNumber, button) {
  if (selectedSeats.includes(seatNumber)) {
    selectedSeats = selectedSeats.filter(
      seat => seat !== seatNumber
    );

    button.classList.remove("selected");
  } else {
    selectedSeats.push(seatNumber);
    button.classList.add("selected");
  }

  document.getElementById("selectedSeats").textContent =
    selectedSeats.length
      ? selectedSeats.join(", ")
      : "None";
}

function continueSeat() {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  localStorage.setItem(
    "seats",
    JSON.stringify(selectedSeats)
  );

  window.location.href = "payment.html";
}