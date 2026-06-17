// 홈 화면을 움직이게 만드는 자바스크립트 파일입니다.
// 저장 버튼, 추천 게임, 최근 본 게임, 저장 확인 창을 담당합니다.

// HTML에 있는 버튼과 화면 칸들을 자바스크립트가 사용할 수 있게 가져옵니다.
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

// 지금 어떤 게임을 저장하거나 취소하려는지 잠깐 기억해 두는 칸입니다.
let selectedGame = null;
let selectedButton = null;
let selectedAction = "save";

// 즐겨찾기 데이터는 브라우저 localStorage의 "favoriteGames"라는 이름표에 저장됩니다.
// localStorage는 새로고침해도 남아 있는, 브라우저 안의 작은 저장 공간입니다.
function getSavedGames() {
    return JSON.parse(localStorage.getItem("favoriteGames")) || [];
}

// 바뀐 즐겨찾기 목록을 localStorage의 "favoriteGames" 자리에 다시 저장합니다.
function setSavedGames(games) {
    localStorage.setItem("favoriteGames", JSON.stringify(games));
}

// 로그인이 필요한 기능을 쓰기 전에 로그인 상태를 확인합니다.
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

// 최근 본 게임 데이터는 localStorage의 "recentGames"라는 이름표에 저장됩니다.
function getRecentGames() {
    return JSON.parse(localStorage.getItem("recentGames")) || [];
}

// 바뀐 최근 본 게임 목록을 localStorage의 "recentGames" 자리에 다시 저장합니다.
function setRecentGames(games) {
    localStorage.setItem("recentGames", JSON.stringify(games));
}

// 게임 카드 안에 적힌 제목, 장르, 평점, 이미지 정보를 하나로 모읍니다.
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

// 게임 이름을 상세보기 페이지 주소로 바꿉니다.
function getDetailPageUrl(gameName) {
    return `../detail/detail.html?game=${encodeURIComponent(gameName)}`;
}

// 추천 결과에 보여줄 작은 게임 카드를 새로 만듭니다.
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

// 선택한 장르와 게임의 장르가 같은지 확인합니다.
function isSameRecommendGenre(game, selectedGenre) {
    if (selectedGenre === "all") {
        return true;
    }
    const gameGenre = game.genre.toLowerCase();
    return gameGenre.includes(selectedGenre);
}

// 장르를 보고 추천 게임 목록을 화면에 보여줍니다.
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

// 최근 본 게임 칸에 들어갈 작은 카드를 만듭니다.
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

// 저장된 최근 본 게임을 읽어서 화면에 다시 그립니다.
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

// 방금 누른 게임을 최근 본 게임 맨 앞에 넣습니다.
function addRecentGame(game) {
    const recentGames = getRecentGames();
    const filteredGames = recentGames.filter((recentGame) => recentGame.name !== game.name);
    filteredGames.unshift(game);
    setRecentGames(filteredGames.slice(0, 6));
    renderRecentGames();
}

// 저장할지, 저장을 취소할지 물어보는 창을 엽니다.
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

// 물어보는 창을 닫고, 임시로 기억한 값을 비웁니다.
function closeSaveModal() {
    saveModal.classList.remove("open");
    saveModal.setAttribute("aria-hidden", "true");
    selectedGame = null;
    selectedButton = null;
    selectedAction = "save";
}

// 저장된 게임 버튼처럼 보이게 바꿉니다.
function markSavedButton(button) {
    button.textContent = "저장됨";
    button.classList.add("saved");
}

// 저장되지 않은 게임 버튼처럼 보이게 바꿉니다.
function markUnsavedButton(button) {
    button.textContent = "저장";
    button.classList.remove("saved");
}

// 페이지가 열릴 때 이미 저장된 게임은 버튼을 "저장됨"으로 바꿉니다.
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

// 게임 카드를 누르면 "최근 본 게임"에 추가합니다. 저장 버튼을 누른 경우는 제외합니다.
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

// 확인 버튼을 누르면 실제로 저장하거나 저장을 취소합니다.
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

// 최근 본 게임을 전부 지웁니다.
clearRecentBtn.addEventListener("click", () => {
    if (!requireLogin()) {
        return;
    }

    // localStorage에서 "recentGames" 이름표 자체를 지워서 최근 본 게임을 비웁니다.
    localStorage.removeItem("recentGames");
    renderRecentGames();
});

// 창 바깥쪽 어두운 부분을 누르면 저장 확인 창을 닫습니다.
saveModal.addEventListener("click", (event) => {
    if (event.target === saveModal) {
        closeSaveModal();
    }
});

renderRecentGames();

// Esc 키를 누르면 열려 있는 저장 확인 창을 닫습니다.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && saveModal.classList.contains("open")) {
        closeSaveModal();
    }
});
