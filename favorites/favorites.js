const favoriteList = document.getElementById("favoriteList");
const favoriteSort = document.getElementById("favoriteSort");
const emptyBox = document.getElementById("emptyBox");
const emptyTitle = document.getElementById("emptyTitle");
const emptyText = document.getElementById("emptyText");

// 홈 화면에서 저장하는 이름 배열을 자세한 카드 정보로 바꾸기 위한 기본 목록입니다.
const gameCatalog = [
  {
    name: "엘든 링",
    aliases: ["Elden Ring"],
    genre: "RPG",
    rating: 4.8,
    year: 2022,
    imageSrc: "../image/genshin.jpg",
  },
  {
    name: "발로란트",
    aliases: ["Valorant"],
    genre: "FPS",
    rating: 4.8,
    year: 2022,
    imageSrc: "../image/Valorant-Logo-500x281.png",
  },
  {
    name: "배틀그라운드",
    aliases: ["BATTLEGROUND"],
    genre: "FPS",
    rating: 4.5,
    year: 2022,
    imageSrc: "../image/BAG.jpg",
  },
  {
    name: "원신",
    aliases: [],
    genre: "RPG",
    rating: 4.3,
    year: 2020,
    imageSrc: "../image/genshin.jpg",
  },
  {
    name: "EA SPORTS FC 24",
    aliases: ["FC Online", "EA SPORTS"],
    genre: "스포츠",
    rating: 4.2,
    year: 2023,
    imageSrc: "../image/FC.png",
  },
  {
    name: "포르자 호라이즌 5",
    aliases: [],
    genre: "레이싱",
    rating: 4.7,
    year: 2021,
    imageSrc: "../image/FORZA_HORIZON.jpg",
  },
  {
    name: "할로우 나이트",
    aliases: ["Hollow Knight"],
    genre: "어드벤처",
    rating: 4.4,
    year: 2018,
    imageSrc: "../image/Hollow Knight.jpg",
  },
  {
    name: "리그 오브 레전드",
    aliases: ["League of Legends"],
    genre: "전략",
    rating: 5.0,
    year: 2009,
    imageSrc: "../image/League of lengends (1).png",
  },
  {
    name: "마인크래프트",
    aliases: [],
    genre: "어드벤처",
    rating: 4.7,
    year: 2011,
    imageSrc: "../image/minecraft.jpg",
  },
  {
    name: "스타듀 밸리",
    aliases: [],
    genre: "RPG",
    rating: 4.8,
    year: 2016,
    imageSrc: "../image/Starbw_VALLEY.webp",
  },
];

function getSavedGames() {
  return JSON.parse(localStorage.getItem("favoriteGames")) || [];
}

function setSavedGames(games) {
  localStorage.setItem("favoriteGames", JSON.stringify(games));
}

function normalizeName(name) {
  return name.toLowerCase().replace(/\s+/g, "");
}

function findGameInfo(gameName) {
  const normalizedGameName = normalizeName(gameName);

  return gameCatalog.find((game) => {
    const names = [game.name, ...game.aliases];
    return names.some((name) => normalizeName(name) === normalizedGameName);
  });
}

function makeFavoriteGame(gameName, index) {
  const catalogGame = findGameInfo(gameName);

  if (catalogGame) {
    return {
      ...catalogGame,
      savedName: gameName,
      savedOrder: index,
    };
  }

  return {
    name: gameName,
    savedName: gameName,
    genre: "게임",
    rating: 0,
    year: 2024,
    imageSrc: "../image/search.png",
    savedOrder: index,
  };
}

function getSortedFavorites() {
  const favorites = getSavedGames().map((gameName, index) => makeFavoriteGame(gameName, index));

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

function getBadgeClass(genre) {
  if (genre === "FPS") {
    return "fps";
  }

  if (genre === "RPG") {
    return "rpg";
  }

  if (genre === "스포츠") {
    return "sports";
  }

  return "";
}

function removeFavorite(gameName) {
  const savedGames = getSavedGames().filter((name) => name !== gameName);
  setSavedGames(savedGames);
  renderFavorites();
}

function createFavoriteCard(game) {
  const card = document.createElement("article");
  card.className = "favorite-card";

  card.innerHTML = `
    <div class="favorite-thumb-wrap">
      <button type="button" class="heart-btn" aria-label="${game.name} 즐겨찾기 해제">♡</button>
      <img class="favorite-thumb" src="${game.imageSrc}" alt="${game.name} 이미지" onerror="this.onerror=null;this.src='../image/search.png'">
    </div>
    <div class="favorite-info">
      <h2>${game.name}</h2>
      <span class="badge ${getBadgeClass(game.genre)}">${game.genre}</span>
      <div class="card-bottom">
        <span class="rating">${game.rating.toFixed(1)}</span>
        <button type="button" class="delete-btn" aria-label="${game.name} 삭제">⌫</button>
      </div>
    </div>
  `;

  card.querySelector(".heart-btn").addEventListener("click", () => removeFavorite(game.savedName));
  card.querySelector(".delete-btn").addEventListener("click", () => removeFavorite(game.savedName));

  return card;
}

function renderEmptyBox(hasFavorites) {
  emptyBox.classList.remove("hidden");

  if (hasFavorites) {
    emptyTitle.textContent = "더 저장할 게임을 찾아보세요.";
    emptyText.textContent = "마음에 드는 게임을 ♡ 클릭하여 이곳에 추가할 수 있어요!";
    return;
  }

  emptyTitle.textContent = "즐겨찾기한 게임이 없습니다.";
  emptyText.textContent = "마음에 드는 게임을 ♡ 클릭하여 저장해 보세요!";
}

function renderFavorites() {
  const favoriteGames = getSortedFavorites();
  favoriteList.textContent = "";

  favoriteGames.forEach((game) => {
    favoriteList.append(createFavoriteCard(game));
  });

  renderEmptyBox(favoriteGames.length > 0);
}

favoriteSort.addEventListener("change", renderFavorites);

renderFavorites();
