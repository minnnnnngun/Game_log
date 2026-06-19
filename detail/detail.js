// 게임 상세보기 화면에 맞는 게임 정보를 찾아서 보여주는 자바스크립트 파일입니다.
const defaultGames = [
  {
    id: "valorant",
    title: "발로란트",
    aliases: ["Valorant"],
    genreNames: ["FPS", "전략"],
    rating: 4.8,
    year: 2020,
    popularity: 98,
    image: "../image/Valorant-Logo-500x281.png",
    description: "정확한 조준과 스킬 활용이 함께 중요한 5 대 5 전술 슈팅 게임입니다.",
  },
  {
    id: "battleground",
    title: "배틀그라운드",
    aliases: ["BATTLEGROUND"],
    genreNames: ["FPS", "액션", "배틀로얄"],
    rating: 4.5,
    year: 2017,
    popularity: 94,
    image: "../image/BAG.jpg",
    description: "넓은 전장에서 장비를 모으고 마지막까지 살아남는 배틀로얄 게임입니다.",
  },
  {
    id: "league-of-legends",
    title: "리그 오브 레전드",
    aliases: ["League of Legends", "LOL"],
    genreNames: ["MOBA", "전략", "액션"],
    rating: 5.0,
    year: 2009,
    popularity: 100,
    image: "../image/League of lengends (1).png",
    description: "챔피언 조합, 라인전, 한타 운영이 맞물리는 대표적인 5 대 5 전략 게임입니다.",
  },
  {
    id: "fc-online",
    title: "FC 온라인",
    aliases: ["FC Online", "EA SPORTS", "EA SPORTS FC 24"],
    genreNames: ["스포츠", "시뮬레이션"],
    rating: 4.2,
    year: 2023,
    popularity: 86,
    image: "../image/FC.png",
    description: "선수단을 꾸리고 실시간 축구 경기를 즐기는 온라인 스포츠 게임입니다.",
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
    description: "캐릭터 성장과 사냥, 보스 도전의 재미가 오래 이어지는 2D MMORPG입니다.",
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
    description: "각기 다른 영웅의 능력을 조합해 목표를 차지하는 팀 기반 슈팅 게임입니다.",
  },
  {
    id: "hollow-knight",
    title: "할로우 나이트",
    aliases: ["Hollow Knight"],
    genreNames: ["어드벤처", "액션"],
    rating: 4.8,
    year: 2017,
    popularity: 93,
    image: "../image/Hollow Knight.jpg",
    description: "깊은 지하 왕국을 탐험하며 전투와 발견의 긴장감을 즐기는 액션 어드벤처입니다.",
  },
  {
    id: "genshin",
    title: "원신",
    aliases: ["Genshin Impact"],
    genreNames: ["어드벤처", "RPG"],
    rating: 4.3,
    year: 2020,
    popularity: 89,
    image: "../image/genshin.jpg",
    description: "넓은 오픈월드를 탐험하고 원소 조합 전투를 즐기는 액션 RPG입니다.",
  },
  {
    id: "forza-horizon-5",
    title: "포르자 호라이즌 5",
    aliases: ["Forza Horizon 5"],
    genreNames: ["레이싱", "스포츠"],
    rating: 4.7,
    year: 2021,
    popularity: 84,
    image: "../image/FORZA_HORIZON.jpg",
    description: "화려한 오픈월드 도로를 달리며 다양한 레이스를 즐기는 레이싱 게임입니다.",
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
    description: "공룡과 생존, 건설 요소가 섞인 오픈월드 생존 어드벤처 게임입니다.",
  },
  {
    id: "subnautica",
    title: "서브노티카",
    aliases: ["SUBNAUTICA"],
    genreNames: ["어드벤처", "공포"],
    rating: 4.6,
    year: 2015,
    popularity: 76,
    image: "../image/SUBNAUTICA.jpg",
    description: "낯선 바다 행성을 탐험하며 자원을 모으고 생존하는 해양 어드벤처입니다.",
  },
  {
    id: "minecraft",
    title: "마인크래프트",
    aliases: ["Minecraft"],
    genreNames: ["시뮬레이션", "어드벤처"],
    rating: 4.7,
    year: 2011,
    popularity: 92,
    image: "../image/minecraft.jpg",
    description: "블록으로 세상을 만들고 탐험하며 자유롭게 목표를 정하는 샌드박스 게임입니다.",
  },
  {
    id: "stardew-valley",
    title: "스타듀 밸리",
    aliases: ["Stardew Valley"],
    genreNames: ["RPG", "시뮬레이션"],
    rating: 4.8,
    year: 2016,
    popularity: 87,
    image: "../image/Starbw_VALLEY.webp",
    description: "농장 생활, 마을 교류, 채집과 낚시를 차분히 이어가는 생활 시뮬레이션 RPG입니다.",
  },
  {
    id: "poppy-playtime",
    title: "파피 플레이타임",
    aliases: ["Poppy playtime", "Poppy Playtime"],
    genreNames: ["공포", "퍼즐"],
    rating: 4.6,
    year: 2021,
    popularity: 74,
    image: "../image/poppy.webp",
    description: "버려진 장난감 공장에서 퍼즐을 풀며 긴장감 있는 추격을 경험하는 공포 게임입니다.",
  },
  {
    id: "tetris",
    title: "테트리스",
    aliases: ["Tetris"],
    genreNames: ["퍼즐", "전략"],
    rating: 4.5,
    year: 2018,
    popularity: 70,
    image: "../image/TETRIS-removebg-preview.png",
    description: "떨어지는 블록을 맞춰 줄을 지우는 규칙이 단순하고 깊은 퍼즐 게임입니다.",
  },
];

