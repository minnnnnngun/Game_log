
const favoriteList = document.getElementById("favoriteList");
const favoriteSort = document.getElementById("favoriteSort");
const favoriteCount = document.getElementById("favoriteCount");
const clearFavorites = document.getElementById("clearFavorites");
const emptyState = document.getElementById("emptyState");
const removeModal = document.getElementById("removeModal");
const removeGameName = document.getElementById("removeGameName");
const removeConfirm = document.getElementById("removeConfirm");
const removeCancel = document.getElementById("removeCancel");

const gameCatalog = [
  {
    name: "Valorant",
    aliases: ["발로란트"],
    genre: "FPS",
    rating: 4.3,
    year: 2020,
    imageSrc: "../image/Valorant-Logo-500x281.png",
  },
  {
    name: "Overwatch",
    aliases: ["오버워치"],
    genre: "FPS",
    rating: 4.5,
    year: 2022,
    imageSrc: "../image/Overwatch-Logo-640x400.png",
  },
  {
    name: "League of Legends",
    aliases: ["리그 오브 레전드", "LOL"],
    genre: "MOBA",
    rating: 5.0,
    year: 2009,
    imageSrc: "../image/League of lengends (1).png",
  },
  {
    name: "BATTLEGROUND",
    aliases: ["배틀그라운드"],
    genre: "배틀로얄",
    rating: 4.3,
    year: 2017,
    imageSrc: "../image/BAG.jpg",
  },
  {
    name: "FC Online",
    aliases: ["EA SPORTS FC 24", "EA SPORTS"],
    genre: "스포츠",
    rating: 4.1,
    year: 2023,
    imageSrc: "../image/FC.png",
  },
  {
    name: "MapleStory",
    aliases: ["메이플스토리"],
    genre: "RPG",
    rating: 4.4,
    year: 2003,
    imageSrc: "../image/maple.jpg",
  },
  {
    name: "Minecraft",
    aliases: ["마인크래프트"],
    genre: "어드벤처",
    rating: 4.7,
    year: 2011,
    imageSrc: "../image/minecraft.jpg",
  },
  {
    name: "Stardew Valley",
    aliases: ["스타듀 밸리"],
    genre: "시뮬레이션",
    rating: 4.8,
    year: 2016,
    imageSrc: "../image/Starbw_VALLEY.webp",
  },
  {
    name: "Forza Horizon 5",
    aliases: ["포르자 호라이즌 5"],
    genre: "레이싱",
    rating: 4.7,
    year: 2021,
    imageSrc: "../image/FORZA_HORIZON.jpg",
  },
  {
    name: "Hollow Knight",
    aliases: ["할로우 나이트"],
    genre: "액션",
    rating: 4.8,
    year: 2017,
    imageSrc: "../image/Hollow Knight.jpg",
  },
];

let selectedRemoveName = null;

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

requireLogin();

function normalizeName(name) {
  return String(name).toLowerCase().replace(/\s+/g, "");
}

function getDetailPageUrl(gameName) {
  return `../detail/detail.html?game=${encodeURIComponent(gameName)}`;
}

function getSavedName(savedGame) {
  return typeof savedGame === "string" ? savedGame : savedGame.name;
}

function findCatalogGame(name) {
  const normalized = normalizeName(name);

  return gameCatalog.find((game) => {
    const names = [game.name, ...game.aliases];
    return names.some((item) => normalizeName(item) === normalized);
  });
}

function toFavoriteGame(savedGame, index) {
  const savedName = getSavedName(savedGame);
  const catalogGame = findCatalogGame(savedName);

  if (typeof savedGame === "object" && savedGame !== null) {
    return {
      name: savedGame.name,
      genre: savedGame.genre || catalogGame?.genre || "게임",
      rating: Number.parseFloat(String(savedGame.rating).replace(/[^\d.]/g, "")) || catalogGame?.rating || 0,
      year: savedGame.year || catalogGame?.year || 2024,
      imageSrc: savedGame.imageSrc || catalogGame?.imageSrc || "../image/search.png",
      savedName,
      savedOrder: index,
    };
  }

  return {
    ...(catalogGame || {
      name: savedName,
      genre: "게임",
      rating: 0,
      year: 2024,
      imageSrc: "../image/search.png",
    }),
    savedName,
    savedOrder: index,
  };
}

function getSortedFavorites() {
  const favorites = getSavedGames().map((game, index) => toFavoriteGame(game, index));

  return favorites.sort((a, b) => {
    if (favoriteSort.value === "rating") {
      return b.rating - a.rating;
    }

    if (favoriteSort.value === "title") {
      return a.name.localeCompare(b.name, "ko");
    }

    return b.savedOrder - a.savedOrder;
  });
}

function openRemoveModal(gameName) {
  if (!requireLogin()) {
    return;
  }

  selectedRemoveName = gameName;
  removeGameName.textContent = gameName;
  removeModal.classList.add("open");
  removeModal.setAttribute("aria-hidden", "false");
}

function closeRemoveModal() {
  selectedRemoveName = null;
  removeModal.classList.remove("open");
  removeModal.setAttribute("aria-hidden", "true");
}

function removeFavorite(gameName) {
  const savedGames = getSavedGames().filter((game) => getSavedName(game) !== gameName);
  setSavedGames(savedGames);
  renderFavorites();
}

function createFavoriteCard(game) {
  const card = document.createElement("article");
  card.className = "favorite-card";

  card.innerHTML = `
    <div class="favorite-thumb-wrap">
      <button type="button" class="heart-btn" aria-label="${game.name} 즐겨찾기 삭제">♥</button>
      <img class="favorite-thumb" src="${game.imageSrc}" alt="${game.name} 이미지" onerror="this.onerror=null;this.src='../image/search.png'">
    </div>
    <div class="favorite-info">
      <h2>${game.name}</h2>
      <div class="card-meta">
        <span class="badge">${game.genre}</span>
        <span class="year">${game.year}</span>
      </div>
      <div class="card-bottom">
        <span class="rating">${game.rating.toFixed(1)}</span>
        <button type="button" class="delete-btn">삭제</button>
      </div>
    </div>
  `;

  card.querySelector(".heart-btn").addEventListener("click", () => openRemoveModal(game.savedName));
  card.querySelector(".delete-btn").addEventListener("click", () => openRemoveModal(game.savedName));
  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    window.location.href = getDetailPageUrl(game.name);
  });

  return card;
}

function renderFavorites() {
  const favoriteGames = getSortedFavorites();
  favoriteList.textContent = "";
  favoriteCount.textContent = `${favoriteGames.length}개 저장됨`;
  clearFavorites.classList.toggle("hidden", favoriteGames.length === 0);
  emptyState.classList.toggle("show", favoriteGames.length === 0);

  favoriteGames.forEach((game) => {
    favoriteList.append(createFavoriteCard(game));
  });
}

favoriteSort.addEventListener("change", renderFavorites);

clearFavorites.addEventListener("click", () => {
  if (!requireLogin()) {
    return;
  }

  setSavedGames([]);
  renderFavorites();
});

removeConfirm.addEventListener("click", () => {
  if (!requireLogin()) {
    return;
  }

  if (selectedRemoveName) {
    removeFavorite(selectedRemoveName);
  }

  closeRemoveModal();
});

removeCancel.addEventListener("click", closeRemoveModal);

removeModal.addEventListener("click", (event) => {
  if (event.target === removeModal) {
    closeRemoveModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && removeModal.classList.contains("open")) {
    closeRemoveModal();
  }
});

renderFavorites();
