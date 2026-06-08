const favoriteList = document.getElementById("favoriteList");
const emptyMessage = document.getElementById("emptyMessage");
const clearFavorites = document.getElementById("clearFavorites");

function getSavedGames() {
    return JSON.parse(localStorage.getItem("favoriteGames")) || [];
}

function renderFavorites() {
    const savedGames = getSavedGames();
    favoriteList.textContent = "";

    if (savedGames.length === 0) {
        emptyMessage.classList.remove("hidden");
        clearFavorites.classList.add("hidden");
        return;
    }

    emptyMessage.classList.add("hidden");
    clearFavorites.classList.remove("hidden");

    savedGames.forEach((gameName, index) => {
        const card = document.createElement("article");
        card.className = "favorite-card";

        const label = document.createElement("span");
        label.textContent = `저장 ${index + 1}`;

        const title = document.createElement("h2");
        title.textContent = gameName;

        card.append(label, title);
        favoriteList.append(card);
    });
}

clearFavorites.addEventListener("click", () => {
    localStorage.removeItem("favoriteGames");
    renderFavorites();
});

renderFavorites();
