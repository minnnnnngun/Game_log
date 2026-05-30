// 장르 페이지에 처음부터 보여줄 기본 게임 목록임.
const games = [
  {
    // 게임을 구분하기 위한 고유 id임.
    id: "valorant",
    // 화면에 보여줄 게임 제목임.
    title: "발로란트",
    // 필터 기능에서 사용할 장르 값임.
    genres: ["fps", "strategy"],
    // 카드에 보여줄 장르 이름임.
    genreNames: ["FPS", "전략"],
    // 평점순 정렬과 카드 표시에 사용할 점수임.
    rating: 4.8,
    // 최신순 정렬과 카드 표시에 사용할 출시연도임.
    year: 2020,
    // 인기순 정렬에 사용할 숫자임.
    popularity: 98,
    // 카드 이미지 경로임.
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

// 게임 카드들이 들어갈 영역을 HTML에서 가져옴.
const gameGrid = document.querySelector("#gameGrid");
// 현재 보이는 게임 개수를 표시할 요소를 가져옴.
const gameCount = document.querySelector("#gameCount");
// 정렬 select 박스를 가져옴.
const sortSelect = document.querySelector("#sortSelect");
// 페이지 버튼들이 들어갈 영역을 가져옴.
const pagination = document.querySelector("#pagination");
// 왼쪽 장르 필터 버튼들을 모두 가져옴.
const filterButtons = document.querySelectorAll(".genre-filter");
// 게임 추가 form을 가져옴.
const addGameForm = document.querySelector("#addGameForm");
// 게임 이름 input을 가져옴.
const addTitle = document.querySelector("#addTitle");
// 장르 선택 select를 가져옴.
const addGenre = document.querySelector("#addGenre");
// 두 번째 장르 선택 select를 가져옴.
const addGenreSecond = document.querySelector("#addGenreSecond");
// 평점 input을 가져옴.
const addRating = document.querySelector("#addRating");
// 출시연도 input을 가져옴.
const addYear = document.querySelector("#addYear");
// 이미지 경로 input을 가져옴.
const addImage = document.querySelector("#addImage");
// 삭제 확인 모달 전체 영역을 가져옴.
const deleteModal = document.querySelector("#deleteModal");
// 삭제 확인 모달 안에 게임 이름을 보여줄 요소를 가져옴.
const deleteGameName = document.querySelector("#deleteGameName");
// 삭제 확인 모달의 "네" 버튼을 가져옴.
const deleteConfirm = document.querySelector("#deleteConfirm");
// 삭제 확인 모달의 "아니오" 버튼을 가져옴.
const deleteCancel = document.querySelector("#deleteCancel");

// form에서 선택한 장르 값을 화면에 보여줄 한글 이름으로 바꿔주는 객체임.
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

// 예전 genre 하나짜리 데이터도 배열처럼 쓰게 맞춰줌.
function getGameGenres(game) {
  return game.genres || [game.genre];
}

// 카드에 보여줄 장르 이름들도 배열로 맞춰줌.
function getGameGenreNames(game) {
  return game.genreNames || [game.genreName];
}

// 장르 배열에서 비어 있거나 중복인 값은 빼줌.
function getUniqueGenres(genres) {
  return [...new Set(genres.filter(Boolean))];
}

// 한 페이지에 보여줄 게임 카드 개수임.
const perPage = 9;
// 현재 선택된 장르임. 처음에는 전체 게임을 보여주기 위해 all로 둠.
let activeGenre = "all";
// 현재 페이지 번호임. 처음에는 1페이지부터 시작함.
let currentPage = 1;
// 지금 삭제하려고 선택한 게임 id를 잠시 저장하는 변수임.
let selectedDeleteGameId = null;

// localStorage에서 사용자가 추가한 게임 목록을 가져오는 함수임.
function getAddedGames() {
  // localStorage에는 문자열로 저장되기 때문에 JSON.parse로 배열로 바꿈.
  return JSON.parse(localStorage.getItem("addedGames")) || [];
}

// 사용자가 추가한 게임 목록을 localStorage에 저장하는 함수임.
function setAddedGames(addedGames) {
  // 배열은 바로 저장할 수 없어서 JSON 문자열로 바꿔 저장함.
  localStorage.setItem("addedGames", JSON.stringify(addedGames));
}

// 새로고침 후에도 사용자가 추가한 게임을 다시 불러오는 함수임.
function loadAddedGames() {
  // 저장된 게임을 가져오고, 혹시 id나 isCustom이 빠진 데이터가 있으면 보정함.
  const addedGames = getAddedGames().map((game) => ({
    // 기존 게임 정보는 그대로 복사함.
    ...game,
    // id가 없으면 새 id를 만들어 넣음.
    id: game.id || createGameId(game.title),
    // 예전 추가 게임도 장르 배열을 갖게 맞춰줌.
    genres: getGameGenres(game),
    // 예전 추가 게임도 장르 이름 배열을 갖게 맞춰줌.
    genreNames: getGameGenreNames(game),
    // 사용자가 추가한 게임이라는 표시를 넣음.
    isCustom: true,
  }));

  // 보정된 데이터를 다시 localStorage에 저장함.
  setAddedGames(addedGames);
  // 기본 게임 목록 뒤에 사용자가 추가한 게임들을 붙임.
  games.push(...addedGames);
}

// 이미지 경로 input 값을 검사해서 실제 사용할 이미지 경로를 정하는 함수임.
function getImagePath(imagePath) {
  // 앞뒤 공백을 제거함.
  const trimmedPath = imagePath.trim();

  // 이미지 경로를 비워두면 기본 이미지를 사용함.
  if (trimmedPath === "") {
    return "../image/search.png";
  }

  // 직접 입력한 이미지 경로가 있으면 그 경로를 사용함.
  return trimmedPath;
}

// 사용자가 추가한 게임에 붙일 고유 id를 만드는 함수임.
function createGameId(title) {
  // 현재 시간과 게임 제목을 합쳐서 겹칠 가능성이 낮은 id를 만듦.
  return `custom-${Date.now()}-${title.replace(/\s+/g, "-")}`;
}

// 현재 필터와 정렬 조건에 맞는 게임 목록을 만드는 함수임.
function getVisibleGames() {
  // 전체 장르이면 모든 게임을 복사하고, 아니면 선택한 장르만 골라냄.
  const filtered =
    activeGenre === "all"
      ? [...games]
      : games.filter((game) => getGameGenres(game).includes(activeGenre));

  // 현재 선택된 정렬 기준을 가져옴.
  const sortValue = sortSelect.value;

  // 정렬 기준에 맞게 게임 배열을 정렬해서 돌려줌.
  return filtered.sort((a, b) => {
    // 최신순이면 출시연도가 큰 게임이 먼저 오게 함.
    if (sortValue === "recent") {
      return b.year - a.year;
    }

    // 평점순이면 평점이 높은 게임이 먼저 오게 함.
    if (sortValue === "rating") {
      return b.rating - a.rating;
    }

    // 기본값인 인기순이면 popularity 숫자가 큰 게임이 먼저 오게 함.
    return b.popularity - a.popularity;
  });
}

// 사용자가 입력한 새 게임을 추가하는 함수임.
function addGame(game) {
  // localStorage에 저장된 추가 게임 목록을 가져옴.
  const addedGames = getAddedGames();

  // 새 게임을 추가 게임 목록에 넣음.
  addedGames.push(game);
  // localStorage에 새 목록을 저장함.
  setAddedGames(addedGames);
  // 현재 화면에서 사용하는 games 배열에도 새 게임을 넣음.
  games.push(game);

  // 추가한 게임의 첫 번째 장르로 필터를 자동 이동함.
  activeGenre = getGameGenres(game)[0];
  // 첫 페이지부터 보여주도록 페이지를 초기화함.
  currentPage = 1;
  // 방금 추가한 게임이 잘 보이도록 최신순으로 바꿈.
  sortSelect.value = "recent";

  // 장르 버튼 중 추가한 게임의 장르 버튼만 active 상태로 바꿈.
  filterButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.genre === activeGenre);
  });

  // 변경된 게임 목록을 화면에 다시 그림.
  renderGames();
}

