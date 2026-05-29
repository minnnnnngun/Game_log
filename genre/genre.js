const games = [
    {
        title: "발로란트",
        genre: "fps",
        genreName: "FPS",
        rating: 4.8,
        year: 2020,
        popularity: 98,
        image: "../image/valorant.png",
    },
    {
        title: "배틀그라운드",
        genre: "fps",
        genreName: "FPS",
        rating: 4.5,
        year: 2017,
        popularity: 94,
        image: "../image/BAG.jpg",
    },
    {
        title: "리그 오브 레전드",
        genre: "strategy",
        genreName: "전략",
        rating: 5.0,
        year: 2009,
        popularity: 100,
        image: "../image/lol.png",
    },
    {
        title: "FC 온라인",
        genre: "sports",
        genreName: "스포츠",
        rating: 4.2,
        year: 2023,
        popularity: 86,
        image: "../image/FC.png",
    },
    {
        title: "메이플스토리",
        genre: "rpg",
        genreName: "RPG",
        rating: 4.4,
        year: 2003,
        popularity: 90,
        image: "../image/maplestory.jpg",
    },
    {
        title: "오버워치 2",
        genre: "fps",
        genreName: "FPS",
        rating: 4.3,
        year: 2022,
        popularity: 88,
        image: "../image/overwatch.png",
    },
    {
        title: "엘든 링",
        genre: "rpg",
        genreName: "RPG",
        rating: 4.8,
        year: 2022,
        popularity: 93,
        image: "../image/angry.png",
    },
    {
        title: "원신",
        genre: "adventure",
        genreName: "어드벤처",
        rating: 4.3,
        year: 2020,
        popularity: 89,
        image: "../image/cutemin.png",
    },
    {
        title: "포르자 호라이즌 5",
        genre: "racing",
        genreName: "레이싱",
        rating: 4.7,
        year: 2021,
        popularity: 84,
        image: "../image/FC.png",
    },
    {
        title: "툼 레이더",
        genre: "action",
        genreName: "액션",
        rating: 4.4,
        year: 2018,
        popularity: 78,
        image: "../image/mingeon.png",
    },
    {
        title: "시티즈: 스카이라인",
        genre: "simulation",
        genreName: "시뮬레이션",
        rating: 4.6,
        year: 2015,
        popularity: 76,
        image: "../image/search.png",
    },
    {
        title: "리틀 나이트메어",
        genre: "horror",
        genreName: "공포",
        rating: 4.6,
        year: 2021,
        popularity: 74,
        image: "../image/profile.png",
    },
    {
        title: "테트리스 이펙트",
        genre: "puzzle",
        genreName: "퍼즐",
        rating: 4.5,
        year: 2018,
        popularity: 70,
        image: "../image/search.png",
    },
];

const gameGrid = document.querySelector("#gameGrid");
const gameCount = document.querySelector("#gameCount");
const sortSelect = document.querySelector("#sortSelect");
const pagination = document.querySelector("#pagination");
const filterButtons = document.querySelectorAll(".genre-filter");

const perPage = 8;
let activeGenre = "all";
let currentPage = 1;

function getVisibleGames() {
    const filtered = activeGenre === "all"
        ? [...games]
        : games.filter((game) => game.genre === activeGenre);

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

function renderGames() {
    const visibleGames = getVisibleGames();
    const totalPages = Math.max(1, Math.ceil(visibleGames.length / perPage));

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const start = (currentPage - 1) * perPage;
    const pageGames = visibleGames.slice(start, start + perPage);

    gameCount.textContent = `총 ${visibleGames.length}개`;
    gameGrid.innerHTML = pageGames.map((game) => `
        <article class="game-card">
            <img class="game-thumb" src="${game.image}" alt="${game.title} 이미지">
            <div class="game-info">
                <h3>${game.title}</h3>
                <span class="genre-badge">${game.genreName}</span>
                <div class="card-bottom">
                    <span class="rating">${game.rating.toFixed(1)}</span>
                    <span>${game.year}</span>
                </div>
            </div>
        </article>
    `).join("");

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const pageButtons = pages.map((page) => `
        <button type="button" class="page-btn ${page === currentPage ? "active" : ""}" data-page="${page}">
            ${page}
        </button>
    `).join("");

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

renderGames();
