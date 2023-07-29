document.addEventListener('DOMContentLoaded', function () {
    const donationForm = document.getElementById('donationForm');
    const donationTable = document.getElementById('donationTable');

    // Sample blood bank data with names, addresses, and contact information
    const bloodBanks = [
     {
        name: 'Blood Bank 1',
        address: '123 Main St, City A, State X',
        contact: 'Phone: 555-123-4567, Email: info@bloodbank1.com',
     },
     {
        name: 'Blood Bank 2',
        address: '456 Oak Ave, City B, State Y',
        contact: 'Phone: 555-987-6543, Email: info@bloodbank2.com',
     },
        // Add more blood bank locations as needed
    ];

    const bloodBankList = document.getElementById('bloodBankList');
    // Create list items for each blood bank
    bloodBanks.forEach((bloodBank) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${bloodBank.name}</strong><br>
            ${bloodBank.address}<br>
            ${bloodBank.contact}
        `;
        bloodBankList.appendChild(listItem);
    });
  
    // Function to handle donation form submission
    donationForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const donorName = document.getElementById('donorName').value;
      const donationDate = new Date(document.getElementById('donationDate').value);
  
      // Calculate the next recommended donation date (60 days after the last donation)
      const nextDonationDate = new Date(donationDate);
      nextDonationDate.setDate(donationDate.getDate() + 60);
  
      const newRow = donationTable.insertRow();
      newRow.innerHTML = `
        <td>${donorName}</td>
        <td>${formatDate(donationDate)}</td>
        <td>${formatDate(nextDonationDate)}
      `;

      // Display personalized donation tips
      showDonationTips(nextDonationDate);
  
      donationForm.reset();
    });
  
    // Function to format date as "MMM DD, YYYY"
    function formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }

    // Function to display personalized donation tips
    function showDonationTips(nextDonationDate) {
        const today = new Date();
        const timeUntilNextDonation = nextDonationDate.getTime() - today.getTime();
        const daysUntilNextDonation = Math.ceil(timeUntilNextDonation / (1000 * 60 * 60 * 24));

        let tipMessage = '';

        if (daysUntilNextDonation >= 0) {
            tipMessage = `Your next donation is recommended after ${daysUntilNextDonation} days. Thank you for your contribution!`;
        } else {
            tipMessage = `It's time for your next donation! Schedule your appointment now to save lives.`;
        }

        const donationTip = document.getElementById('donationTip');
        donationTip.textContent = tipMessage;
    }
  
    // Eligibility Quiz Popup
    const openModalButton = document.getElementById('openEligibilityQuiz');
    const modal = document.getElementById('eligibilityModal');
    const closeButton = document.querySelector('.close');
    const eligibilityForm = document.getElementById('eligibilityForm');
    const eligibilityResult = document.getElementById('eligibilityResult');
  
    // Open the modal when the user clicks the "Check Eligibility" button
    openModalButton.addEventListener('click', function () {
      modal.style.display = 'block';
    });
  
    // Close the modal when the user clicks the close button or outside the modal
    closeButton.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  
    // Handle the eligibility form submission
    eligibilityForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const age = document.querySelector('input[name="age"]:checked').value;
  
      // Add more questions and get their responses here as needed
      // For example, you can ask about health conditions, recent illnesses, medications, etc.
  
      // Determine eligibility based on user responses
      const isEligible = checkEligibility(age); // Implement this function to check all eligibility criteria
  
      // Display eligibility result
      if (isEligible) {
        eligibilityResult.innerHTML = "<p>Congratulations! You are eligible for blood donation.</p>";
      } else {
        eligibilityResult.innerHTML = "<p>Sorry, you are currently ineligible for blood donation. Please check with a healthcare professional for more information.</p>";
      }
  
      // Scroll to the result section for better visibility
      eligibilityResult.scrollIntoView({ behavior: 'smooth' });
  
      // Reset the form after submission
      eligibilityForm.reset();
    });
  
    // Function to check eligibility based on user responses
    function checkEligibility(age) {
      // Implement the eligibility criteria based on user responses
      // You can include more conditions and logic to determine eligibility
      return age === 'yes'; // Example condition: Age must be 18 or older
    }
  });
  