// 사용자가 추가한 게임을 삭제하는 함수임.
function deleteAddedGame(gameId) {
  // localStorage 목록에서 삭제할 게임 id와 다른 게임만 남깁니다.
  const addedGames = getAddedGames().filter((game) => game.id !== gameId);
  // 현재 games 배열에서 삭제할 게임의 위치를 찾음.
  const gameIndex = games.findIndex((game) => game.id === gameId);

  // 삭제할 게임을 찾았다면 games 배열에서 제거함.
  if (gameIndex !== -1) {
    games.splice(gameIndex, 1);
  }

  // 삭제 후 남은 추가 게임 목록을 localStorage에 저장함.
  setAddedGames(addedGames);
  // 삭제 결과를 화면에 다시 반영함.
  renderGames();
}

// 삭제 확인 모달을 여는 함수임.
function openDeleteModal(gameId, gameTitle) {
  // 삭제할 게임 id를 저장함.
  selectedDeleteGameId = gameId;
  // 모달에 삭제할 게임 이름을 표시함.
  deleteGameName.textContent = gameTitle;
  // 모달에 open 클래스를 붙여 화면에 보이게 함.
  deleteModal.classList.add("open");
  // 모달이 보이는 상태라고 접근성 속성을 바꿈.
  deleteModal.setAttribute("aria-hidden", "false");
}

