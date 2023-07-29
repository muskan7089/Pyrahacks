document.getElementById("infoForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const textFieldValue = document.getElementById("recipe-name").value;
    const textFieldValue1 = document.getElementById("ingredients").value;
    const textFieldValue2 = document.getElementById("address").value;
    const textFieldValue3="hello";
    // Display the text field value
    document.getElementById("displayText").innerText = textFieldValue3;
    document.getElementById("ingredientsText").innerText = textFieldValue1;
    document.getElementById("addressText").innerText = textFieldValue2;
  });
  function addData() {
    // Get form data
    const name = document.getElementById("recipe-name").value;
    const ingredients = document.getElementById("ingredients").value;
    const address = document.getElementById("address").value;
    const contact = document.getElementById("contact").value;
    const imageField = document.getElementById('image');

    // Create a new row for the table
    const table = document.getElementById("dataTable");
    const newRow = table.insertRow();

    // Populate the row with data
    const cell1 = newRow.insertCell();
    const cell2 = newRow.insertCell();
    const cell3 = newRow.insertCell();
    const cell4 = newRow.insertCell();
    const imageCell = newRow.insertCell();
    cell1.innerHTML = name;
    cell2.innerHTML = ingredients;
    cell3.innerHTML = address;
    cell4.innerHTML = contact;
      // Convert image to data URL and set it as the src of the img tag
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const imageDataURL = fileReader.result;
    imageCell.innerHTML = `<img src="${imageDataURL}" alt="Uploaded Image" width="100">`;
  };
  fileReader.readAsDataURL(imageField.files[0]);
  
    
  
    // Clear the form after populating the table
    document.getElementById("infoForm").reset();
}
