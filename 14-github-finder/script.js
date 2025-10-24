const searchForm = document.querySelector("form.search-container");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const profileContainer = document.getElementById("profile-container");
const errorContainer = document.getElementById("error-container");
const avatar = document.getElementById("avatar");
const nameElement = document.getElementById("name");
const usernameElement = document.getElementById("username");
const bioElement = document.getElementById("bio");
const locationElement = document.getElementById("location");
const joinedDateElement = document.getElementById("joined-date");
const profileLink = document.getElementById("profile-link");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const twitterElement = document.getElementById("twitter");
const companyContainer = document.getElementById("company-container");
const blogContainer = document.getElementById("blog-container");
const twitterContainer = document.getElementById("twitter-container");
const reposContainer = document.getElementById("repos-container");

const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

window.addEventListener('DOMContentLoaded', searchUser);
searchForm.addEventListener("submit", searchUser);

async function searchUser(e) {
  e.preventDefault();
  const username = searchInput.value.trim();
  if (!username) return alert("Please enter a username");

  try {
    // reset the ui
    profileContainer.classList.add("hidden");
    errorContainer.classList.add("hidden");

    // https://api.github.com/users/burakorkmez
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) throw new Error("User not found");

    const userData = await response.json();
    // console.log("user data is here", userData);

    displayUserData(userData);
    fetchRepositories(userData.repos_url);
  } catch (error) {
    showError();
  }
}

async function fetchRepositories(reposUrl) {
  reposContainer.innerHTML = '<div class="loading-repos">Loading repositories...</div>';

  try {
    const response = await fetch(reposUrl + "?per_page=6");
    const repos = await response.json();
    displayRepos(repos);
  } catch (error) {
    reposContainer.innerHTML = `<div class="no-repos">${error.message}</div>`;
  }
}

function displayRepos(repos) {
  if (repos.length === 0) {
    reposContainer.innerHTML = '<div class="no-repos">No repositories found</div>';
    return;
  }
  reposContainer.innerHTML = "";

  repos.forEach((repo) => {
    const updatedAt = formatDate(repo.updated_at);

    reposContainer.innerHTML += `
      <div class="repo-card">
        <a href="${repo.html_url}" target="_blank" class="repo-name">
          <i class="fas fa-code-branch"></i> ${repo.name}
        </a>
        <p class="repo-description">${repo.description || "No description available"}</p>
        <div class="repo-meta">
          ${repo.language ? `
            <div class="repo-meta-item">
              <i class="fas fa-circle"></i> ${repo.language}
            </div>
          ` : ""}
          <div class="repo-meta-item">
            <i class="fas fa-star"></i> ${repo.stargazers_count}
          </div>
          <div class="repo-meta-item">
            <i class="fas fa-code-fork"></i> ${repo.forks_count}
          </div>
          <div class="repo-meta-item">
            <i class="fas fa-history"></i> ${updatedAt}
          </div>
        </div>
      </div>
    `;
  });
}

function displayUserData(user) {
  avatar.src = user.avatar_url;
  nameElement.textContent = user.name || user.login;
  usernameElement.textContent = `@${user.login}`;
  bioElement.textContent = user.bio || "No bio available";

  locationElement.textContent = user.location || "Not specified";
  joinedDateElement.textContent = formatDate(user.created_at);

  profileLink.href = user.html_url;
  followers.textContent = user.followers;
  following.textContent = user.following;
  repos.textContent = user.public_repos;

  companyElement.textContent = user.company || "Not specified";

  blogElement.textContent = user.blog || "No website";
  blogElement.href = user.blog ? user.blog.startsWith("http") ? user.blog : `https://${user.blog}` : "#";
  blogContainer.style.display = "flex";

  twitterElement.textContent = user.twitter_username ? `@${user.twitter_username}` : "No Twitter";
  twitterElement.href = user.twitter_username ? `https://twitter.com/${user.twitter_username}` : "#";
  twitterContainer.style.display = "flex";

  // show the profile
  profileContainer.classList.remove("hidden");
}

function showError() {
  errorContainer.classList.remove("hidden");
  profileContainer.classList.add("hidden");
}