// 삭제 확인 모달을 닫는 함수임.
function closeDeleteModal() {
  // 모달에서 open 클래스를 제거해서 숨김.
  deleteModal.classList.remove("open");
  // 모달이 숨겨진 상태라고 접근성 속성을 바꿈.
  deleteModal.setAttribute("aria-hidden", "true");
  // 선택했던 삭제 게임 id를 초기화함.
  selectedDeleteGameId = null;
}

// 게임 카드와 페이지네이션을 화면에 그리는 함수임.
function renderGames() {
  // 현재 필터와 정렬 조건에 맞는 게임 목록을 가져옴.
  const visibleGames = getVisibleGames();
  // 전체 페이지 수를 계산함. 최소 1페이지는 나오게 함.
  const totalPages = Math.max(1, Math.ceil(visibleGames.length / perPage));

  // 현재 페이지가 전체 페이지보다 커졌다면 마지막 페이지로 맞춤.
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // 현재 페이지에서 시작할 배열 위치를 계산함.
  const start = (currentPage - 1) * perPage;
  // 현재 페이지에 보여줄 게임만 잘라냄.
  const pageGames = visibleGames.slice(start, start + perPage);

  // 화면 위쪽에 총 게임 개수를 표시함.
  gameCount.textContent = `총 ${visibleGames.length}개`;
  // pageGames 배열을 HTML 문자열로 바꿔 gameGrid 안에 넣음.
  gameGrid.innerHTML = pageGames
    .map((game) => {
      const genreBadges = getGameGenreNames(game)
        .map((genreName) => `<span class="genre-badge">${genreName}</span>`)
        .join("");

      return `
        <article class="game-card" data-id="${game.id}">
            <img class="game-thumb" src="${game.image}" alt="${game.title} 이미지">
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="genre-badges">${genreBadges}</div>
                <div class="card-bottom">
                    <span class="rating">${game.rating.toFixed(1)}</span>
                    <span>${game.year}</span>
                </div>
                ${game.isCustom ? `<button type="button" class="delete-game-btn" data-id="${game.id}">삭제</button>` : ""}
            </div>
        </article>
    `;
    })
    .join("");

  // 게임 카드 아래 페이지 버튼도 다시 그림.
  renderPagination(totalPages);
}

