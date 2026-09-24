const flight = JSON.parse(
  localStorage.getItem("flight") || "null"
);

const seats = JSON.parse(
  localStorage.getItem("seats") || "[]"
);

const foods = [
  ["Veg Thali", 300, "🥗"],
  ["Paneer Meal", 350, "🍛"],
  ["Veg Biryani", 280, "🍚"],
  ["Chicken Biryani", 400, "🍗"],
  ["Grilled Chicken", 450, "🍗"],
  ["Fish Curry", 420, "🐟"],
  ["Burger Combo", 250, "🍔"],
  ["Sandwich", 200, "🥪"],
  ["French Fries", 150, "🍟"],
  ["Ice Cream", 180, "🍨"],
  ["Chocolate Cake", 220, "🍰"],
  ["Soft Drink", 120, "🥤"],
  ["Coffee", 100, "☕"],
  ["Fresh Juice", 130, "🧃"]
];

let selectedFoods = [];

if (!flight || seats.length === 0) {
  window.location.href = "search.html";
}

const foodGrid = document.getElementById("foodGrid");

foods.forEach((food, index) => {
  const card = document.createElement("div");

  card.className = "food-card";

  card.innerHTML = `
    <span class="food-icon">${food[2]}</span>

    <div>
      <b>${food[0]}</b>
      <small>₹${food[1]}</small>
    </div>

    <button onclick="chooseFood(${index}, this)">
      Add
    </button>
  `;

  foodGrid.appendChild(card);
});

function chooseFood(index, button) {
  const alreadySelected = selectedFoods.some(
    food => food.index === index
  );

  if (alreadySelected) {
    selectedFoods = selectedFoods.filter(
      food => food.index !== index
    );

    button.textContent = "Add";
    button.parentElement.classList.remove("chosen");
  } else {
    selectedFoods.push({
      index: index,
      name: foods[index][0],
      price: foods[index][1]
    });

    button.textContent = "Added ✓";
    button.parentElement.classList.add("chosen");
  }

  updateTotal();
}

function updateTotal() {
  const ticketAmount = flight.price * seats.length;

  const foodAmount = selectedFoods.reduce(
    (total, food) => total + food.price,
    0
  );

  const total = ticketAmount + foodAmount;

  document.getElementById("ticketAmount").textContent =
    "₹" + ticketAmount.toLocaleString("en-IN");

  document.getElementById("foodAmount").textContent =
    "₹" + foodAmount.toLocaleString("en-IN");

  document.getElementById("totalAmount").textContent =
    "₹" + total.toLocaleString("en-IN");
}

function makePayment() {
  const cardName =
    document.getElementById("cardName").value.trim();

  const cardNumber =
    document.getElementById("cardNumber").value
      .replace(/\s/g, "");

  const expiry =
    document.getElementById("expiry").value.trim();

  const cvv =
    document.getElementById("cvv").value.trim();

  if (
    !cardName ||
    cardNumber.length < 12 ||
    !expiry ||
    cvv.length < 3
  ) {
    alert("Please enter valid payment details.");
    return;
  }

  const ticketAmount = flight.price * seats.length;

  const foodAmount = selectedFoods.reduce(
    (total, food) => total + food.price,
    0
  );

  const total = ticketAmount + foodAmount;

  localStorage.setItem(
    "food",
    JSON.stringify(selectedFoods.map(food => food.name))
  );

  localStorage.setItem(
    "totalAmount",
    total
  );

  alert("Demo payment successful!");
  window.location.href = "confirmation.html";
}

updateTotal();