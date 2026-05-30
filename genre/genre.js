// 장르 페이지에 처음부터 보여줄 기본 게임 목록입니다.
const games = [
    {
        // 게임을 구분하기 위한 고유 id입니다.
        id: "valorant",
        // 화면에 보여줄 게임 제목입니다.
        title: "발로란트",
        // 필터 기능에서 사용할 장르 값입니다.
        genre: "fps",
        // 카드에 보여줄 장르 이름입니다.
        genreName: "FPS",
        // 평점순 정렬과 카드 표시에 사용할 점수입니다.
        rating: 4.8,
        // 최신순 정렬과 카드 표시에 사용할 출시연도입니다.
        year: 2020,
        // 인기순 정렬에 사용할 숫자입니다.
        popularity: 98,
        // 카드 이미지 경로입니다.
        image: "../image/Valorant-Logo-500x281.png",
    },
    {
        id: "battleground",
        title: "배틀그라운드",
        genre: "fps",
        genreName: "FPS",
        rating: 4.5,
        year: 2017,
        popularity: 94,
        image: "../image/BAG.jpg",
    },
    {
        id: "league-of-legends",
        title: "리그 오브 레전드",
        genre: "strategy",
        genreName: "전략",
        rating: 5.0,
        year: 2009,
        popularity: 100,
        image: "../image/League of lengends (1).png",
    },
    {
        id: "fc-online",
        title: "FC 온라인",
        genre: "sports",
        genreName: "스포츠",
        rating: 4.2,
        year: 2023,
        popularity: 86,
        image: "../image/FC.png",
    },
    {
        id: "maplestory",
        title: "메이플스토리",
        genre: "rpg",
        genreName: "RPG",
        rating: 4.4,
        year: 2003,
        popularity: 90,
        image: "../image/maple.jpg",
    },
    {
        id: "overwatch-2",
        title: "오버워치 2",
        genre: "fps",
        genreName: "FPS",
        rating: 4.3,
        year: 2022,
        popularity: 88,
        image: "../image/overwatch.png",
    },
    {
        id: "elden-ring",
        title: "엘든 링",
        genre: "rpg",
        genreName: "RPG",
        rating: 4.8,
        year: 2022,
        popularity: 93,
        image: "../image/angry.png",
    },
    {
        id: "genshin",
        title: "원신",
        genre: "adventure",
        genreName: "어드벤처",
        rating: 4.3,
        year: 2020,
        popularity: 89,
        image: "../image/cutemin.png",
    },
    {
        id: "forza-horizon-5",
        title: "포르자 호라이즌 5",
        genre: "racing",
        genreName: "레이싱",
        rating: 4.7,
        year: 2021,
        popularity: 84,
        image: "../image/FC.png",
    },
    {
        id: "tomb-raider",
        title: "툼 레이더",
        genre: "action",
        genreName: "액션",
        rating: 4.4,
        year: 2018,
        popularity: 78,
        image: "../image/mingeon.png",
    },
    {
        id: "cities-skylines",
        title: "시티즈: 스카이라인",
        genre: "simulation",
        genreName: "시뮬레이션",
        rating: 4.6,
        year: 2015,
        popularity: 76,
        image: "../image/search.png",
    },
    {
        id: "little-nightmares",
        title: "리틀 나이트메어",
        genre: "horror",
        genreName: "공포",
        rating: 4.6,
        year: 2021,
        popularity: 74,
        image: "../image/profile.png",
    },
    {
        id: "tetris-effect",
        title: "테트리스 이펙트",
        genre: "puzzle",
        genreName: "퍼즐",
        rating: 4.5,
        year: 2018,
        popularity: 70,
        image: "../image/search.png",
    },
];

