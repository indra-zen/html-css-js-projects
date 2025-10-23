// const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkForm = document.getElementById("bookmark-form");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

bookmarkForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookmark = {
    name: bookmarkNameInput.value.trim(),
    url: bookmarkUrlInput.value.trim(),
  };

  if (!bookmark.name || !bookmark.url) {
    alert("Please enter both name and URL.");
    return;
  } else {
    if (!bookmark.url?.startsWith("http://") && !bookmark.url?.startsWith("https://")) {
      alert("Please enter a valid URL starting with http:// or https://");
      return;
    }

    addBookmark(bookmark);
    saveBookmark(bookmark);
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
  }
});

function addBookmark(bookmark) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = bookmark.url;
  link.textContent = bookmark.name;
  link.target = "_blank";

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", () => {
    bookmarkList.removeChild(li);
    removeBookmarkFromStorage(bookmark.name, bookmark.url);
  });

  li.appendChild(link);
  li.appendChild(removeButton);

  bookmarkList.appendChild(li);
}

function getBookmarksFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(bookmark) {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmarks() {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.forEach(addBookmark);
}

function removeBookmarkFromStorage(bookmark) {
  let bookmarks = getBookmarksFromStorage();
  bookmarks = bookmarks.filter((b) => b.name !== bookmark.name || b.url !== bookmark.url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
