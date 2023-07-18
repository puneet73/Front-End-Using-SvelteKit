document.addEventListener("DOMContentLoaded", function() {
  // Collapsible Sidebar
  var sidebarButton = document.querySelector('.collapsible');
  sidebarButton.addEventListener('click', function() {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
  // Search Bar in Sidebar
  var searchInput = document.getElementById("searchInput");
  var cards = document.getElementsByClassName("card");

  searchInput.addEventListener("input", function() {
    var searchValue = this.value.toLowerCase();

    Array.from(cards).forEach(function(card) {
      var cardTitle = card.querySelector("h3").textContent.toLowerCase();
      var cardDescription = card.querySelector("p").textContent.toLowerCase();

      if (cardTitle.includes(searchValue) || cardDescription.includes(searchValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
  // Add Card Button
  var addCardButton = document.getElementById("addCardBtn");
  var modal = document.getElementById("modal");
  var closeModal = document.querySelector(".close");

  addCardButton.addEventListener("click", function() {
    modal.style.display = "block";
  });

  closeModal.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Save Card Button
  var saveCardButton = document.getElementById("saveCardBtn");
  var cardContainer = document.getElementById("cardContainer");
  var cardTitleInput = document.getElementById("cardTitle");
  var cardDescriptionInput = document.getElementById("cardDescription");
  var nestedDataInput = document.getElementById("nestedDataInput");

  saveCardButton.addEventListener("click", function() {
    var cardTitle = cardTitleInput.value;
    var cardDescription = cardDescriptionInput.value;
    var nestedData = nestedDataInput.value.split(",").map(function(item) {
      return item.trim();
    });

    var cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.innerHTML = `
      <h3>${cardTitle}</h3>
      <p>${cardDescription}</p>
    `;
    cardContainer.appendChild(cardElement);

    cardElement.addEventListener("click", function() {
      document.getElementById("cardTitleContent").textContent = cardTitle;
      document.getElementById("cardDescriptionContent").textContent = cardDescription;

      var nestedDataContainer = document.getElementById("nestedDataContainer");
      nestedDataContainer.innerHTML = "";

      if (nestedData.length > 0) {
        var nestedList = document.createElement("ul");
        nestedList.classList.add("nested-list");

        nestedData.forEach(function(data) {
          var nestedItem = document.createElement("li");
          nestedItem.textContent = data;
          nestedList.appendChild(nestedItem);
        });

        nestedDataContainer.appendChild(nestedList);
      }
    });

    modal.style.display = "none";
    cardTitleInput.value = "";
    cardDescriptionInput.value = "";
    nestedDataInput.value = "";
  });
});


window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("cardTitle").value = "";
    document.getElementById("cardDescription").value = "";
    document.getElementById("nestedDataInput").value = "";
  }
});

// ... previous JavaScript code ...

// Update Content Area with Card Data and Nested Data
var nestedData = {
  Toyota: ["Model 1", "Model 2", "Model 3"],
  Ford: ["Model A", "Model B", "Model C"],
  Honda: ["Model X", "Model Y", "Model Z"]
};

var cardContainer = document.getElementById("cardContainer");
var cardTitleContent = document.getElementById("cardTitleContent");
var cardDescriptionContent = document.getElementById("cardDescriptionContent");
var detailsContainer = document.getElementById("detailsContainer");
var nestedDataContainer = document.getElementById("nestedDataContainer");

cardContainer.addEventListener("click", function(event) {
  if (event.target.matches(".card")) {
    var cardTitle = event.target.querySelector("h3").textContent;
    var cardDescription = event.target.querySelector("p").textContent;
    var cardDetails = getCardDetails(cardTitle);
    var nestedDataList = nestedData[cardTitle];

    cardTitleContent.textContent = cardTitle;
    cardDescriptionContent.textContent = cardDescription;
    updateNestedData(nestedDataList);
    updateDetails(cardDetails);
  }
});

function getCardDetails(cardTitle) {
  // Custom function to retrieve card details based on the card title
  // Replace with your own logic to fetch the card details
  // Return an object with the details
  if (cardTitle === "Toyota") {
    return {
      manufacturer: "Toyota",
      year: "2022",
      color: "Red"
    };
  } else if (cardTitle === "Ford") {
    return {
      manufacturer: "Ford",
      year: "2021",
      color: "Blue"
    };
  } else if (cardTitle === "Honda") {
    return {
      manufacturer: "Honda",
      year: "2023",
      color: "Green"
    };
  }

  // Return null if no card details found
  return null;
}

function updateNestedData(dataList) {
  nestedDataContainer.innerHTML = "";

  if (dataList && dataList.length > 0) {
    var nestedList = document.createElement("ul");
    nestedList.classList.add("nested-list");

    dataList.forEach(function(data) {
      var nestedItem = document.createElement("li");
      nestedItem.textContent = data;
      nestedList.appendChild(nestedItem);
    });

    nestedDataContainer.appendChild(nestedList);
  } else {
    var noDataMessage = document.createElement("div");
    noDataMessage.textContent = "No nested data available.";
    nestedDataContainer.appendChild(noDataMessage);
  }
}

function updateDetails(cardDetails) {
  detailsContainer.innerHTML = "";

  if (cardDetails) {
    var detailsList = document.createElement("ul");

    for (var key in cardDetails) {
      if (cardDetails.hasOwnProperty(key)) {
        var detailItem = document.createElement("li");
        detailItem.textContent = key + ": " + cardDetails[key];
        detailsList.appendChild(detailItem);
      }
    }

    detailsContainer.appendChild(detailsList);
  }
}


var searchNestedInput = document.getElementById("searchNestedInput");
var nestedModels = document.getElementsByClassName("nested-model");

searchNestedInput.addEventListener("input", function() {
  var searchValue = this.value.toLowerCase();

  Array.from(nestedModels).forEach(function(model) {
    var modelName = model.textContent.toLowerCase();

    if (modelName.includes(searchValue)) {
      model.style.display = "block";
    } else {
      model.style.display = "none";
    }
  });
});
window.addEventListener('load', function() {
  // Collapsible Sidebar
  var sidebar = document.querySelector('.sidebar');
  var sidebarButton = document.getElementById('sidebarButton');

  sidebarButton.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
  });
});

var expandButton = document.getElementById("expandButton");

expandButton.addEventListener("click", function() {
  var cardTitle = document.getElementById("cardTitleContent").textContent;
  var cardDescription = document.getElementById("cardDescriptionContent").textContent;
  var nestedDataList = nestedData[cardTitle];

  var url = "expanded.html";
  url += "?title=" + encodeURIComponent(cardTitle);
  url += "&description=" + encodeURIComponent(cardDescription);
  url += "&nestedData=" + encodeURIComponent(JSON.stringify(nestedDataList));

  window.open(url, "_blank");
});


