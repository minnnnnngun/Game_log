// 검색 화면을 움직이게 만드는 자바스크립트 파일입니다.
// 검색어 입력, 정렬, 페이지 이동을 담당합니다.

// 검색 화면에 보여줄 기본 게임 데이터입니다.
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
    genreNames: ["FPS"],
    rating: 4.5,
    year: 2022,
    popularity: 94,
    image: "../image/BAG.jpg",
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
    genreNames: ["전략", "액션"],
    rating: 5.0,
    year: 2009,
    popularity: 100,
    image: "../image/League of lengends (1).png",
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

// 검색 폼, 정렬, 결과 영역처럼 자주 쓰는 화면 요소를 가져옵니다.
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const resultCount = document.querySelector("#resultCount");
const gameGrid = document.querySelector("#gameGrid");
const emptyMessage = document.querySelector("#emptyMessage");
const pagination = document.querySelector("#pagination");

// 한 페이지에 표시할 카드 수와 현재 검색 상태를 저장합니다.
const perPage = 8;
let currentPage = 1;
let keyword = "";

// 게임 id를 상세보기 페이지 주소로 바꿉니다.
function getDetailPageUrl(gameId) {
  return `../detail/detail.html?game=${encodeURIComponent(gameId)}`;
}

// 검색 비교가 쉽도록 대소문자와 공백 차이를 줄입니다.
function normalizeText(value) {
  return value.toLowerCase().replace(/\s+/g, "");
}

// 현재 검색어와 정렬 기준에 맞는 게임 목록을 만듭니다.
function getFilteredGames() {
  const normalizedKeyword = normalizeText(keyword);
  const filtered = normalizedKeyword
    ? games.filter((game) => {
        const haystack = normalizeText(`${game.title} ${game.genreNames.join(" ")}`);
        return haystack.includes(normalizedKeyword);
      })
    : [...games];

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

// 필터링된 게임을 카드로 그리고 결과 개수, 빈 상태, 페이지 버튼을 갱신합니다.
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

// 검색 결과 카드를 누르면 해당 게임의 상세보기 페이지로 이동합니다.
gameGrid.addEventListener("click", (event) => {
  const gameCard = event.target.closest(".game-card");

  if (!gameCard) {
    return;
  }

  window.location.href = getDetailPageUrl(gameCard.dataset.id);
});

// 현재 페이지 위치에 맞춰 이전/다음 버튼과 숫자 버튼을 만듭니다.
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

// 검색 버튼을 눌렀을 때 입력값으로 결과를 다시 그립니다.
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  keyword = searchInput.value.trim();
  currentPage = 1;
  renderGames();
});

// 입력 중에도 바로 검색 결과가 바뀌게 합니다.
searchInput.addEventListener("input", () => {
  keyword = searchInput.value.trim();
  currentPage = 1;
  renderGames();
});

// 정렬 기준을 바꾸면 첫 페이지부터 다시 보여줍니다.
sortSelect.addEventListener("change", () => {
  currentPage = 1;
  renderGames();
});

// 페이지 번호, 이전, 다음 버튼 클릭을 처리합니다.
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

// 페이지가 처음 열렸을 때 전체 게임 목록을 보여줍니다.
renderGames();