// 페이지 번호 버튼들을 화면에 그리는 함수임.
function renderPagination(totalPages) {
  // 전체 페이지 수만큼 [1, 2, 3...] 배열을 만듦.
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  // 각 페이지 번호를 button HTML로 바꿈.
  const pageButtons = pages
    .map(
      (page) => `
        <button type="button" class="page-btn ${page === currentPage ? "active" : ""}" data-page="${page}">
            ${page}
        </button>
    `,
    )
    .join("");

  // 이전 버튼, 페이지 번호 버튼, 다음 버튼을 pagination 영역에 넣음.
  pagination.innerHTML = `
        <button type="button" class="page-btn" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>‹</button>
        ${pageButtons}
        ${totalPages > 5 ? '<span class="page-dots">...</span>' : ""}
        <button type="button" class="page-btn" data-page="next" ${currentPage === totalPages ? "disabled" : ""}>›</button>
    `;
}

// 장르 필터 버튼들에 클릭 이벤트를 연결함.
filterButtons.forEach((button) => {
  // 각각의 장르 버튼을 클릭했을 때 실행됨.
  button.addEventListener("click", () => {
    // 모든 장르 버튼에서 active 클래스를 제거함.
    filterButtons.forEach((item) => item.classList.remove("active"));
    // 클릭한 버튼에만 active 클래스를 추가함.
    button.classList.add("active");
    // 현재 선택된 장르를 클릭한 버튼의 data-genre 값으로 바꿈.
    activeGenre = button.dataset.genre;
    // 장르가 바뀌면 1페이지부터 보여줌.
    currentPage = 1;
    // 바뀐 조건에 맞게 게임 목록을 다시 그림.
    renderGames();
  });
});

// 정렬 select 값이 바뀌었을 때 실행됨.
sortSelect.addEventListener("change", () => {
  // 정렬이 바뀌면 1페이지부터 보여줌.
  currentPage = 1;
  // 바뀐 정렬 기준으로 게임 목록을 다시 그림.
  renderGames();
});

// 게임 추가 form을 제출했을 때 실행됨.
addGameForm.addEventListener("submit", (event) => {
  // form 제출 시 페이지가 새로고침되는 기본 동작을 막음.
  event.preventDefault();

  // 사용자가 선택한 장르 값들을 가져옴.
  const genres = getUniqueGenres([addGenre.value, addGenreSecond.value]);
  // input 값들을 모아 새 게임 객체를 만듦.
  const game = {
    // 사용자가 입력한 게임 제목임.
    title: addTitle.value.trim(),
    // 새 게임에 고유 id를 붙임.
    id: createGameId(addTitle.value.trim()),
    // 필터에서 사용할 장르 값들임.
    genres,
    // 카드에 보여줄 한글 장르 이름들임.
    genreNames: genres.map((genre) => genreNames[genre]),
    // 평점 input 값을 숫자로 바꿈.
    rating: Number(addRating.value),
    // 출시연도 input 값을 숫자로 바꿈.
    year: Number(addYear.value),
    // 사용자가 추가한 게임은 기본 인기 점수를 60으로 둠.
    popularity: 60,
    // 이미지 경로를 검사해서 비어 있으면 기본 이미지를 넣음.
    image: getImagePath(addImage.value),
    // 이 게임은 사용자가 추가한 게임이라는 표시임.
    isCustom: true,
  };

  // 완성된 게임 객체를 목록에 추가함.
  addGame(game);
  // 입력이 끝난 form을 비움.
  addGameForm.reset();
});

