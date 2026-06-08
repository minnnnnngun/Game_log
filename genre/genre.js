const games = [
  {
    id: "valorant",
    title: "발로란트",
    genres: ["fps", "strategy"],
    genreNames: ["FPS", "전략"],
    rating: 4.8,
    year: 2020,
    popularity: 98,
    image: "../image/Valorant-Logo-500x281.png",
  },
  {
    id: "battleground",
    title: "배틀그라운드",
    genres: ["fps", "action"],
    genreNames: ["FPS", "액션"],
    rating: 4.5,
    year: 2017,
    popularity: 94,
    image: "../image/BAG.jpg",
  },
  {
    id: "league-of-legends",
    title: "리그 오브 레전드",
    genres: ["strategy", "action"],
    genreNames: ["전략", "액션"],
    rating: 5.0,
    year: 2009,
    popularity: 100,
    image: "../image/League of lengends (1).png",
  },
  {
    id: "fc-online",
    title: "FC 온라인",
    genres: ["sports", "simulation"],
    genreNames: ["스포츠", "시뮬레이션"],
    rating: 4.2,
    year: 2023,
    popularity: 86,
    image: "../image/FC.png",
  },
  {
    id: "maplestory",
    title: "메이플스토리",
    genres: ["rpg", "adventure"],
    genreNames: ["RPG", "어드벤처"],
    rating: 4.4,
    year: 2003,
    popularity: 90,
    image: "../image/maple.jpg",
  },
  {
    id: "overwatch-2",
    title: "오버워치",
    genres: ["fps", "action"],
    genreNames: ["FPS", "액션"],
    rating: 4.3,
    year: 2022,
    popularity: 88,
    image: "../image/Overwatch-Logo-640x400.png",
  },
  {
    id: "Hollow Knight",
    title: "할로우 나이트",
    genres: ["adventure", "action"],
    genreNames: ["어드벤처", "액션"],
    rating: 4.8,
    year: 2022,
    popularity: 93,
    image: "../image/Hollow Knight.jpg",
  },
  {
    id: "genshin",
    title: "원신",
    genres: ["adventure", "rpg"],
    genreNames: ["어드벤처", "RPG"],
    rating: 4.3,
    year: 2020,
    popularity: 89,
    image: "../image/genshin.jpg",
  },
  {
    id: "forza-horizon-5",
    title: "포르자 호라이즌 5",
    genres: ["racing", "sports"],
    genreNames: ["레이싱", "스포츠"],
    rating: 4.7,
    year: 2021,
    popularity: 84,
    image: "../image/FORZA_HORIZON.jpg",
  },
  {
    id: "ARK",
    title: "아크",
    genres: ["adventure", "simulation"],
    genreNames: ["어드벤처", "시뮬레이션"],
    rating: 4.4,
    year: 2018,
    popularity: 78,
    image: "../image/ARK.jpg",
  },
  {
    id: "SUBNAUTICA",
    title: "서브노티카",
    genres: ["adventure", "horror"],
    genreNames: ["어드벤처", "공포"],
    rating: 4.6,
    year: 2015,
    popularity: 76,
    image: "../image/SUBNAUTICA.jpg",
  },
  {
    id: "minecraft",
    title: "마인크래프트",
    genres: ["simulation", "adventure"],
    genreNames: ["시뮬레이션", "어드벤처"],
    rating: 4.7,
    year: 2011,
    popularity: 92,
    image: "../image/minecraft.jpg",
  },
  {
    id: "stardew-valley",
    title: "스타듀 밸리",
    genres: ["rpg", "simulation"],
    genreNames: ["RPG", "시뮬레이션"],
    rating: 4.8,
    year: 2016,
    popularity: 87,
    image: "../image/Starbw_VALLEY.webp",
  },
  {
    id: "poppy-playtime",
    title: "파피 플레이타임",
    genres: ["horror", "puzzle"],
    genreNames: ["공포", "퍼즐"],
    rating: 4.6,
    year: 2021,
    popularity: 74,
    image: "../image/poppy.webp",
  },
  {
    id: "tetris",
    title: "테트리스",
    genres: ["puzzle", "strategy"],
    genreNames: ["퍼즐", "전략"],
    rating: 4.5,
    year: 2018,
    popularity: 70,
    image: "../image/TETRIS-removebg-preview.png",
  },
];
const gameGrid = document.querySelector("#gameGrid");
const gameCount = document.querySelector("#gameCount");
const sortSelect = document.querySelector("#sortSelect");
const pagination = document.querySelector("#pagination");
const filterButtons = document.querySelectorAll(".genre-filter");
const addGameForm = document.querySelector("#addGameForm");
const addTitle = document.querySelector("#addTitle");
const addGenreSelects = document.querySelectorAll(".add-genre-select");
const addRating = document.querySelector("#addRating");
const addYear = document.querySelector("#addYear");
const addImage = document.querySelector("#addImage");
const addImageFile = document.querySelector("#addImageFile");
const deleteModal = document.querySelector("#deleteModal");
const deleteGameName = document.querySelector("#deleteGameName");
const deleteConfirm = document.querySelector("#deleteConfirm");
const deleteCancel = document.querySelector("#deleteCancel");
const detailModal = document.querySelector("#detailModal");
const detailClose = document.querySelector("#detailClose");
const detailImage = document.querySelector("#detailImage");
const detailTitle = document.querySelector("#detailTitle");
const detailGenres = document.querySelector("#detailGenres");
const detailRating = document.querySelector("#detailRating");
const detailYear = document.querySelector("#detailYear");
const detailPopularity = document.querySelector("#detailPopularity");
const detailType = document.querySelector("#detailType");
const genreNames = {
  action: "액션",
  rpg: "RPG",
  fps: "FPS",
  adventure: "어드벤처",
  sports: "스포츠",
  racing: "레이싱",
  strategy: "전략",
  simulation: "시뮬레이션",
  puzzle: "퍼즐",
  horror: "공포",
};
const DEFAULT_IMAGE_PATH = "../image/search.png";
function getGameGenres(game) {
  if (Array.isArray(game.genres)) {
    return game.genres;
  }

  if (game.genres) {
    return [game.genres];
  }

  return [game.genre];
}
function getGameGenreNames(game) {
  if (Array.isArray(game.genreNames)) {
    return game.genreNames;
  }

  if (game.genreNames) {
    return [game.genreNames];
  }

  return [game.genreName];
}
function getUniqueGenres(genres) {
  return [...new Set(genres.filter(Boolean))];
}
const perPage = 9;
let activeGenre = "all";
let currentPage = 1;
let selectedDeleteGameId = null;
function getAddedGames() {
  return JSON.parse(localStorage.getItem("addedGames")) || [];
}
function setAddedGames(addedGames) {
  localStorage.setItem("addedGames", JSON.stringify(addedGames));
}
function getDeletedGameIds() {
  return JSON.parse(localStorage.getItem("deletedGameIds")) || [];
}
function setDeletedGameIds(deletedGameIds) {
  localStorage.setItem("deletedGameIds", JSON.stringify(deletedGameIds));
}
function loadDeletedGames() {
  const deletedGameIds = getDeletedGameIds();

  deletedGameIds.forEach((gameId) => {
    const gameIndex = games.findIndex((game) => game.id === gameId);

    if (gameIndex !== -1) {
      games.splice(gameIndex, 1);
    }
  });
}
function loadAddedGames() {
  const addedGames = getAddedGames().map((game) => ({
    ...game,
    id: game.id || createGameId(game.title),
    genres: getGameGenres(game),
    genreNames: getGameGenreNames(game),
    image: getImagePath(game.image || ""),
    isCustom: true,
  }));
  setAddedGames(addedGames);
  games.push(...addedGames);
}
function getImagePath(imagePath) {
  const trimmedPath = imagePath
    .trim()
    .replace(/^%22|%22$/gi, "")
    .replace(/^["']|["']$/g, "")
    .replace(/%5c/gi, "/")
    .replaceAll("\\", "/");
  if (trimmedPath === "") {
    return DEFAULT_IMAGE_PATH;
  }
  if (/^www\./i.test(trimmedPath)) {
    return `https://${trimmedPath}`;
  }
  if (/^[a-z]:\//i.test(trimmedPath)) {
    return encodeURI(`file:///${trimmedPath}`);
  }
  if (/^\.?\/?image\//i.test(trimmedPath)) {
    return encodeURI(`../${trimmedPath.replace(/^\.?\//, "")}`);
  }
  return encodeURI(trimmedPath);
}
function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
}
async function getSelectedImagePath() {
  if (addImageFile.files.length > 0) {
    return readImageFile(addImageFile.files[0]);
  }

  return getImagePath(addImage.value);
}
function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
function createGameId(title) {
  return `custom-${Date.now()}-${title.replace(/\s+/g, "-")}`;
}
function getVisibleGames() {
  const filtered =
    activeGenre === "all"
      ? [...games]
      : games.filter((game) => getGameGenres(game).includes(activeGenre));
  const sortValue = sortSelect.value;
  return filtered.sort((a, b) => {
    if (sortValue === "recent") {
      return b.year - a.year;
    }
    if (sortValue === "rating") {
      return b.rating - a.rating;
    }
    return b.popularity - a.popularity;
  });
}
function addGame(game) {
  const addedGames = getAddedGames();
  addedGames.push(game);
  setAddedGames(addedGames);
  games.push(game);
  activeGenre = getGameGenres(game)[0];
  currentPage = 1;
  sortSelect.value = "recent";
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.genre === activeGenre);
  });
  renderGames();
}
function deleteGame(gameId) {
  const game = games.find((item) => item.id === gameId);
  const addedGames = getAddedGames().filter((game) => game.id !== gameId);
  const gameIndex = games.findIndex((game) => game.id === gameId);
  if (game && !game.isCustom) {
    const deletedGameIds = getDeletedGameIds();

    if (!deletedGameIds.includes(gameId)) {
      deletedGameIds.push(gameId);
      setDeletedGameIds(deletedGameIds);
    }
  }
  if (gameIndex !== -1) {
    games.splice(gameIndex, 1);
  }
  setAddedGames(addedGames);
  renderGames();
}
function openDeleteModal(gameId, gameTitle) {
  selectedDeleteGameId = gameId;
  deleteGameName.textContent = gameTitle;
  deleteModal.classList.add("open");
  deleteModal.setAttribute("aria-hidden", "false");
}
function closeDeleteModal() {
  deleteModal.classList.remove("open");
  deleteModal.setAttribute("aria-hidden", "true");
  selectedDeleteGameId = null;
}
function openDetailModal(game) {
  const imagePath = game.image || DEFAULT_IMAGE_PATH;
  const genreBadges = getGameGenreNames(game)
    .map((genreName) => `<span class="genre-badge">${genreName}</span>`)
    .join("");

  detailImage.src = imagePath;
  detailImage.alt = `${game.title} 이미지`;
  detailImage.onerror = () => {
    detailImage.onerror = null;
    detailImage.src = DEFAULT_IMAGE_PATH;
  };
  detailTitle.textContent = game.title;
  detailGenres.innerHTML = genreBadges;
  detailRating.textContent = game.rating.toFixed(1);
  detailYear.textContent = game.year;
  detailPopularity.textContent = game.popularity;
  detailType.textContent = game.isCustom ? "추가한 게임" : "기본 게임";
  detailModal.classList.add("open");
  detailModal.setAttribute("aria-hidden", "false");
}
function closeDetailModal() {
  detailModal.classList.remove("open");
  detailModal.setAttribute("aria-hidden", "true");
}
function renderGames() {
  const visibleGames = getVisibleGames();
  const totalPages = Math.max(1, Math.ceil(visibleGames.length / perPage));
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  const start = (currentPage - 1) * perPage;
  const pageGames = visibleGames.slice(start, start + perPage);
  gameCount.textContent = `총 ${visibleGames.length}개`;
  gameGrid.innerHTML = pageGames
    .map((game) => {
      const imagePath = escapeAttribute(game.image || DEFAULT_IMAGE_PATH);
      const genreBadges = getGameGenreNames(game)
        .map((genreName) => `<span class="genre-badge">${genreName}</span>`)
        .join("");

      return `
        <article class="game-card" data-id="${game.id}">
            <img class="game-thumb" src="${imagePath}" alt="${game.title} 이미지" onerror="this.onerror=null;this.src='${DEFAULT_IMAGE_PATH}'">
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="genre-badges">${genreBadges}</div>
                <div class="card-bottom">
                    <span class="rating">${game.rating.toFixed(1)}</span>
                    <span>${game.year}</span>
                </div>
                <div class="card-actions">
                    <button type="button" class="detail-game-btn" data-id="${game.id}">세부정보 보기</button>
                    <button type="button" class="delete-game-btn" data-id="${game.id}">삭제</button>
                </div>
            </div>
        </article>
    `;
    })
    .join("");
  renderPagination(totalPages);
}
function renderPagination(totalPages) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const pageButtons = pages
    .map(
      (page) => `
        <button type="button" class="page-btn ${page === currentPage ? "active" : ""}" data-page="${page}">
            ${page}
        </button>
    `,
    )
    .join("");
  pagination.innerHTML = `
        <button type="button" class="page-btn" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>‹</button>
        ${pageButtons}
        ${totalPages > 5 ? '<span class="page-dots">...</span>' : ""}
        <button type="button" class="page-btn" data-page="next" ${currentPage === totalPages ? "disabled" : ""}>›</button>
    `;
}
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeGenre = button.dataset.genre;
    currentPage = 1;
    renderGames();
  });
});
sortSelect.addEventListener("change", () => {
  currentPage = 1;
  renderGames();
});
addGameForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const selectedGenres = Array.from(addGenreSelects).map((select) => select.value);

  const genres = getUniqueGenres(selectedGenres);
  const game = {
    title: addTitle.value.trim(),
    id: createGameId(addTitle.value.trim()),
    genres,
    genreNames: genres.map((genre) => genreNames[genre]),
    rating: Number(addRating.value),
    year: Number(addYear.value),
    popularity: 60,
    image: await getSelectedImagePath(),
    isCustom: true,
  };
  addGame(game);
  addGameForm.reset();
});
pagination.addEventListener("click", (event) => {
  const button = event.target.closest(".page-btn");
  if (!button || button.disabled) {
    return;
  }
  const visibleGames = getVisibleGames();
  const totalPages = Math.max(1, Math.ceil(visibleGames.length / perPage));
  const page = button.dataset.page;
  if (page === "prev") {
    currentPage -= 1;
  } else if (page === "next") {
    currentPage += 1;
  } else {
    currentPage = Number(page);
  }
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  renderGames();
});
gameGrid.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-game-btn");
  const detailButton = event.target.closest(".detail-game-btn");
  const gameCard = event.target.closest(".game-card");
  if (!gameCard) {
    return;
  }
  if (detailButton) {
    const game = games.find((item) => item.id === detailButton.dataset.id);

    if (game) {
      openDetailModal(game);
    }

    return;
  }
  if (deleteButton) {
    const game = games.find((item) => item.id === deleteButton.dataset.id);
    if (game) {
      openDeleteModal(game.id, game.title);
    }
    return;
  }
  gameGrid.querySelectorAll(".game-card").forEach((card) => {
    if (card !== gameCard) {
      card.classList.remove("show-delete");
    }
  });
  gameCard.classList.toggle("show-delete");
});
deleteConfirm.addEventListener("click", () => {
  if (selectedDeleteGameId) {
    deleteGame(selectedDeleteGameId);
  }
  closeDeleteModal();
});
deleteCancel.addEventListener("click", closeDeleteModal);
deleteModal.addEventListener("click", (event) => {
  if (event.target === deleteModal) {
    closeDeleteModal();
  }
});
detailClose.addEventListener("click", closeDetailModal);
detailModal.addEventListener("click", (event) => {
  if (event.target === detailModal) {
    closeDetailModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && deleteModal.classList.contains("open")) {
    closeDeleteModal();
  }
  if (event.key === "Escape" && detailModal.classList.contains("open")) {
    closeDetailModal();
  }
});
loadDeletedGames();
loadAddedGames();
renderGames();
