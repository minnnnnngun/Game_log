// HTML에서 class가 "save-btn"인 모든 저장 버튼을 찾아서 saveButtons에 저장합니다.
const saveButtons = document.querySelectorAll(".save-btn");

// HTML에서 class가 "game-card"인 모든 게임 카드를 찾아서 gameCards에 저장합니다.
const gameCards = document.querySelectorAll(".game-card");

// 추천 장르를 고르는 select 요소를 찾아서 recommendGenre에 저장합니다.
const recommendGenre = document.getElementById("recommendGenre");

// 추천 받기 버튼을 찾아서 recommendBtn에 저장합니다.
const recommendBtn = document.getElementById("recommendBtn");

// 추천 결과가 표시될 영역을 찾아서 recommendResult에 저장합니다.
const recommendResult = document.getElementById("recommendResult");

// 최근 본 게임 목록이 들어갈 영역을 찾아서 recentList에 저장합니다.
const recentList = document.getElementById("recentList");

// 최근 본 게임이 없을 때 보여줄 안내 문구를 찾아서 recentEmpty에 저장합니다.
const recentEmpty = document.getElementById("recentEmpty");

// 최근 본 게임 전체 삭제 버튼을 찾아서 clearRecentBtn에 저장합니다.
const clearRecentBtn = document.getElementById("clearRecentBtn");

// HTML에서 id가 "saveModal"인 모달 전체 영역을 찾아서 saveModal에 저장합니다.
const saveModal = document.getElementById("saveModal");

// 모달 안에서 게임 이름을 보여줄 요소를 찾아서 saveGameName에 저장합니다.
const saveGameName = document.getElementById("saveGameName");

// 모달 제목을 보여줄 요소를 찾아서 saveModalTitle에 저장합니다.
const saveModalTitle = document.getElementById("saveModalTitle");

// 모달 안내 문구를 보여줄 요소를 찾아서 saveModalMessage에 저장합니다.
const saveModalMessage = document.getElementById("saveModalMessage");

// 모달에서 "네" 버튼을 찾아서 saveConfirm에 저장합니다.
const saveConfirm = document.getElementById("saveConfirm");

// 모달에서 "아니오" 버튼을 찾아서 saveCancel에 저장합니다.
const saveCancel = document.getElementById("saveCancel");

// 사용자가 지금 선택한 게임 이름을 잠시 저장하는 변수입니다.
let selectedGame = null;

// 사용자가 지금 누른 버튼을 잠시 저장하는 변수입니다.
let selectedButton = null;

// 지금 하려는 작업이 저장인지, 저장 취소인지 구분하는 변수입니다.
let selectedAction = "save";

// localStorage에서 저장된 게임 목록을 꺼내오는 함수입니다.
function getSavedGames() {
    // localStorage의 문자열 데이터를 배열로 바꾸고, 저장된 값이 없으면 빈 배열을 돌려줍니다.
    return JSON.parse(localStorage.getItem("favoriteGames")) || [];
}

// 저장된 게임 목록을 localStorage에 다시 저장하는 함수입니다.
function setSavedGames(games) {
    // 배열은 localStorage에 바로 저장할 수 없어서 JSON 문자열로 바꿔서 저장합니다.
    localStorage.setItem("favoriteGames", JSON.stringify(games));
}

// localStorage에서 최근 본 게임 목록을 꺼내오는 함수입니다.
function getRecentGames() {
    // localStorage의 문자열 데이터를 배열로 바꾸고, 저장된 값이 없으면 빈 배열을 돌려줍니다.
    return JSON.parse(localStorage.getItem("recentGames")) || [];
}

// 최근 본 게임 목록을 localStorage에 다시 저장하는 함수입니다.
function setRecentGames(games) {
    // 배열 데이터를 JSON 문자열로 바꿔서 recentGames라는 이름으로 저장합니다.
    localStorage.setItem("recentGames", JSON.stringify(games));
}

