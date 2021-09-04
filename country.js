const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const countryContainer = document.getElementById("country-container");
const countryDetails = document.getElementById("country-details");
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");

searchBtn.addEventListener("click", function () {
  const search = searchInput.value;
  searchInput.value = '';
  if (search === "") {
    errorDiv.innerText = "Search field cannot be empty.";
    return;
  }
  countryContainer.innerHTML = "";
  countryDetails.innerHTML = "";
  const url = `https://restcountries.eu/rest/v2/name/${search}`;
  spinner.classList.remove("d-none");
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data))
    .finally(() => {
      searchInput.value === "";
      spinner.classList.add("d-none");
    });
});

function showData(countryArray) {
  // Error Handing
  if (countryArray.message === "Not Found") {
    errorDiv.innerText = "No Result Found";
  } else {
    errorDiv.innerText = "";
  }

  countryArray.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("col-md-3");
    div.innerHTML = `
    <div class="col-md-12 text-center border rounded bg-light">
      <div class="rounded overflow-hidden border p-2">
        <img src="${item.flag}" class="w-100" alt=""/>
      </div>
      <div class=" text-dark py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">
        <h1>${item.name}</h1>
        <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Details</button>
      </div>
    </div>`;
    countryContainer.appendChild(div);
  });
}
function showDetails(alpha3Code) {
  fetch(`https://restcountries.eu/rest/v2/alpha/${alpha3Code}`)
    .then((res) => res.json())
    .then((data) => {
  countryDetails.innerHTML = `
    <div class="col-md-12 text-center text-white">
      <div class="border rounded bg-dark">
        <h1>${data.name}</h1>
        <p>Capital: ${data.capital}</p>
        <p>Currency Name: ${data.currencies[0].name}</p>
        <p>Currency Symbol: ${data.currencies[0].symbol}</p>
      </div>
    </div>`;
  });
}
