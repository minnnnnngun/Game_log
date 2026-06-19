
const games = [
  {
    id: "valorant",
    title: "발로란트",
    genreNames: ["FPS"],
    rating: 4.8,
    year: 2022,
    popularity: 98,
    image: "../image/Valorant-Logo-500x281.png",
  },
  {
    id: "battleground",
    title: "배틀그라운드",
    aliases: ["BATTLEGROUND"],
    genreNames: ["FPS"],
    rating: 4.5,
    year: 2022,
    popularity: 94,
    image: "../image/BAG.jpg",
  },
  {
    id: "overwatch-2",
    title: "오버워치",
    aliases: ["Overwatch", "Overwatch 2"],
    genreNames: ["FPS", "액션"],
    rating: 4.3,
    year: 2022,
    popularity: 88,
    image: "../image/Overwatch-Logo-640x400.png",
  },
  {
    id: "genshin",
    title: "원신",
    genreNames: ["RPG"],
    rating: 4.3,
    year: 2020,
    popularity: 89,
    image: "../image/genshin.jpg",
  },
  {
    id: "fc-online",
    title: "EA SPORTS",
    genreNames: ["스포츠"],
    rating: 4.2,
    year: 2023,
    popularity: 86,
    image: "../image/FC.png",
  },
  {
    id: "forza-horizon-5",
    title: "포르자 호라이즌 5",
    genreNames: ["레이싱"],
    rating: 4.7,
    year: 2021,
    popularity: 84,
    image: "../image/FORZA_HORIZON.jpg",
  },
  {
    id: "hollow-knight",
    title: "할로우 나이트",
    genreNames: ["어드벤처", "액션"],
    rating: 4.4,
    year: 2018,
    popularity: 78,
    image: "../image/Hollow Knight.jpg",
  },
  {
    id: "subnautica",
    title: "서브노티카",
    genreNames: ["어드벤처", "시뮬레이션"],
    rating: 4.6,
    year: 2015,
    popularity: 76,
    image: "../image/SUBNAUTICA.jpg",
  },
  {
    id: "poppy-playtime",
    title: "Poppy playtime",
    genreNames: ["공포"],
    rating: 4.6,
    year: 2023,
    popularity: 92,
    image: "../image/poppy.webp",
  },
  {
    id: "league-of-legends",
    title: "리그 오브 레전드",
    aliases: ["League of Legends", "LOL"],
    genreNames: ["전략", "액션"],
    rating: 5.0,
    year: 2009,
    popularity: 100,
    image: "../image/League of lengends (1).png",
  },
  {
    id: "maplestory",
    title: "메이플스토리",
    aliases: ["MapleStory"],
    genreNames: ["RPG", "어드벤처"],
    rating: 4.4,
    year: 2003,
    popularity: 90,
    image: "../image/maple.jpg",
  },
  {
    id: "ark",
    title: "아크",
    aliases: ["ARK"],
    genreNames: ["어드벤처", "시뮬레이션"],
    rating: 4.4,
    year: 2018,
    popularity: 78,
    image: "../image/ARK.jpg",
  },
  {
    id: "minecraft",
    title: "마인크래프트",
    genreNames: ["어드벤처"],
    rating: 4.7,
    year: 2011,
    popularity: 91,
    image: "../image/minecraft.jpg",
  },
  {
    id: "stardew-valley",
    title: "스타듀 밸리",
    genreNames: ["RPG", "시뮬레이션"],
    rating: 4.8,
    year: 2016,
    popularity: 87,
    image: "../image/Starbw_VALLEY.webp",

  },
  {
    id: "tetris",
    title: "테트리스",
    genreNames: ["퍼즐"],
    rating: 4.5,
    year: 2018,
    popularity: 70,
    image: "../image/TETRIS-removebg-preview.png",
  },
];

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const resultCount = document.querySelector("#resultCount");
const gameGrid = document.querySelector("#gameGrid");
const emptyMessage = document.querySelector("#emptyMessage");
const pagination = document.querySelector("#pagination");