// 게임 카드들이 들어갈 영역을 HTML에서 가져옵니다.
const gameGrid = document.querySelector("#gameGrid");
// 현재 보이는 게임 개수를 표시할 요소를 가져옵니다.
const gameCount = document.querySelector("#gameCount");
// 정렬 select 박스를 가져옵니다.
const sortSelect = document.querySelector("#sortSelect");
// 페이지 버튼들이 들어갈 영역을 가져옵니다.
const pagination = document.querySelector("#pagination");
// 왼쪽 장르 필터 버튼들을 모두 가져옵니다.
const filterButtons = document.querySelectorAll(".genre-filter");
// 게임 추가 form을 가져옵니다.
const addGameForm = document.querySelector("#addGameForm");
// 게임 이름 input을 가져옵니다.
const addTitle = document.querySelector("#addTitle");
// 장르 선택 select를 가져옵니다.
const addGenre = document.querySelector("#addGenre");
// 평점 input을 가져옵니다.
const addRating = document.querySelector("#addRating");
// 출시연도 input을 가져옵니다.
const addYear = document.querySelector("#addYear");
// 이미지 경로 input을 가져옵니다.
const addImage = document.querySelector("#addImage");
// 삭제 확인 모달 전체 영역을 가져옵니다.
const deleteModal = document.querySelector("#deleteModal");
// 삭제 확인 모달 안에 게임 이름을 보여줄 요소를 가져옵니다.
const deleteGameName = document.querySelector("#deleteGameName");
// 삭제 확인 모달의 "네" 버튼을 가져옵니다.
const deleteConfirm = document.querySelector("#deleteConfirm");
// 삭제 확인 모달의 "아니오" 버튼을 가져옵니다.
const deleteCancel = document.querySelector("#deleteCancel");

// form에서 선택한 장르 값을 화면에 보여줄 한글 이름으로 바꿔주는 객체입니다.
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

// 한 페이지에 보여줄 게임 카드 개수입니다.
const perPage = 8;
// 현재 선택된 장르입니다. 처음에는 전체 게임을 보여주기 위해 all로 둡니다.
let activeGenre = "all";
// 현재 페이지 번호입니다. 처음에는 1페이지부터 시작합니다.
let currentPage = 1;
// 지금 삭제하려고 선택한 게임 id를 잠시 저장하는 변수입니다.
let selectedDeleteGameId = null;

// localStorage에서 사용자가 추가한 게임 목록을 가져오는 함수입니다.
function getAddedGames() {
    // localStorage에는 문자열로 저장되기 때문에 JSON.parse로 배열로 바꿉니다.
    return JSON.parse(localStorage.getItem("addedGames")) || [];
}

// 사용자가 추가한 게임 목록을 localStorage에 저장하는 함수입니다.
function setAddedGames(addedGames) {
    // 배열은 바로 저장할 수 없어서 JSON 문자열로 바꿔 저장합니다.
    localStorage.setItem("addedGames", JSON.stringify(addedGames));
}

// 새로고침 후에도 사용자가 추가한 게임을 다시 불러오는 함수입니다.
function loadAddedGames() {
    // 저장된 게임을 가져오고, 혹시 id나 isCustom이 빠진 데이터가 있으면 보정합니다.
    const addedGames = getAddedGames().map((game) => ({
        // 기존 게임 정보는 그대로 복사합니다.
        ...game,
        // id가 없으면 새 id를 만들어 넣습니다.
        id: game.id || createGameId(game.title),
        // 사용자가 추가한 게임이라는 표시를 넣습니다.
        isCustom: true,
    }));

    // 보정된 데이터를 다시 localStorage에 저장합니다.
    setAddedGames(addedGames);
    // 기본 게임 목록 뒤에 사용자가 추가한 게임들을 붙입니다.
    games.push(...addedGames);
}

// 이미지 경로 input 값을 검사해서 실제 사용할 이미지 경로를 정하는 함수입니다.
function getImagePath(imagePath) {
    // 앞뒤 공백을 제거합니다.
    const trimmedPath = imagePath.trim();

    // 이미지 경로를 비워두면 기본 이미지를 사용합니다.
    if (trimmedPath === "") {
        return "../image/search.png";
    }

    // 직접 입력한 이미지 경로가 있으면 그 경로를 사용합니다.
    return trimmedPath;
}

// 사용자가 추가한 게임에 붙일 고유 id를 만드는 함수입니다.
function createGameId(title) {
    // 현재 시간과 게임 제목을 합쳐서 겹칠 가능성이 낮은 id를 만듭니다.
    return `custom-${Date.now()}-${title.replace(/\s+/g, "-")}`;
}

// 현재 필터와 정렬 조건에 맞는 게임 목록을 만드는 함수입니다.
function getVisibleGames() {
    // 전체 장르이면 모든 게임을 복사하고, 아니면 선택한 장르만 골라냅니다.
    const filtered = activeGenre === "all"
        ? [...games]
        : games.filter((game) => game.genre === activeGenre);

    // 현재 선택된 정렬 기준을 가져옵니다.
    const sortValue = sortSelect.value;

    // 정렬 기준에 맞게 게임 배열을 정렬해서 돌려줍니다.
    return filtered.sort((a, b) => {
        // 최신순이면 출시연도가 큰 게임이 먼저 오게 합니다.
        if (sortValue === "recent") {
            return b.year - a.year;
        }

        // 평점순이면 평점이 높은 게임이 먼저 오게 합니다.
        if (sortValue === "rating") {
            return b.rating - a.rating;
        }

        // 기본값인 인기순이면 popularity 숫자가 큰 게임이 먼저 오게 합니다.
        return b.popularity - a.popularity;
    });
}