// 게임 카드에서 최근 본 게임에 필요한 정보만 뽑아오는 함수입니다.
function getGameDataFromCard(gameCard) {
    // 카드 안의 이미지를 찾아서 gameImage에 저장합니다.
    const gameImage = gameCard.querySelector("img");

    // 카드 안의 장르 문구를 찾아서 gameGenre에 저장합니다.
    const gameGenre = gameCard.querySelector(".game-genre");

    // 카드 안의 게임 제목을 찾아서 gameTitle에 저장합니다.
    const gameTitle = gameCard.querySelector("h3");

    // 카드 안의 평점 문구를 찾아서 gameRating에 저장합니다.
    const gameRating = gameCard.querySelector(".game-rating");

    // 카드 안의 게임 설명 문구를 찾아서 gameDescription에 저장합니다.
    const gameDescription = gameCard.querySelector("p");

    // 최근 본 게임 목록에서 사용할 객체 형태로 데이터를 돌려줍니다.
    return {
        // 게임 제목 텍스트를 name에 저장합니다.
        name: gameTitle.textContent,
        // 게임 장르 텍스트를 genre에 저장합니다.
        genre: gameGenre.textContent,
        // 게임 평점 텍스트를 rating에 저장합니다.
        rating: gameRating.textContent,
        // 게임 설명 텍스트를 description에 저장합니다.
        description: gameDescription.textContent,
        // 게임 이미지 주소를 imageSrc에 저장합니다.
        imageSrc: gameImage.getAttribute("src"),
        // 게임 이미지 설명을 imageAlt에 저장합니다.
        imageAlt: gameImage.getAttribute("alt")
    };
}

// 추천 결과 카드 하나를 화면에 만들고 돌려주는 함수입니다.
function createRecommendCard(game) {
    // article 태그를 새로 만들어 추천 게임 카드로 사용합니다.
    const recommendCard = document.createElement("article");

    // 새 카드에 recommend-card 클래스를 붙여 CSS 스타일이 적용되게 합니다.
    recommendCard.classList.add("recommend-card");

    // img 태그를 새로 만들어 추천 게임 이미지를 표시합니다.
    const recommendImage = document.createElement("img");

    // 추천 게임 데이터에서 이미지 주소를 넣습니다.
    recommendImage.src = game.imageSrc;

    // 추천 게임 데이터에서 이미지 설명을 넣습니다.
    recommendImage.alt = game.imageAlt;

    // div 태그를 새로 만들어 추천 게임 텍스트 정보를 담습니다.
    const recommendInfo = document.createElement("div");

    // span 태그를 새로 만들어 추천 게임 장르를 표시합니다.
    const recommendGenreText = document.createElement("span");

    // 추천 게임 데이터에서 장르를 넣습니다.
    recommendGenreText.textContent = game.genre;

    // h3 태그를 새로 만들어 추천 게임 제목을 표시합니다.
    const recommendTitle = document.createElement("h3");

    // 추천 게임 데이터에서 제목을 넣습니다.
    recommendTitle.textContent = game.name;

    // p 태그를 새로 만들어 추천 게임 설명을 표시합니다.
    const recommendDescription = document.createElement("p");

    // 추천 게임 데이터에서 설명을 넣습니다.
    recommendDescription.textContent = game.description;

    // strong 태그를 새로 만들어 추천 게임 평점을 표시합니다.
    const recommendRating = document.createElement("strong");

    // 추천 게임 데이터에서 평점을 넣습니다.
    recommendRating.textContent = game.rating;

    // 텍스트 정보 영역에 장르, 제목, 설명, 평점을 차례대로 넣습니다.
    recommendInfo.append(recommendGenreText, recommendTitle, recommendDescription, recommendRating);

    // 추천 카드에 이미지와 텍스트 정보 영역을 넣습니다.
    recommendCard.append(recommendImage, recommendInfo);

    // 완성된 추천 게임 카드를 돌려줍니다.
    return recommendCard;
}

// 선택한 장르와 게임 장르가 맞는지 확인하는 함수입니다.
function isSameRecommendGenre(game, selectedGenre) {
    // 전체를 선택했다면 모든 게임이 추천 대상이 됩니다.
    if (selectedGenre === "all") {
        // 전체 선택은 항상 true를 돌려줍니다.
        return true;
    }

    // 비교하기 쉽도록 게임 장르 문구를 소문자로 바꿉니다.
    const gameGenre = game.genre.toLowerCase();

    // 게임 장르 문구 안에 선택한 장르 단어가 들어있는지 확인합니다.
    return gameGenre.includes(selectedGenre);
}