const perPage = 8;
let currentPage = 1;
let keyword = "";

function getAddedGames() {
  return JSON.parse(localStorage.getItem("addedGames")) || [];
}

function getGameGenreNames(game) {
  if (Array.isArray(game.genreNames)) {
    return game.genreNames;
  }

  if (game.genreNames) {
    return [game.genreNames];
  }

  return ["게임"];
}

function getSearchGames() {
  const addedGames = getAddedGames().map((game) => ({
    id: game.id,
    title: game.title,
    aliases: [],
    genreNames: getGameGenreNames(game),
    rating: Number(game.rating || 0),
    year: Number(game.year || 2024),
    popularity: Number(game.popularity || 60),
    image: game.image || "../image/search.png",
  }));

  return [...games, ...addedGames];
}

function getDetailPageUrl(gameId) {
  return `../detail/detail.html?game=${encodeURIComponent(gameId)}`;
}

function normalizeText(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function getFilteredGames() {
  const normalizedKeyword = normalizeText(keyword);
  const searchGames = getSearchGames();
  const filtered = normalizedKeyword
    ? searchGames.filter((game) => {
        const haystack = normalizeText(`${game.id} ${game.title} ${(game.aliases || []).join(" ")} ${game.genreNames.join(" ")}`);
        return haystack.includes(normalizedKeyword);
      })
    : [...searchGames];

  const sortValue = sortSelect.value;
  return filtered.sort((a, b) => {
    if (sortValue === "rating") {
      return b.rating - a.rating;
    }

    if (sortValue === "recent") {
      return b.year - a.year;
    }

    if (sortValue === "title") {
      return a.title.localeCompare(b.title, "ko");
    }

    return b.popularity - a.popularity;
  });
}

function renderGames() {
  const filteredGames = getFilteredGames();
  const totalPages = Math.max(1, Math.ceil(filteredGames.length / perPage));

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start = (currentPage - 1) * perPage;
  const pageGames = filteredGames.slice(start, start + perPage);

  resultCount.textContent = `${filteredGames.length}개`;
  emptyMessage.classList.toggle("show", filteredGames.length === 0);
  gameGrid.style.display = filteredGames.length === 0 ? "none" : "grid";

  gameGrid.innerHTML = pageGames
    .map((game) => {
      const genreBadges = game.genreNames
        .map((genreName) => `<span class="genre-badge">${genreName}</span>`)
        .join("");

      return `
        <article class="game-card" data-id="${game.id}">
          <img class="game-thumb" src="${game.image}" alt="${game.title} 이미지" onerror="this.onerror=null;this.src='../image/search.png'">
          <div class="game-info">
            <h2>${game.title}</h2>
            <div class="genre-badges">${genreBadges}</div>
            <div class="card-bottom">
              <span class="rating">${game.rating.toFixed(1)}</span>
              <span>${game.year}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  renderPagination(totalPages, filteredGames.length);
}

gameGrid.addEventListener("click", (event) => {
  const gameCard = event.target.closest(".game-card");

  if (!gameCard) {
    return;
  }

  window.location.href = getDetailPageUrl(gameCard.dataset.id);
});

function renderPagination(totalPages, resultTotal) {
  if (resultTotal === 0) {
    pagination.innerHTML = "";
    return;
  }

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

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  keyword = searchInput.value.trim();
  currentPage = 1;
  renderGames();
});

searchInput.addEventListener("input", () => {
  keyword = searchInput.value.trim();
  currentPage = 1;
  renderGames();
});

sortSelect.addEventListener("change", () => {
  currentPage = 1;
  renderGames();
});

pagination.addEventListener("click", (event) => {
  const button = event.target.closest(".page-btn");

  if (!button || button.disabled) {
    return;
  }

  const totalPages = Math.max(1, Math.ceil(getFilteredGames().length / perPage));
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

renderGames();