// 사용자가 입력한 새 게임을 추가하는 함수입니다.
function addGame(game) {
    // localStorage에 저장된 추가 게임 목록을 가져옵니다.
    const addedGames = getAddedGames();

    // 새 게임을 추가 게임 목록에 넣습니다.
    addedGames.push(game);
    // localStorage에 새 목록을 저장합니다.
    setAddedGames(addedGames);
    // 현재 화면에서 사용하는 games 배열에도 새 게임을 넣습니다.
    games.push(game);

    // 추가한 게임의 장르로 필터를 자동 이동합니다.
    activeGenre = game.genre;
    // 첫 페이지부터 보여주도록 페이지를 초기화합니다.
    currentPage = 1;
    // 방금 추가한 게임이 잘 보이도록 최신순으로 바꿉니다.
    sortSelect.value = "recent";

    // 장르 버튼 중 추가한 게임의 장르 버튼만 active 상태로 바꿉니다.
    filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.genre === game.genre);
    });

    // 변경된 게임 목록을 화면에 다시 그립니다.
    renderGames();
}

// 사용자가 추가한 게임을 삭제하는 함수입니다.
function deleteAddedGame(gameId) {
    // localStorage 목록에서 삭제할 게임 id와 다른 게임만 남깁니다.
    const addedGames = getAddedGames().filter((game) => game.id !== gameId);
    // 현재 games 배열에서 삭제할 게임의 위치를 찾습니다.
    const gameIndex = games.findIndex((game) => game.id === gameId);

    // 삭제할 게임을 찾았다면 games 배열에서 제거합니다.
    if (gameIndex !== -1) {
        games.splice(gameIndex, 1);
    }

    // 삭제 후 남은 추가 게임 목록을 localStorage에 저장합니다.
    setAddedGames(addedGames);
    // 삭제 결과를 화면에 다시 반영합니다.
    renderGames();
}

// 삭제 확인 모달을 여는 함수입니다.
function openDeleteModal(gameId, gameTitle) {
    // 삭제할 게임 id를 저장합니다.
    selectedDeleteGameId = gameId;
    // 모달에 삭제할 게임 이름을 표시합니다.
    deleteGameName.textContent = gameTitle;
    // 모달에 open 클래스를 붙여 화면에 보이게 합니다.
    deleteModal.classList.add("open");
    // 모달이 보이는 상태라고 접근성 속성을 바꿉니다.
    deleteModal.setAttribute("aria-hidden", "false");
}

// 삭제 확인 모달을 닫는 함수입니다.
function closeDeleteModal() {
    // 모달에서 open 클래스를 제거해서 숨깁니다.
    deleteModal.classList.remove("open");
    // 모달이 숨겨진 상태라고 접근성 속성을 바꿉니다.
    deleteModal.setAttribute("aria-hidden", "true");
    // 선택했던 삭제 게임 id를 초기화합니다.
    selectedDeleteGameId = null;
}

// 게임 카드와 페이지네이션을 화면에 그리는 함수입니다.
function renderGames() {
    // 현재 필터와 정렬 조건에 맞는 게임 목록을 가져옵니다.
    const visibleGames = getVisibleGames();
    // 전체 페이지 수를 계산합니다. 최소 1페이지는 나오게 합니다.
    const totalPages = Math.max(1, Math.ceil(visibleGames.length / perPage));

    // 현재 페이지가 전체 페이지보다 커졌다면 마지막 페이지로 맞춥니다.
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    // 현재 페이지에서 시작할 배열 위치를 계산합니다.
    const start = (currentPage - 1) * perPage;
    // 현재 페이지에 보여줄 게임만 잘라냅니다.
    const pageGames = visibleGames.slice(start, start + perPage);

    // 화면 위쪽에 총 게임 개수를 표시합니다.
    gameCount.textContent = `총 ${visibleGames.length}개`;
    // pageGames 배열을 HTML 문자열로 바꿔 gameGrid 안에 넣습니다.
    gameGrid.innerHTML = pageGames.map((game) => `
        <article class="game-card" data-id="${game.id}">
            <img class="game-thumb" src="${game.image}" alt="${game.title} 이미지">
            <div class="game-info">
                <h3>${game.title}</h3>
                <span class="genre-badge">${game.genreName}</span>
                <div class="card-bottom">
                    <span class="rating">${game.rating.toFixed(1)}</span>
                    <span>${game.year}</span>
                </div>
                ${game.isCustom ? `<button type="button" class="delete-game-btn" data-id="${game.id}">삭제</button>` : ""}
            </div>
        </article>
    `).join("");

    // 게임 카드 아래 페이지 버튼도 다시 그립니다.
    renderPagination(totalPages);
}