// 선택한 장르에 맞는 게임들을 전부 추천하는 함수입니다.
function recommendGame() {
    // 모든 게임 카드에서 추천에 필요한 데이터만 배열로 만듭니다.
    const games = Array.from(gameCards).map((gameCard) => getGameDataFromCard(gameCard));

    // 사용자가 선택한 추천 장르 값을 가져옵니다.
    const selectedGenre = recommendGenre.value;

    // 선택한 장르와 맞는 게임만 골라냅니다.
    const filteredGames = games.filter((game) => isSameRecommendGenre(game, selectedGenre));

    // 추천 결과 영역에 결과가 있다는 표시 클래스를 일단 제거합니다.
    recommendResult.classList.remove("has-results");

    // 혹시 추천할 게임이 하나도 없는지 확인합니다.
    if (filteredGames.length === 0) {
        // 추천 결과 영역을 비웁니다.
        recommendResult.textContent = "";

        // 추천할 게임이 없다는 문구를 넣습니다.
        const emptyMessage = document.createElement("p");

        // 안내 문구 내용을 작성합니다.
        emptyMessage.textContent = "해당 장르의 추천 게임이 없습니다.";

        // 추천 결과 영역에 안내 문구를 추가합니다.
        recommendResult.append(emptyMessage);

        // 아래 코드를 더 실행하지 않고 함수를 끝냅니다.
        return;
    }

    // 기존 추천 결과를 비웁니다.
    recommendResult.textContent = "";

    // 추천 결과 영역에 결과가 있다는 표시 클래스를 추가합니다.
    recommendResult.classList.add("has-results");

    // 선택한 장르와 맞는 게임들을 하나씩 반복합니다.
    filteredGames.forEach((game) => {
        // 추천 게임 카드를 만들어 추천 결과 영역에 추가합니다.
        recommendResult.append(createRecommendCard(game));
    });
}

// 최근 본 게임 카드 하나를 화면에 만들고 돌려주는 함수입니다.
function createRecentCard(game) {
    // article 태그를 새로 만들어 최근 본 게임 카드로 사용합니다.
    const recentCard = document.createElement("article");

    // 새 카드에 recent-card 클래스를 붙여 CSS 스타일이 적용되게 합니다.
    recentCard.classList.add("recent-card");

    // img 태그를 새로 만들어 게임 이미지를 표시합니다.
    const recentImage = document.createElement("img");

    // 최근 본 게임 데이터에서 이미지 주소를 넣습니다.
    recentImage.src = game.imageSrc;

    // 최근 본 게임 데이터에서 이미지 설명을 넣습니다.
    recentImage.alt = game.imageAlt;

    // div 태그를 새로 만들어 텍스트 정보를 담습니다.
    const recentInfo = document.createElement("div");

    // h3 태그를 새로 만들어 게임 제목을 표시합니다.
    const recentTitle = document.createElement("h3");

    // 최근 본 게임 데이터에서 게임 제목을 넣습니다.
    recentTitle.textContent = game.name;

    // span 태그를 새로 만들어 게임 장르를 표시합니다.
    const recentGenre = document.createElement("span");

    // 최근 본 게임 데이터에서 장르를 넣습니다.
    recentGenre.textContent = game.genre;

    // p 태그를 새로 만들어 평점을 표시합니다.
    const recentRating = document.createElement("p");

    // 최근 본 게임 데이터에서 평점을 넣습니다.
    recentRating.textContent = game.rating;

    // 텍스트 정보 영역에 제목, 장르, 평점을 차례대로 넣습니다.
    recentInfo.append(recentTitle, recentGenre, recentRating);

    // 최근 본 게임 카드에 이미지와 텍스트 정보 영역을 넣습니다.
    recentCard.append(recentImage, recentInfo);

    // 완성된 최근 본 게임 카드를 돌려줍니다.
    return recentCard;
}

// 최근 본 게임 목록을 화면에 다시 그려주는 함수입니다.
function renderRecentGames() {
    // localStorage에서 최근 본 게임 목록을 가져옵니다.
    const recentGames = getRecentGames();

    // 기존에 화면에 있던 최근 본 게임 카드를 모두 비웁니다.
    recentList.textContent = "";

    // 최근 본 게임이 하나도 없는지 확인합니다.
    if (recentGames.length === 0) {
        // 최근 본 게임이 없다는 안내 문구를 보여줍니다.
        recentEmpty.classList.remove("hidden");

        // 전체 삭제 버튼은 숨깁니다.
        clearRecentBtn.classList.add("hidden");

        // 아래 코드를 더 실행하지 않고 함수를 끝냅니다.
        return;
    }

    // 최근 본 게임이 있으면 안내 문구를 숨깁니다.
    recentEmpty.classList.add("hidden");

    // 최근 본 게임이 있으면 전체 삭제 버튼을 보여줍니다.
    clearRecentBtn.classList.remove("hidden");

    // 최근 본 게임 목록을 하나씩 반복합니다.
    recentGames.forEach((game) => {
        // 최근 본 게임 카드 요소를 만들어서 recentList 안에 추가합니다.
        recentList.append(createRecentCard(game));
    });
}

