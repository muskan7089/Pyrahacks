document.addEventListener('DOMContentLoaded', function () {
    const totalBudgetInput = document.getElementById('totalBudget');
    const totalBudgetValue = document.getElementById('totalBudgetValue');
    const remainingBudgetValue = document.getElementById('remainingBudgetValue');
    const currencySelect = document.getElementById('currency');
    const expenseCategorySelect = document.getElementById('expenseCategory');
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');
    const addExpenseButton = document.getElementById('addExpense');
    const addCategoryButton = document.getElementById('addCategory');
    const expenseList = document.getElementById('expenseList');
    const budgetChartCanvas = document.getElementById('budgetChart');
  
    let totalBudget = 0;
    let remainingBudget = 0;
    let currencySymbol = '$'; // Default currency is USD
    const expenses = [];
    let budgetChart = null; // Store the Chart.js instance
  
    totalBudgetInput.addEventListener('input', function () {
      totalBudget = parseFloat(totalBudgetInput.value);
      updateBudget();
    });
  
    currencySelect.addEventListener('change', function () {
      currencySymbol = currencySelect.value;
      updateBudget();
      updateExpenseList();
    });
  
    addExpenseButton.addEventListener('click', function (e) {
      e.preventDefault();
  
      const category = expenseCategorySelect.value;
      const name = expenseNameInput.value;
      const amount = parseFloat(expenseAmountInput.value);
  
      if (!name || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense name and amount.');
        return;
      }
  
      const expense = { category, name, amount };
      expenses.push(expense);
  
      updateBudget();
      updateExpenseList();
      updateBudgetChart();
  
      expenseNameInput.value = '';
      expenseAmountInput.value = '';
    });
  
    addCategoryButton.addEventListener('click', function (e) {
      e.preventDefault();
  
      const newCategory = prompt('Enter the new expense category:');
      if (newCategory) {
        // Convert the category to lowercase and remove any whitespace
        const formattedCategory = newCategory.toLowerCase().trim();
  
        // Check if the category already exists in the dropdown
        const existingOption = Array.from(expenseCategorySelect.options).find((option) => option.value === formattedCategory);
        if (!existingOption) {
          // Add the new category to the dropdown
          const newOption = document.createElement('option');
          newOption.value = formattedCategory;
          newOption.textContent = capitalizeFirstLetter(formattedCategory);
          expenseCategorySelect.appendChild(newOption);
        } else {
          alert('Category already exists in the dropdown.');
        }
      }
    });
  
    function updateBudget() {
      remainingBudget = totalBudget - expenses.reduce((acc, curr) => acc + curr.amount, 0);
  
      totalBudgetValue.textContent = `${currencySymbol}${totalBudget.toFixed(2)}`;
      remainingBudgetValue.textContent = `${currencySymbol}${remainingBudget.toFixed(2)}`;
    }
  
    function updateExpenseList() {
      expenseList.innerHTML = '';
      expenses.forEach((expense) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${capitalizeFirstLetter(expense.category)} - ${expense.name}: ${currencySymbol}${expense.amount.toFixed(2)}`;
        expenseList.appendChild(listItem);
      });
    }
  
    function updateBudgetChart() {
        const categories = expenses.map((expense) => expense.category.toLowerCase()); // Convert to lowercase
        const uniqueCategories = [...new Set(categories)]; // Get unique categories
      
        const data = uniqueCategories.map((category) => {
          const totalExpenseAmount = expenses.reduce((acc, curr) => {
            if (curr.category.toLowerCase() === category) { // Compare in lowercase
              return acc + curr.amount;
            }
            return acc;
          }, 0);
          return totalExpenseAmount.toFixed(2);
        });
      
        const chartData = {
          labels: uniqueCategories.map((category) => capitalizeFirstLetter(category)), // Capitalize the first letter for display
          datasets: [{
            label: 'Expense Amount',
            data: data,
            backgroundColor: generateRandomColors(data.length),
          }],
        };
      
        const chartOptions = {
          responsive: true,
          legend: {
            display: true,
            position: 'bottom',
          },
        };
      
        // Check if the chart instance exists, and destroy it before creating a new one
        if (budgetChart) {
          budgetChart.destroy();
        }
      
        // Create the new chart instance
        budgetChart = new Chart(budgetChartCanvas, {
          type: 'doughnut',
          data: chartData,
          options: chartOptions,
        });
      }
      
  
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  
    function generateRandomColors(count) {
        const colors = [];
        for (let i = 0; i < count; i++) {
          const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
          colors.push(color);
        }
        return colors;
      }
  
  });
  