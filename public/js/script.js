// Get the name and age from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const age = urlParams.get('age');

// Display the name and age on the page
document.getElementById('name').textContent = name;
document.getElementById('age').textContent = age;