// 페이지네이션 영역을 클릭했을 때 실행됨.
pagination.addEventListener("click", (event) => {
  // 클릭한 대상에서 가장 가까운 페이지 버튼을 찾음.
  const button = event.target.closest(".page-btn");

  // 버튼이 아니거나 disabled 상태면 아무것도 안 함.
  if (!button || button.disabled) {
    return;
  }

  // 현재 조건에 맞는 게임 목록을 가져옴.
  const visibleGames = getVisibleGames();
  // 현재 조건에서 전체 페이지 수를 계산함.
  const totalPages = Math.max(1, Math.ceil(visibleGames.length / perPage));
  // 클릭한 버튼의 data-page 값을 가져옴.
  const page = button.dataset.page;

  // 이전 버튼이면 현재 페이지를 1 줄임.
  if (page === "prev") {
    currentPage -= 1;
  } else if (page === "next") {
    // 다음 버튼이면 현재 페이지를 1 늘림.
    currentPage += 1;
  } else {
    // 숫자 버튼이면 그 숫자로 현재 페이지를 바꿈.
    currentPage = Number(page);
  }

  // 현재 페이지가 1보다 작거나 마지막 페이지보다 커지지 않게 제한함.
  currentPage = Math.min(Math.max(currentPage, 1), totalPages);
  // 바뀐 페이지에 맞게 게임 목록을 다시 그림.
  renderGames();
});

// 게임 카드 영역에서 삭제 버튼 클릭을 감지함.
gameGrid.addEventListener("click", (event) => {
  // 클릭한 대상에서 가장 가까운 삭제 버튼을 찾음.
  const deleteButton = event.target.closest(".delete-game-btn");
  // 클릭한 대상에서 가장 가까운 게임 카드를 찾음.
  const gameCard = event.target.closest(".game-card");

  // 게임 카드 바깥을 클릭했다면 아무것도 안 함.
  if (!gameCard) {
    return;
  }

  // 삭제 버튼을 클릭했다면 삭제 확인 모달을 엶.
  if (deleteButton) {
    // 삭제할 게임 정보를 찾음.
    const game = games.find((item) => item.id === deleteButton.dataset.id);

    // 게임 정보가 있으면 확인 모달을 엶.
    if (game) {
      openDeleteModal(game.id, game.title);
    }

    // 삭제 버튼 클릭 이후 아래 카드 선택 코드는 실행안 함.
    return;
  }

  // 기본 게임 카드는 삭제 버튼이 없으므로 선택 표시만 모두 지움.
  if (!gameCard.querySelector(".delete-game-btn")) {
    gameGrid
      .querySelectorAll(".game-card")
      .forEach((card) => card.classList.remove("show-delete"));
    return;
  }

  // 다른 카드의 삭제 버튼은 숨김.
  gameGrid.querySelectorAll(".game-card").forEach((card) => {
    // 지금 클릭한 카드가 아닌 카드에서 show-delete 클래스를 제거함.
    if (card !== gameCard) {
      card.classList.remove("show-delete");
    }
  });

  // 클릭한 추가 게임 카드의 삭제 버튼 표시 상태를 켜거나 끕니다.
  gameCard.classList.toggle("show-delete");
});

// 삭제 확인 모달에서 "네" 버튼을 클릭했을 때 실행됨.
deleteConfirm.addEventListener("click", () => {
  // 삭제할 게임 id가 있을 때만 삭제함.
  if (selectedDeleteGameId) {
    deleteAddedGame(selectedDeleteGameId);
  }

  // 삭제 후 모달을 닫음.
  closeDeleteModal();
});

// 삭제 확인 모달에서 "아니오" 버튼을 클릭하면 모달만 닫음.
deleteCancel.addEventListener("click", closeDeleteModal);

// 삭제 모달의 바깥 어두운 배경을 클릭하면 모달을 닫음.
deleteModal.addEventListener("click", (event) => {
  // 클릭한 대상이 모달 배경일 때만 닫음.
  if (event.target === deleteModal) {
    closeDeleteModal();
  }
});

// 키보드에서 Escape를 누르면 삭제 확인 모달을 닫음.
document.addEventListener("keydown", (event) => {
  // Escape 키이고 삭제 모달이 열려 있으면 닫음.
  if (event.key === "Escape" && deleteModal.classList.contains("open")) {
    closeDeleteModal();
  }
});

// 페이지가 처음 열릴 때 localStorage에 저장된 추가 게임을 불러옴.
loadAddedGames();
// 모든 준비가 끝나면 게임 목록을 처음으로 화면에 그림.
renderGames();
