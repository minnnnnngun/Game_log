// 즐겨찾기 화면을 움직이게 만드는 자바스크립트 파일입니다.
// 저장한 게임을 보여주고, 정렬하고, 삭제하는 일을 담당합니다.

// HTML에 있는 즐겨찾기 목록, 정렬 버튼, 삭제 확인 창을 가져옵니다.
const favoriteList = document.getElementById("favoriteList");
const favoriteSort = document.getElementById("favoriteSort");
const favoriteCount = document.getElementById("favoriteCount");
const clearFavorites = document.getElementById("clearFavorites");
const emptyState = document.getElementById("emptyState");
const removeModal = document.getElementById("removeModal");
const removeGameName = document.getElementById("removeGameName");
const removeConfirm = document.getElementById("removeConfirm");
const removeCancel = document.getElementById("removeCancel");

// 홈에서 저장한 이름과 연결해 보여줄 게임 정보 목록입니다.
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

// 삭제 확인 창에서 어떤 게임을 지울지 잠깐 기억합니다.
let selectedRemoveName = null;

// 즐겨찾기 데이터는 홈 화면과 같은 localStorage의 "favoriteGames"에 저장됩니다.
// 그래서 홈에서 저장한 게임을 즐겨찾기 화면에서도 볼 수 있습니다.
function getSavedGames() {
  return JSON.parse(localStorage.getItem("favoriteGames")) || [];
}

// 바뀐 즐겨찾기 목록을 localStorage의 "favoriteGames" 자리에 다시 저장합니다.
function setSavedGames(games) {
  localStorage.setItem("favoriteGames", JSON.stringify(games));
}

// 즐겨찾기 관리는 로그인한 사용자만 사용할 수 있습니다.
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

// 이름을 비교하기 쉽게 소문자로 만들고 띄어쓰기를 없앱니다.
function normalizeName(name) {
  return String(name).toLowerCase().replace(/\s+/g, "");
}

// 게임 이름을 상세보기 페이지 주소로 바꿉니다.
function getDetailPageUrl(gameName) {
  return `../detail/detail.html?game=${encodeURIComponent(gameName)}`;
}

// 저장된 값이 글자여도, 객체여도 게임 이름만 꺼냅니다.
function getSavedName(savedGame) {
  return typeof savedGame === "string" ? savedGame : savedGame.name;
}

// 저장된 게임 이름과 catalog 안의 게임 정보를 맞춰 찾습니다.
function findCatalogGame(name) {
  const normalized = normalizeName(name);

  return gameCatalog.find((game) => {
    const names = [game.name, ...game.aliases];
    return names.some((item) => normalizeName(item) === normalized);
  });
}

// 저장된 값을 화면에 그리기 좋은 게임 정보 모양으로 바꿉니다.
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

// 정렬 기준에 맞게 즐겨찾기 목록을 정리합니다.
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

// 즐겨찾기에서 지울지 물어보는 창을 엽니다.
function openRemoveModal(gameName) {
  if (!requireLogin()) {
    return;
  }

  selectedRemoveName = gameName;
  removeGameName.textContent = gameName;
  removeModal.classList.add("open");
  removeModal.setAttribute("aria-hidden", "false");
}

// 즐겨찾기 삭제 확인 창을 닫습니다.
function closeRemoveModal() {
  selectedRemoveName = null;
  removeModal.classList.remove("open");
  removeModal.setAttribute("aria-hidden", "true");
}

// 선택한 게임을 즐겨찾기 목록에서 뺍니다.
function removeFavorite(gameName) {
  const savedGames = getSavedGames().filter((game) => getSavedName(game) !== gameName);
  setSavedGames(savedGames);
  renderFavorites();
}

// 즐겨찾기 게임 카드 하나를 만듭니다.
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

// 저장된 즐겨찾기 목록을 화면에 다시 그립니다.
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

// 전체 삭제 버튼을 누르면 즐겨찾기를 모두 비웁니다.
clearFavorites.addEventListener("click", () => {
  if (!requireLogin()) {
    return;
  }

  // "favoriteGames"를 빈 배열로 저장해서 즐겨찾기를 모두 지운 상태로 만듭니다.
  setSavedGames([]);
  renderFavorites();
});

// 삭제 확인 버튼을 누르면 선택한 게임만 지웁니다.
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

// 창 바깥쪽 어두운 부분을 누르면 창을 닫습니다.
removeModal.addEventListener("click", (event) => {
  if (event.target === removeModal) {
    closeRemoveModal();
  }
});

// Esc 키를 누르면 열려 있는 삭제 확인 창을 닫습니다.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && removeModal.classList.contains("open")) {
    closeRemoveModal();
  }
});

// 페이지가 처음 열렸을 때 즐겨찾기 목록을 보여줍니다.
renderFavorites();
