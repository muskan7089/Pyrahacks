const elderlyProfileForm = document.getElementById("elderlyProfileForm");
const matchedVolunteersList = document.getElementById("matchedVolunteersList");

const volunteersData = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    availability: ["Monday", "Wednesday", "Friday"],
    preferences: "Running errands",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "9876543210",
    availability: ["Tuesday", "Thursday", "Saturday"],
    preferences: "Companionship",
  },
  // Add more volunteers here...
];

elderlyProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const elderlyProfileData = {
    name: event.target.name.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
    availability: getSelectedCheckboxes(event.target.elements["availability[]"]),
    preferences: event.target.preferences.value,
  };

  matchVolunteersWithElderly(elderlyProfileData);
});

function getSelectedCheckboxes(checkboxes) {
  const selectedCheckboxes = [];
  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      selectedCheckboxes.push(checkbox.value);
    }
  }
  return selectedCheckboxes;
}

function matchVolunteersWithElderly(elderlyProfileData) {
  const matchedVolunteers = volunteersData.filter((volunteer) => {
    return volunteer.preferences === elderlyProfileData.preferences;
  });

  displayMatchedVolunteers(matchedVolunteers);
}

function displayMatchedVolunteers(volunteers) {
  matchedVolunteersList.innerHTML = "";

  if (volunteers.length === 0) {
    matchedVolunteersList.innerHTML = "<p>No volunteers found.</p>";
  } else {
    volunteers.forEach((volunteer) => {
      const volunteerInfo = `
        <div class="volunteer-info">
          <h3>${volunteer.name}</h3>
          <p>Email: ${volunteer.email}</p>
          <p>Phone: ${volunteer.phone}</p>
          <p>Availability: ${volunteer.availability.join(", ")}</p>
          <p>Preferences: ${volunteer.preferences}</p>
        </div>
      `;
      matchedVolunteersList.insertAdjacentHTML("beforeend", volunteerInfo);
    });
  }
}
