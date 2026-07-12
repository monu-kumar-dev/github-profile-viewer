// // const response = await fetch(`https://api.github.com/users/monu-kumar-dev`);
// // console.log(response);

// //   .then((response) => {
// //     if (!response.ok) {
// //       throw new Error(
// //         response.status === 404 ? "User not found" : "Something went wrong",
// //       );
// //     }
// //     console.log(response);
// //     // console.log(response.json());
// //     return response.json();
// //   })
// //   .then((data) => {
// //     console.log(data);
// //   })
// //   .catch((error) => {
// //     alert("Error: " + error.message);
// //   })
// //   .finally(() => {});

// async function getUserData() {
//   try {
//     const response = await fetch(`https://api.github.com/users/monu-kumar-dev`);
//     console.log(response);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     // 5. Catch any network errors or broken logic
//     console.error("Oops, something went wrong:", error);
//   }
// }

// getUserData();

// ++++++++++++++++++ converting to async await +++++++++++
async function fetchUserData(username) {
  // console.log(usernameInput.value);

  resultSection.innerHTML = "";
  // showing loading in browser until data comes
  const showMsg = document.createElement("p");
  showMsg.innerText = "Loading...";
  resultSection.appendChild(showMsg);
  // Loading ke time searchBtn remove
  searchBtn.disabled = true;
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error(
        response.status === 404 ? "User not found" : "Something went wrong",
      );
    }

    const data = await response.json();
    // console.log(data);
    // console.log(data.url);
    // console.log(data.followers);
    renderProfile(data);
    usernameInput.value = "";

    // // show searchBtn after render profile
    // searchBtn.disabled = false;
  } catch (error) {
    // alert("Error: " + error.message);

    resultSection.innerHTML = "";
    // showing loading in browser until data comes
    const errorMsg = document.createElement("p");
    errorMsg.textContent = error.message;
    errorMsg.classList.add("error");
    resultSection.appendChild(errorMsg);

    // // show searchBtn after error message
    // searchBtn.disabled = false;
  } finally {
    searchBtn.disabled = false;
  }
}
