const groceryList = [];
const groceryInput = document.getElementById('groceryItem');
const prioritySelect = document.getElementById('prioritySelect');
const groceryListElement = document.getElementById('groceryList');
// Add event listener for the dark mode toggle button
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', toggleDarkMode);

document.getElementById('addItemBtn').addEventListener('click', addItem);
groceryInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addItem();
  }
});

function addItem() {
  const newItem = groceryInput.value.trim();
  const priority = prioritySelect.value;
  const quantity = 1; // Default quantity is set to 1
  const healthInfo = getHealthInfo(newItem); // Function to get health information
  if (newItem !== '') {
    groceryList.push({ name: newItem, completed: false, priority: priority, quantity: quantity, healthInfo: healthInfo });
    groceryInput.value = '';
    displayItems();
  }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    // Save user preference for dark mode in local storage
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  }
  
  // Check if user preference for dark mode exists in local storage and apply it
  const darkModePreference = JSON.parse(localStorage.getItem('darkMode'));
  if (darkModePreference) {
    document.body.classList.add('dark-mode');
  }

function getHealthInfo(itemName) {
  // You can implement your logic here to fetch health information for each item
  // For this example, we'll use some sample data
  const healthInfoData = {
    'apple': 'Rich in vitamins and fiber, good for digestion.',
    'spinach': 'High in iron, great for boosting energy levels.',
    'whole wheat bread': 'Source of complex carbs, aids in maintaining blood sugar levels.',
    'yogurt': 'Contains probiotics, beneficial for gut health.',
    'salmon': 'High in omega-3 fatty acids, promotes heart health.',
    'chocolate': 'Consume in moderation, high in calories and sugar.',
    // Add more health information for other items as needed
  };

  return healthInfoData[itemName.toLowerCase()] || 'Health information not available.';
}

function displayItems() {
  groceryListElement.innerHTML = '';
  groceryList.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <input class="quantity-input" type="number" min="1" value="${item.quantity}" oninput="updateQuantity(${index}, this.value)">
      <span class="${item.completed ? 'completed' : ''} priority-${item.priority}" onclick="toggleItemCompleted(${index})">${item.name}</span>
      <span class="health-info">${item.healthInfo}</span>
      <button class="delete-button" onclick="deleteItem(${index})">Delete</button>
    `;
    groceryListElement.appendChild(listItem);
  });
}

function deleteItem(index) {
  groceryList.splice(index, 1);
  displayItems();
}

function toggleItemCompleted(index) {
  groceryList[index].completed = !groceryList[index].completed;
  displayItems();
}

function updateQuantity(index, quantity) {
  groceryList[index].quantity = parseInt(quantity);
}
