const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');
const achievementsSection = document.getElementById('achievements');
const hydrationTipsSection = document.getElementById('hydration-tips');

let totalFilledCups = 0; // Initialize total filled cups to 0
let totalAchievements = 0;

// Hydration tips data
const hydrationTipsData = [
  'Take a water bottle with you wherever you go.',
  'Try drinking a glass of water before each meal.',
  'Set a reminder to drink water every hour.',
  'Eat water-rich foods like watermelon and cucumbers.',
  'Carry a reusable water bottle and refill it throughout the day.',
  'Drink water when you wake up and before you go to bed.',
  'Track your daily water intake with a hydration app.',
  'Drink herbal teas or flavored water for variety.',
];

// Achievements data (example)
const achievementsData = [
  { name: 'Hydration Beginner', target: 1 },
  { name: 'Hydration Champion', target: 5 },
  { name: 'Hydration Master', target: 8 },
];

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx));
});

function highlightCups(idx) {
  // Add or remove 'full' class based on the cup's index
  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add('full');
    } else {
      cup.classList.remove('full');
    }
  });

  totalFilledCups = idx + 1; // Update the total filled cups
  updateBigCup();
  showRandomHydrationTip(); // Show a random hydration tip after updating filled cups
  checkAchievements(); // Call checkAchievements after updating filled cups
}

function updateBigCup() {
    const fullCups = document.querySelectorAll('.cup-small.full').length
    const totalCups = smallCups.length

    if(fullCups === 0) {
        percentage.style.visibility = 'hidden'
        percentage.style.height = 0
    } else {
        percentage.style.visibility = 'visible'
        percentage.style.height = `${fullCups / totalCups * 330}px`
        percentage.innerText = `${fullCups / totalCups * 100}%`
    }

    if(fullCups === totalCups) {
        remained.style.visibility = 'hidden'
        remained.style.height = 0
    } else {
        remained.style.visibility = 'visible'
        liters.innerText = `${2 - (250 * fullCups / 1000)}L`
    }
}


function checkAchievements() {
    achievementsData.forEach((achievement) => {
      if (totalAchievements < achievement.target) {
        if (totalFilledCups >= achievement.target) {
          showAchievement(achievement.name);
          totalAchievements = achievement.target;
        }
      }
    });
  }
  
  function showAchievement(achievementName) {
    const achievementElement = document.createElement('div');
    achievementElement.classList.add('achievement');
    achievementElement.innerText = `Achievement Unlocked: ${achievementName}`;
    achievementsSection.appendChild(achievementElement);
  }
  
  function showRandomHydrationTip() {
    // Randomly select a hydration tip from the data
    const randomTipIndex = Math.floor(Math.random() * hydrationTipsData.length);
    const randomTip = hydrationTipsData[randomTipIndex];
  
    // Display the hydration tip on the page
    const tipElement = document.createElement('div');
    tipElement.classList.add('tip');
    tipElement.innerText = randomTip;
    hydrationTipsSection.appendChild(tipElement);
  
    // Remove the tip after a few seconds (optional)
    setTimeout(() => {
      hydrationTipsSection.removeChild(tipElement);
    }, 5000); // Show the tip for 5 seconds (adjust as needed)
  }

  function resetAchievements() {
    totalAchievements = 0;
    totalFilledCups = 0; // Reset total filled cups
    achievementsSection.innerHTML = '';
    checkAchievements();
  }
  
  // Call checkAchievements function after updating big cup to check for achievements
  checkAchievements();