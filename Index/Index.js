
const saveButtons = document.querySelectorAll(".save-btn");
const gameCards = document.querySelectorAll(".game-card");
const recommendGenre = document.getElementById("recommendGenre");
const recommendBtn = document.getElementById("recommendBtn");
const recommendResult = document.getElementById("recommendResult");
const recentList = document.getElementById("recentList");
const recentEmpty = document.getElementById("recentEmpty");
const clearRecentBtn = document.getElementById("clearRecentBtn");
const saveModal = document.getElementById("saveModal");
const saveGameName = document.getElementById("saveGameName");
const saveModalTitle = document.getElementById("saveModalTitle");
const saveModalMessage = document.getElementById("saveModalMessage");
const saveConfirm = document.getElementById("saveConfirm");
const saveCancel = document.getElementById("saveCancel");

let selectedGame = null;
let selectedButton = null;
let selectedAction = "save";

function getSavedGames() {
    return JSON.parse(localStorage.getItem("favoriteGames")) || [];
}

function setSavedGames(games) {
    localStorage.setItem("favoriteGames", JSON.stringify(games));
}

function isLoggedIn() {
    return Boolean(localStorage.getItem("loginUser"));
}

function requireLogin() {
    if (isLoggedIn()) {
        return true;
    }

    window.location.href = `../login/login.html?returnUrl=${encodeURIComponent(window.location.href)}`;
    return false;
}

function getRecentGames() {
    return JSON.parse(localStorage.getItem("recentGames")) || [];
}

function setRecentGames(games) {
    localStorage.setItem("recentGames", JSON.stringify(games));
}

function getGameDataFromCard(gameCard) {
    const gameImage = gameCard.querySelector("img");
    const gameGenre = gameCard.querySelector(".game-genre");
    const gameTitle = gameCard.querySelector("h3");
    const gameRating = gameCard.querySelector(".game-rating");
    const gameDescription = gameCard.querySelector("p");
    return {
        name: gameTitle.textContent,
        genre: gameGenre.textContent,
        rating: gameRating.textContent,
        description: gameDescription.textContent,
        imageSrc: gameImage.getAttribute("src"),
        imageAlt: gameImage.getAttribute("alt")
    };
}

function getDetailPageUrl(gameName) {
    return `../detail/detail.html?game=${encodeURIComponent(gameName)}`;
}

function createRecommendCard(game) {
    const recommendCard = document.createElement("article");
    recommendCard.classList.add("recommend-card");
    const recommendImage = document.createElement("img");
    recommendImage.src = game.imageSrc;
    recommendImage.alt = game.imageAlt;
    const recommendInfo = document.createElement("div");
    const recommendGenreText = document.createElement("span");
    recommendGenreText.textContent = game.genre;
    const recommendTitle = document.createElement("h3");
    recommendTitle.textContent = game.name;
    const recommendDescription = document.createElement("p");
    recommendDescription.textContent = game.description;
    const recommendRating = document.createElement("strong");
    recommendRating.textContent = game.rating;
    recommendInfo.append(recommendGenreText, recommendTitle, recommendDescription, recommendRating);
    recommendCard.append(recommendImage, recommendInfo);
    recommendCard.addEventListener("click", () => {
        addRecentGame(game);
        window.location.href = getDetailPageUrl(game.name);
    });
    return recommendCard;
}

function isSameRecommendGenre(game, selectedGenre) {
    if (selectedGenre === "all") {
        return true;
    }
    const gameGenre = game.genre.toLowerCase();
    return gameGenre.includes(selectedGenre);
}

function recommendGame() {
    const games = Array.from(gameCards).map((gameCard) => getGameDataFromCard(gameCard));
    const selectedGenre = recommendGenre.value;
    const filteredGames = games.filter((game) => isSameRecommendGenre(game, selectedGenre));
    recommendResult.classList.remove("has-results");
    if (filteredGames.length === 0) {
        recommendResult.textContent = "";
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "해당 장르의 추천 게임이 없습니다.";
        recommendResult.append(emptyMessage);
        return;
    }
    recommendResult.textContent = "";
    recommendResult.classList.add("has-results");
    filteredGames.forEach((game) => {
        recommendResult.append(createRecommendCard(game));
    });
}