// 최근 본 게임 목록에 새 게임을 추가하는 함수입니다.
function addRecentGame(game) {
    // 현재 저장된 최근 본 게임 목록을 가져옵니다.
    const recentGames = getRecentGames();

    // 같은 게임이 이미 있으면 제거해서 중복 저장을 막습니다.
    const filteredGames = recentGames.filter((recentGame) => recentGame.name !== game.name);

    // 새로 본 게임을 배열 맨 앞에 추가합니다.
    filteredGames.unshift(game);

    // 최근 본 게임은 최대 6개까지만 저장합니다.
    setRecentGames(filteredGames.slice(0, 6));

    // 저장한 뒤 화면의 최근 본 게임 영역을 다시 그립니다.
    renderRecentGames();
}

// 저장 또는 저장 취소 확인 모달을 여는 함수입니다.
function openSaveModal(gameName, button, action) {
    // 어떤 게임을 선택했는지 selectedGame에 저장합니다.
    selectedGame = gameName;

    // 어떤 버튼을 눌렀는지 selectedButton에 저장합니다.
    selectedButton = button;

    // 저장인지 저장 취소인지 selectedAction에 저장합니다.
    selectedAction = action;

    // 모달 안에 선택한 게임 이름을 표시합니다.
    saveGameName.textContent = gameName;

    // action이 "save"이면 저장 제목, 아니면 저장 취소 제목을 보여줍니다.
    saveModalTitle.textContent = action === "save" ? "게임 저장" : "저장 취소";

    // action이 "save"이면 저장 질문, 아니면 저장 취소 질문을 보여줍니다.
    saveModalMessage.textContent = action === "save"
        // 저장할 때 보여주는 문구입니다.
        ? "이 게임을 저장하시겠습니까?"
        // 저장 취소할 때 보여주는 문구입니다.
        : "이 게임 저장을 취소하시겠습니까?";

    // 모달에 open 클래스를 추가해서 화면에 보이게 만듭니다.
    saveModal.classList.add("open");

    // 모달이 현재 보이는 상태라고 접근성 속성을 바꿔줍니다.
    saveModal.setAttribute("aria-hidden", "false");
}

// 확인 모달을 닫는 함수입니다.
function closeSaveModal() {
    // 모달에서 open 클래스를 제거해서 화면에서 숨깁니다.
    saveModal.classList.remove("open");

    // 모달이 현재 숨겨진 상태라고 접근성 속성을 바꿔줍니다.
    saveModal.setAttribute("aria-hidden", "true");

    // 선택된 게임 정보를 초기화합니다.
    selectedGame = null;

    // 선택된 버튼 정보를 초기화합니다.
    selectedButton = null;

    // 다음 동작을 기본값인 저장 상태로 초기화합니다.
    selectedAction = "save";
}

// 버튼을 저장된 상태로 바꿔주는 함수입니다.
function markSavedButton(button) {
    // 버튼 글자를 "저장됨"으로 바꿉니다.
    button.textContent = "저장됨";

    // saved 클래스를 추가해서 초록색 스타일이 적용되게 합니다.
    button.classList.add("saved");
}

// 버튼을 저장되지 않은 상태로 바꿔주는 함수입니다.
function markUnsavedButton(button) {
    // 버튼 글자를 다시 "저장"으로 바꿉니다.
    button.textContent = "저장";

    // saved 클래스를 제거해서 원래 보라색 버튼으로 돌아가게 합니다.
    button.classList.remove("saved");
}

// 모든 저장 버튼을 하나씩 반복하면서 클릭 이벤트를 연결합니다.
saveButtons.forEach((button) => {
    // 현재 버튼에서 가장 가까운 게임 카드(article)를 찾습니다.
    const gameCard = button.closest(".game-card");

    // 게임 카드 안의 h3 태그에서 게임 이름을 가져옵니다.
    const gameName = gameCard.querySelector("h3").textContent;

    // localStorage에 이미 이 게임이 저장되어 있는지 확인합니다.
    if (getSavedGames().includes(gameName)) {
        // 이미 저장된 게임이면 버튼을 "저장됨" 상태로 표시합니다.
        markSavedButton(button);
    }

    // 저장 버튼을 클릭했을 때 실행할 코드를 등록합니다.
    button.addEventListener("click", () => {
        // 현재 게임이 저장되어 있는지 다시 확인합니다.
        const isSaved = getSavedGames().includes(gameName);

        // 저장되어 있으면 저장 취소 모달, 아니면 저장 모달을 엽니다.
        openSaveModal(gameName, button, isSaved ? "remove" : "save");
    });
});

