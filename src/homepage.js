// Select form elements
const gameForm = document.querySelector("#game-form");
const gameNameInput = document.querySelector("#game-name");
const gameGenreInput = document.querySelector("#game-genre");
const gamePriceInput = document.querySelector("#game-price");
const getGamesBtn = document.querySelector("#get-games-btn");
const api_endpoint = "https://642556059e0a30d92b2f08bd.mockapi.io/games";

//EDIT
// Add event listener to the form submit button
const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();
});

// GET1
// Call the updateGameList() function when the page is loaded
window.addEventListener("load", async () => {
  await updateGameList();
});

//GET2
getGamesBtn.addEventListener("click", async () => {
  // Call the updateGameList function to show the game list without updating it
  await updateGameList();
});

// Function to update the game list
async function updateGameList() {
  // Send a GET request to the server to get the list of games
  const response = await fetch(api_endpoint);

  if (response.ok) {
    // If the request is successful, parse the response and update the table
    const games = await response.json();
    const gameListTable = document.querySelector("#game-list");
    gameListTable.innerHTML = ""; // Clear the table first

    // Loop through the games and add them to the table
    games.forEach((game) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="px-4 py-2">${game.id}</td>
        <td class="px-4 py-2">${game.name}</td>
        <td class="px-4 py-2">${game.genre}</td>
        <td class="px-4 py-2">${game.price}</td>
        <td class="px-4 py-2">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 edit-btn" data-id="${game.id}">
            Edit
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline delete-btn" data-id="${game.id}">
            Delete
          </button>
        </td>
      `;
      gameListTable.appendChild(row);
    });
  } else {
    // If the request fails, show an error message
    alert("Failed to get game list");
  }
}

//POST
// Add event listener to form submission
gameForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get input values
  const name = gameNameInput.value;
  const genre = gameGenreInput.value;
  const price = gamePriceInput.value;

  // Send a POST request to the server to create a new game
  const response = await fetch(api_endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, genre, price }),
  });

  if (response.ok) {
    // If the request is successful, clear the form and update the game list
    gameNameInput.value = "";
    gameGenreInput.value = "";
    gamePriceInput.value = "";
    updateGameList();
  } else {
    // If the request fails, show an error message
    alert("Failed to create game");
  }
});

//DELETE
// Add event listener to delete buttons
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const gameId = event.target.dataset.id;

    // Send a DELETE request to the server to delete the game
    const response = await fetch(`${api_endpoint}/${gameId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // If the request is successful, update the game list
      updateGameList();
    } else {
      // If the request fails, show an error message
      alert("Failed to delete game");
    }
  }
});

// //EDIT
// // Add event listener to edit buttons
// document.addEventListener("click", async (event) => {
//   if (event.target.classList.contains("edit-btn")) {
//     const gameId = event.target.dataset.id;

//     // Send a GET request to the server to get the game data
//     const response = await fetch(`${api_endpoint}/${gameId}`);

//     if (response.ok) {
//       // If the request is successful, parse the response and populate the form fields with the game data
//       const game = await response.json();
//       gameNameInput.value = game.name;
//       gameGenreInput.value = game.genre;
//       gamePriceInput.value = game.price;

//       const response = await fetch(api_endpoint, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name, genre, price }),
//       });

//       // Change the form submit button text to "Update"
//       const submitBtn = document.querySelector("#submit-btn");
//       submitBtn.textContent = "Update";

//       // Store the game ID in a hidden input field
//       const gameIdInput = document.querySelector("#game-id");
//       gameIdInput.value = gameId;
//     } else {
//       // If the request fails, show an error message
//       alert("Failed to get game data");
//     }
//   }
// });

// Add event listener to edit buttons
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("edit-btn")) {
    const gameId = event.target.dataset.id;

    // Send a GET request to the server to get the game data
    const response = await fetch(`${api_endpoint}/${gameId}`);

    if (response.ok) {
      // If the request is successful, parse the response and populate the form fields with the game data
      const game = await response.json();
      gameNameInput.value = game.name;
      gameGenreInput.value = game.genre;
      gamePriceInput.value = game.price;

      // Change the form submit button text to "Update"
      const submitBtn = document.querySelector("#submit-btn");
      submitBtn.textContent = "Update";

      // Store the game ID in a hidden input field
      const gameIdInput = document.querySelector("#game-id");
      gameIdInput.value = gameId;
    } else {
      // If the request fails, show an error message
      alert("Failed to get game data");
    }
  }
});

// Add event listener to the form submit button
submitBtn.addEventListener("click", async (event) => {
  event.preventDefault();

  // Get input values
  const name = gameNameInput.value;
  const genre = gameGenreInput.value;
  const price = gamePriceInput.value;
  const gameId = document.querySelector("#game-id").value;

  // Send a PUT request to the server to update the game data
  const response = await fetch(`${api_endpoint}/${gameId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, genre, price }),
  });

  if (response.ok) {
    // If the request is successful, clear the form, change the submit button text back to "Submit", and update the game list
    gameNameInput.value = "";
    gameGenreInput.value = "";
    gamePriceInput.value = "";
    submitBtn.textContent = "Submit";
    updateGameList();
  } else {
    // If the request fails, show an error message
    alert("Failed to update game");
  }
});

// // TEST CONSOLE LOG
// // TEST CONSOLE LOG
// // TEST CONSOLE LOG
// // TEST CONSOLE LOG
// // TEST CONSOLE LOG

// async function getAllGames() {
//   try {
//     const response = await fetch(api_endpoint);
//     const results = await response.json();

//     console.log(results);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// // getAllGames();

// async function getGamesById(gamesId) {
//   try {
//     const response = await fetch(api_endpoint + "/" + gamesId);
//     const results = await response.json();

//     console.log(results);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// // getGamesById(26);

// async function createNewGames(newGames) {
//   try {
//     const params = {
//       method: "POST",
//       body: JSON.stringify(newGames),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await fetch(api_endpoint, params);
//     const results = await response.json();

//     console.log(results);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// // createNewGames({
// //   name: "fallout4",
// //   genre: "fps",
// //   price: "100",
// //   onsteam: "true",
// // });

// async function deleteGame(gamesId) {
//   try {
//     const params = {
//       method: "DELETE",
//     };
//     const response = await fetch(api_endpoint + "/" + gamesId, params);
//     const results = await response.json();

//     console.log(results);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// // deleteGame(05);

// async function updateGames(updatedGames) {
//   try {
//     const params = {
//       method: "PUT",
//       body: JSON.stringify({
//         name: updatedGames.name,
//         genre: updatedGames.genre,
//         price: updatedGames.price,
//         onsteam: updatedGames.onsteam,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await fetch(api_endpoint + "/" + updatedGames.id, params);
//     const results = await response.json();

//     console.log(results);
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// // updateGames({
// //   id: "1",
// //   name: "Genshin Impact",
// //   genre: "Zelda looks a like",
// //   price: "150",
// //   onsteam: "false",
// // });