// 페이지 번호 버튼들을 화면에 그리는 함수입니다.
function renderPagination(totalPages) {
    // 전체 페이지 수만큼 [1, 2, 3...] 배열을 만듭니다.
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    // 각 페이지 번호를 button HTML로 바꿉니다.
    const pageButtons = pages.map((page) => `
        <button type="button" class="page-btn ${page === currentPage ? "active" : ""}" data-page="${page}">
            ${page}
        </button>
    `).join("");

    // 이전 버튼, 페이지 번호 버튼, 다음 버튼을 pagination 영역에 넣습니다.
    pagination.innerHTML = `
        <button type="button" class="page-btn" data-page="prev" ${currentPage === 1 ? "disabled" : ""}>‹</button>
        ${pageButtons}
        ${totalPages > 5 ? '<span class="page-dots">...</span>' : ""}
        <button type="button" class="page-btn" data-page="next" ${currentPage === totalPages ? "disabled" : ""}>›</button>
    `;
}

// 장르 필터 버튼들에 클릭 이벤트를 연결합니다.
filterButtons.forEach((button) => {
    // 각각의 장르 버튼을 클릭했을 때 실행됩니다.
    button.addEventListener("click", () => {
        // 모든 장르 버튼에서 active 클래스를 제거합니다.
        filterButtons.forEach((item) => item.classList.remove("active"));
        // 클릭한 버튼에만 active 클래스를 추가합니다.
        button.classList.add("active");
        // 현재 선택된 장르를 클릭한 버튼의 data-genre 값으로 바꿉니다.
        activeGenre = button.dataset.genre;
        // 장르가 바뀌면 1페이지부터 보여줍니다.
        currentPage = 1;
        // 바뀐 조건에 맞게 게임 목록을 다시 그립니다.
        renderGames();
    });
});

// 정렬 select 값이 바뀌었을 때 실행됩니다.
sortSelect.addEventListener("change", () => {
    // 정렬이 바뀌면 1페이지부터 보여줍니다.
    currentPage = 1;
    // 바뀐 정렬 기준으로 게임 목록을 다시 그립니다.
    renderGames();
});

// 게임 추가 form을 제출했을 때 실행됩니다.
addGameForm.addEventListener("submit", (event) => {
    // form 제출 시 페이지가 새로고침되는 기본 동작을 막습니다.
    event.preventDefault();

    // 사용자가 선택한 장르 값을 가져옵니다.
    const genre = addGenre.value;
    // input 값들을 모아 새 게임 객체를 만듭니다.
    const game = {
        // 사용자가 입력한 게임 제목입니다.
        title: addTitle.value.trim(),
        // 새 게임에 고유 id를 붙입니다.
        id: createGameId(addTitle.value.trim()),
        // 필터에서 사용할 장르 값입니다.
        genre,
        // 카드에 보여줄 한글 장르 이름입니다.
        genreName: genreNames[genre],
        // 평점 input 값을 숫자로 바꿉니다.
        rating: Number(addRating.value),
        // 출시연도 input 값을 숫자로 바꿉니다.
        year: Number(addYear.value),
        // 사용자가 추가한 게임은 기본 인기 점수를 60으로 둡니다.
        popularity: 60,
        // 이미지 경로를 검사해서 비어 있으면 기본 이미지를 넣습니다.
        image: getImagePath(addImage.value),
        // 이 게임은 사용자가 추가한 게임이라는 표시입니다.
        isCustom: true,
    };

    // 완성된 게임 객체를 목록에 추가합니다.
    addGame(game);
    // 입력이 끝난 form을 비웁니다.
    addGameForm.reset();
});