// 모든 게임 카드에 클릭 이벤트를 연결합니다.
gameCards.forEach((gameCard) => {
    // 게임 카드를 클릭했을 때 실행할 코드를 등록합니다.
    gameCard.addEventListener("click", (event) => {
        // 저장 버튼을 클릭한 경우에는 최근 본 게임으로 기록하지 않습니다.
        if (event.target.closest(".save-btn")) {
            // 저장 버튼 클릭이면 아래 코드를 실행하지 않고 끝냅니다.
            return;
        }

        // 클릭한 게임 카드에서 필요한 게임 정보를 가져옵니다.
        const game = getGameDataFromCard(gameCard);

        // 가져온 게임 정보를 최근 본 게임 목록에 추가합니다.
        addRecentGame(game);
    });
});

// 모달에서 "네" 버튼을 클릭했을 때 실행할 코드를 등록합니다.
saveConfirm.addEventListener("click", () => {
    // 현재 localStorage에 저장된 게임 목록을 가져옵니다.
    const savedGames = getSavedGames();

    // 사용자가 하려는 작업이 "저장"인지 확인합니다.
    if (selectedAction === "save") {
        // 선택된 게임이 있고, 아직 저장 목록에 없을 때만 저장합니다.
        if (selectedGame && !savedGames.includes(selectedGame)) {
            // 저장 목록 배열에 선택한 게임 이름을 추가합니다.
            savedGames.push(selectedGame);

            // 추가된 배열을 localStorage에 다시 저장합니다.
            setSavedGames(savedGames);
        }

        // 선택된 버튼이 있으면 화면의 버튼 상태도 바꿉니다.
        if (selectedButton) {
            // 버튼을 "저장됨" 상태로 표시합니다.
            markSavedButton(selectedButton);
        }
    }

    // 사용자가 하려는 작업이 "저장 취소"인지 확인합니다.
    if (selectedAction === "remove") {
        // 선택한 게임만 제외한 새 배열을 만들어 localStorage에 저장합니다.
        setSavedGames(savedGames.filter((game) => game !== selectedGame));

        // 선택된 버튼이 있으면 화면의 버튼 상태도 바꿉니다.
        if (selectedButton) {
            // 버튼을 다시 "저장" 상태로 표시합니다.
            markUnsavedButton(selectedButton);
        }
    }

    // 저장 또는 저장 취소 작업이 끝났으니 모달을 닫습니다.
    closeSaveModal();
});

// 모달에서 "아니오" 버튼을 클릭하면 모달만 닫습니다.
saveCancel.addEventListener("click", closeSaveModal);

// 추천 받기 버튼을 클릭했을 때 실행할 코드를 등록합니다.
recommendBtn.addEventListener("click", recommendGame);

// 최근 본 게임 전체 삭제 버튼을 클릭했을 때 실행할 코드를 등록합니다.
clearRecentBtn.addEventListener("click", () => {
    // localStorage에서 최근 본 게임 데이터를 삭제합니다.
    localStorage.removeItem("recentGames");

    // 삭제한 뒤 화면의 최근 본 게임 영역을 다시 그립니다.
    renderRecentGames();
});

// 모달의 어두운 배경을 클릭했을 때 실행할 코드를 등록합니다.
saveModal.addEventListener("click", (event) => {
    // 클릭한 대상이 모달 안쪽 박스가 아니라 바깥 배경인지 확인합니다.
    if (event.target === saveModal) {
        // 바깥 배경을 클릭했다면 모달을 닫습니다.
        closeSaveModal();
    }
});

// 페이지가 처음 열렸을 때 localStorage에 있는 최근 본 게임 목록을 화면에 표시합니다.
renderRecentGames();

// 키보드를 눌렀을 때 실행할 코드를 문서 전체에 등록합니다.
document.addEventListener("keydown", (event) => {
    // Escape 키를 눌렀고, 모달이 열려 있는 상태인지 확인합니다.
    if (event.key === "Escape" && saveModal.classList.contains("open")) {
        // 조건이 맞으면 모달을 닫습니다.
        closeSaveModal();
    }
});
