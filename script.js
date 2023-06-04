// API details
const apiEndpoint = "https://api.nasa.gov/planetary/apod";
const apiKey = "wLv7FeoIcT6d7HqEIe6J0CqMB1xezXyu9yEwLvBc";

// Get current date
const currentDate = new Date().toISOString().split("T")[0];
//Avoiding future dates from selecting
document.getElementById("search-input").setAttribute("max", currentDate);

// Function to fetch and display the image of the day for the current date
function getCurrentImageOfTheDay() {
  const url = `${apiEndpoint}?api_key=${apiKey}&date=${currentDate}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
        <h1>NASA Picture of the Day</h1>
        <img src="${data.url}" alt="${data.title}" class="nasa-image">
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
      `;
    })
    .catch((error) => console.log(error));
}

// Function to fetch and display the image of the day for a specific date
function getImageOfTheDay(date) {
  const url = `${apiEndpoint}?api_key=${apiKey}&date=${date}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const currentImageContainer = document.getElementById(
        "current-image-container"
      );
      currentImageContainer.innerHTML = `
          <h1>Picture on ${date}</h1>
          <img src="${data.url}" alt="${data.title}" class="nasa-image">
          <h2>${data.title}</h2>
          <p>${data.explanation}</p>
        `;
      saveSearch(date);
    })
    .catch((error) => console.log(error));
}

// Function to save a date to local storage
function saveSearch(date) {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];

  const search = { date: date };
  searches.push(search);
  localStorage.setItem("searches", JSON.stringify(searches));

  addSearchToHistory();
}

// Function to display search history from local storage
function addSearchToHistory() {
  const searchHistory = document.getElementById("search-history");
  searchHistory.innerHTML = "";

  const searches = JSON.parse(localStorage.getItem("searches")) || [];

  searches.forEach((search) => {
    const li = document.createElement("li");
    li.textContent = search.date;
    li.addEventListener("click", () => {
      getImageOfTheDay(search.date);
    });
    searchHistory.appendChild(li);
  });
}

// Event listener for form submission
document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchInput = document.getElementById("search-input");
    const date = searchInput.value;
    console.log(date);
    getImageOfTheDay(date);
    searchInput.value = "";
  });

// Initialize the page
getCurrentImageOfTheDay();
addSearchToHistory();
