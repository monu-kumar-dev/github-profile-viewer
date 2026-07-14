const usernameInput = document.getElementById("inputValue");
const searchBtn = document.getElementById("searchBtn");
const resultSection = document.querySelector(".result_section");
const form = document.querySelector(".input_section");

function createInfo(label, value) {
  const p = document.createElement("p");
  p.textContent = `${label}: ${value}`;
  return p;
}

function renderProfile(data) {
  resultSection.innerHTML = "";

  const userData = document.createElement("div");
  userData.classList.add("profile-card");
  
  const avatar = document.createElement("img");
  avatar.src = data.avatar_url;
  avatar.classList.add("img");

  // const userName = document.createElement("P");
  // userName.innerText = `username: ${data.login}`;

  const userName = createInfo("username", data.login);

  // const name = document.createElement("P");
  // name.innerText = `name: ${data.name || "No name available"}`;

  const name = createInfo("Name", data.name ?? "No name available");
  const bio = createInfo("Bio", data.bio ?? "No bio available");

  const followers = createInfo("Followers", data.followers);

  const following = createInfo("Following", data.following);

  const repos = createInfo("Repositories", data.public_repos);

  const location = createInfo(
    "Location",
    data.location ?? "No location available",
  );

  // Ye glt hai kyuki data.created_at is usually a plain text string from an API.
  // const joiningDate = document.createElement("p");
  // joiningDate.innerText = `joined: ${data.created_at.toDateString()}`;

  // correctway:-->But output:--> (12/18/2025)

  // const joiningDate = document.createElement("p");
  // // Convert the ISO string into a JavaScript Date object first
  // const dateObject = new Date(data.created_at);
  // joiningDate.innerText = `joined: ${dateObject.toLocaleDateString()}`;

  // we need output like:-->  (18 dec 2025)

  const joinedDate = new Date(data.created_at);
  const joiningDate = createInfo(
    "Joined",
    joinedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  );

  userData.append(
    avatar,
    userName,
    name,
    bio,
    followers,
    following,
    repos,
    location,
    joiningDate,
  );

  resultSection.appendChild(userData);
}

// function fetchUserData(username) {
//   // console.log(usernameInput.value);

//   resultSection.innerHTML = "";
//   // showing loading in browser until data comes
//   const showMsg = document.createElement("p");
//   showMsg.innerText = "Loading...";
//   resultSection.appendChild(showMsg);
//   // Loading ke time searchBtn remove
//   searchBtn.disabled = true;

//   fetch(`https://api.github.com/users/${username}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(
//           response.status === 404 ? "User not found" : "Something went wrong",
//         );
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       // console.log(data.url);
//       // console.log(data.followers);
//       renderProfile(data);
//       usernameInput.value = "";

//       // // show searchBtn after render profile
//       // searchBtn.disabled = false;
//     })
//     .catch((error) => {
//       // alert("Error: " + error.message);

//       resultSection.innerHTML = "";
//       // showing loading in browser until data comes
//       const errorMsg = document.createElement("p");
//       errorMsg.textContent = error.message;

//       resultSection.appendChild(errorMsg);

//       // // show searchBtn after error message
//       // searchBtn.disabled = false;
//     })
//     .finally(() => {
//       searchIcon.disabled = false;
//     });
// }

// fetchUserData("monu-kumar-dev");

// same with async await:--->
async function fetchUserData(username) {
  // console.log(usernameInput.value);

  resultSection.innerHTML = "";
  // showing loading in browser until data comes
  const showMsg = document.createElement("p");
  showMsg.innerText = "Loading...";
  showMsg.classList.add("loading");
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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = usernameInput.value.trim();

  if (inputValue === "") {
    alert("Please enter username");
    return;
  }
  fetchUserData(inputValue);
});