// 페이지네이션 영역을 클릭했을 때 실행됩니다.
pagination.addEventListener("click", (event) => {
    // 클릭한 대상에서 가장 가까운 페이지 버튼을 찾습니다.
    const button = event.target.closest(".page-btn");

    // 버튼이 아니거나 disabled 상태면 아무것도 하지 않습니다.
    if (!button || button.disabled) {
        return;
    }

    // 현재 조건에 맞는 게임 목록을 가져옵니다.
    const visibleGames = getVisibleGames();
    // 현재 조건에서 전체 페이지 수를 계산합니다.
    const totalPages = Math.max(1, Math.ceil(visibleGames.length / perPage));
    // 클릭한 버튼의 data-page 값을 가져옵니다.
    const page = button.dataset.page;

    // 이전 버튼이면 현재 페이지를 1 줄입니다.
    if (page === "prev") {
        currentPage -= 1;
    } else if (page === "next") {
        // 다음 버튼이면 현재 페이지를 1 늘립니다.
        currentPage += 1;
    } else {
        // 숫자 버튼이면 그 숫자로 현재 페이지를 바꿉니다.
        currentPage = Number(page);
    }

    // 현재 페이지가 1보다 작거나 마지막 페이지보다 커지지 않게 제한합니다.
    currentPage = Math.min(Math.max(currentPage, 1), totalPages);
    // 바뀐 페이지에 맞게 게임 목록을 다시 그립니다.
    renderGames();
});

// 게임 카드 영역에서 삭제 버튼 클릭을 감지합니다.
gameGrid.addEventListener("click", (event) => {
    // 클릭한 대상에서 가장 가까운 삭제 버튼을 찾습니다.
    const deleteButton = event.target.closest(".delete-game-btn");
    // 클릭한 대상에서 가장 가까운 게임 카드를 찾습니다.
    const gameCard = event.target.closest(".game-card");

    // 게임 카드 바깥을 클릭했다면 아무것도 하지 않습니다.
    if (!gameCard) {
        return;
    }

    // 삭제 버튼을 클릭했다면 삭제 확인 모달을 엽니다.
    if (deleteButton) {
        // 삭제할 게임 정보를 찾습니다.
        const game = games.find((item) => item.id === deleteButton.dataset.id);

        // 게임 정보가 있으면 확인 모달을 엽니다.
        if (game) {
            openDeleteModal(game.id, game.title);
        }

        // 삭제 버튼 클릭 이후 아래 카드 선택 코드는 실행하지 않습니다.
        return;
    }

    // 기본 게임 카드는 삭제 버튼이 없으므로 선택 표시만 모두 지웁니다.
    if (!gameCard.querySelector(".delete-game-btn")) {
        gameGrid.querySelectorAll(".game-card").forEach((card) => card.classList.remove("show-delete"));
        return;
    }

    // 다른 카드의 삭제 버튼은 숨깁니다.
    gameGrid.querySelectorAll(".game-card").forEach((card) => {
        // 지금 클릭한 카드가 아닌 카드에서 show-delete 클래스를 제거합니다.
        if (card !== gameCard) {
            card.classList.remove("show-delete");
        }
    });

    // 클릭한 추가 게임 카드의 삭제 버튼 표시 상태를 켜거나 끕니다.
    gameCard.classList.toggle("show-delete");
});

// 삭제 확인 모달에서 "네" 버튼을 클릭했을 때 실행됩니다.
deleteConfirm.addEventListener("click", () => {
    // 삭제할 게임 id가 있을 때만 삭제합니다.
    if (selectedDeleteGameId) {
        deleteAddedGame(selectedDeleteGameId);
    }

    // 삭제 후 모달을 닫습니다.
    closeDeleteModal();
});

// 삭제 확인 모달에서 "아니오" 버튼을 클릭하면 모달만 닫습니다.
deleteCancel.addEventListener("click", closeDeleteModal);

// 삭제 모달의 바깥 어두운 배경을 클릭하면 모달을 닫습니다.
deleteModal.addEventListener("click", (event) => {
    // 클릭한 대상이 모달 배경일 때만 닫습니다.
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});

// 키보드에서 Escape를 누르면 삭제 확인 모달을 닫습니다.
document.addEventListener("keydown", (event) => {
    // Escape 키이고 삭제 모달이 열려 있으면 닫습니다.
    if (event.key === "Escape" && deleteModal.classList.contains("open")) {
        closeDeleteModal();
    }
});

// 페이지가 처음 열릴 때 localStorage에 저장된 추가 게임을 불러옵니다.
loadAddedGames();
// 모든 준비가 끝나면 게임 목록을 처음으로 화면에 그립니다.
renderGames();