function createRecentCard(game) {
    const recentCard = document.createElement("article");
    recentCard.classList.add("recent-card");
    const recentImage = document.createElement("img");
    recentImage.src = game.imageSrc;
    recentImage.alt = game.imageAlt;
    const recentInfo = document.createElement("div");
    const recentTitle = document.createElement("h3");
    recentTitle.textContent = game.name;
    const recentGenre = document.createElement("span");
    recentGenre.textContent = game.genre;
    const recentRating = document.createElement("p");
    recentRating.textContent = game.rating;
    recentInfo.append(recentTitle, recentGenre, recentRating);
    recentCard.append(recentImage, recentInfo);
    recentCard.addEventListener("click", () => {
        window.location.href = getDetailPageUrl(game.name);
    });
    return recentCard;
}

function renderRecentGames() {
    const recentGames = getRecentGames();
    recentList.textContent = "";
    if (recentGames.length === 0) {
        recentEmpty.classList.remove("hidden");
        clearRecentBtn.classList.add("hidden");
        return;
    }
    recentEmpty.classList.add("hidden");
    clearRecentBtn.classList.remove("hidden");
    recentGames.forEach((game) => {
        recentList.append(createRecentCard(game));
    });
}

function addRecentGame(game) {
    const recentGames = getRecentGames();
    const filteredGames = recentGames.filter((recentGame) => recentGame.name !== game.name);
    filteredGames.unshift(game);
    setRecentGames(filteredGames.slice(0, 6));
    renderRecentGames();
}

function openSaveModal(gameName, button, action) {
    selectedGame = gameName;
    selectedButton = button;
    selectedAction = action;
    saveGameName.textContent = gameName;
    saveModalTitle.textContent = action === "save" ? "게임 저장" : "저장 취소";
    saveModalMessage.textContent = action === "save"
        ? "이 게임을 저장하시겠습니까?"
        : "이 게임 저장을 취소하시겠습니까?";
    saveModal.classList.add("open");
    saveModal.setAttribute("aria-hidden", "false");
}

function closeSaveModal() {
    saveModal.classList.remove("open");
    saveModal.setAttribute("aria-hidden", "true");
    selectedGame = null;
    selectedButton = null;
    selectedAction = "save";
}

function markSavedButton(button) {
    button.textContent = "저장됨";
    button.classList.add("saved");
}

function markUnsavedButton(button) {
    button.textContent = "저장";
    button.classList.remove("saved");
}

saveButtons.forEach((button) => {
    const gameCard = button.closest(".game-card");
    const gameName = gameCard.querySelector("h3").textContent;
    if (getSavedGames().includes(gameName)) {
        markSavedButton(button);
    }
    button.addEventListener("click", () => {
        if (!requireLogin()) {
            return;
        }
        const isSaved = getSavedGames().includes(gameName);
        openSaveModal(gameName, button, isSaved ? "remove" : "save");
    });
});

gameCards.forEach((gameCard) => {
    gameCard.addEventListener("click", (event) => {
        if (event.target.closest(".save-btn")) {
            return;
        }
        const game = getGameDataFromCard(gameCard);
        addRecentGame(game);
        window.location.href = getDetailPageUrl(game.name);
    });
});

saveConfirm.addEventListener("click", () => {
    const savedGames = getSavedGames();
    if (selectedAction === "save") {
        if (selectedGame && !savedGames.includes(selectedGame)) {
            savedGames.push(selectedGame);
            setSavedGames(savedGames);
        }
        if (selectedButton) {
            markSavedButton(selectedButton);
        }
    }
    if (selectedAction === "remove") {
        setSavedGames(savedGames.filter((game) => game !== selectedGame));
        if (selectedButton) {
            markUnsavedButton(selectedButton);
        }
    }
    closeSaveModal();
});

saveCancel.addEventListener("click", closeSaveModal);
recommendBtn.addEventListener("click", recommendGame);

clearRecentBtn.addEventListener("click", () => {
    if (!requireLogin()) {
        return;
    }

    localStorage.removeItem("recentGames");
    renderRecentGames();
});

saveModal.addEventListener("click", (event) => {
    if (event.target === saveModal) {
        closeSaveModal();
    }
});

renderRecentGames();

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && saveModal.classList.contains("open")) {
        closeSaveModal();
    }
});