const detailPage = document.querySelector("#detailPage");
const emptyState = document.querySelector("#emptyState");
const gameImage = document.querySelector("#gameImage");
const gameGenres = document.querySelector("#gameGenres");
const gameTitle = document.querySelector("#gameTitle");
const gameDescription = document.querySelector("#gameDescription");
const gameRating = document.querySelector("#gameRating");
const gameYear = document.querySelector("#gameYear");
const gamePopularity = document.querySelector("#gamePopularity");
const gameType = document.querySelector("#gameType");
const favoriteAddBtn = document.querySelector("#favoriteAddBtn");
const DEFAULT_IMAGE_PATH = "../image/search.png";
let currentGame = null;

function normalizeName(name) {
  return String(name).toLowerCase().replace(/\s+/g, "").replace(/-/g, "");
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

function getSavedGames() {
  return JSON.parse(localStorage.getItem("favoriteGames")) || [];
}

function setSavedGames(games) {
  localStorage.setItem("favoriteGames", JSON.stringify(games));
}

function getSavedGameName(savedGame) {
  return typeof savedGame === "string" ? savedGame : savedGame.name;
}

function isFavoriteGame(gameTitle) {
  return getSavedGames().some((savedGame) => normalizeName(getSavedGameName(savedGame)) === normalizeName(gameTitle));
}

function updateFavoriteButton(gameTitle) {
  if (isFavoriteGame(gameTitle)) {
    favoriteAddBtn.textContent = "즐겨찾기 저장됨";
    favoriteAddBtn.classList.add("saved");
    return;
  }

  favoriteAddBtn.textContent = "즐겨찾기 추가";
  favoriteAddBtn.classList.remove("saved");
}

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

function getAllGames() {
  const addedGames = getAddedGames().map((game) => ({
    ...game,
    aliases: [],
    genreNames: getGameGenreNames(game),
    image: game.image || DEFAULT_IMAGE_PATH,
    description: game.description || "사용자가 직접 추가한 게임입니다.",
    popularity: game.popularity || 60,
    isCustom: true,
  }));

  return [...defaultGames, ...addedGames];
}

function findGame(gameKey) {
  const normalizedKey = normalizeName(gameKey);

  return getAllGames().find((game) => {
    const names = [game.id, game.title, ...(game.aliases || [])];
    return names.some((name) => normalizeName(name) === normalizedKey);
  });
}

function renderGame(game) {
  currentGame = game;
  gameImage.src = game.image || DEFAULT_IMAGE_PATH;
  gameImage.alt = `${game.title} 이미지`;
  gameImage.onerror = () => {
    gameImage.onerror = null;
    gameImage.src = DEFAULT_IMAGE_PATH;
  };
  gameGenres.innerHTML = getGameGenreNames(game)
    .map((genreName) => `<span class="genre-badge">${genreName}</span>`)
    .join("");
  gameTitle.textContent = game.title;
  gameDescription.textContent = game.description;
  gameRating.textContent = Number(game.rating || 0).toFixed(1);
  gameYear.textContent = game.year || "미정";
  gamePopularity.textContent = game.popularity || 0;
  gameType.textContent = game.isCustom ? "추가한 게임" : "기본 게임";
  updateFavoriteButton(game.title);
  document.title = `GameLog - ${game.title}`;
}

function showEmptyState() {
  detailPage.style.display = "none";
  emptyState.classList.add("show");
}

const gameKey = new URLSearchParams(window.location.search).get("game");
const game = gameKey ? findGame(gameKey) : null;

if (game) {
  renderGame(game);
} else {
  showEmptyState();
}

favoriteAddBtn.addEventListener("click", () => {
  if (!currentGame || !requireLogin()) {
    return;
  }

  const savedGames = getSavedGames();

  if (isFavoriteGame(currentGame.title)) {
    setSavedGames(savedGames.filter((savedGame) => normalizeName(getSavedGameName(savedGame)) !== normalizeName(currentGame.title)));
    updateFavoriteButton(currentGame.title);
    return;
  }

  savedGames.push({
    name: currentGame.title,
    genre: getGameGenreNames(currentGame)[0],
    rating: Number(currentGame.rating || 0),
    year: currentGame.year || 2024,
    imageSrc: currentGame.image || DEFAULT_IMAGE_PATH,
  });
  setSavedGames(savedGames);
  updateFavoriteButton(currentGame.title);
});
