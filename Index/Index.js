// HTML에서 class가 "save-btn"인 모든 저장 버튼을 찾아서 saveButtons에 저장합니다.
const saveButtons = document.querySelectorAll(".save-btn");

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

// 모달의 어두운 배경을 클릭했을 때 실행할 코드를 등록합니다.
saveModal.addEventListener("click", (event) => {
    // 클릭한 대상이 모달 안쪽 박스가 아니라 바깥 배경인지 확인합니다.
    if (event.target === saveModal) {
        // 바깥 배경을 클릭했다면 모달을 닫습니다.
        closeSaveModal();
    }
});

// 키보드를 눌렀을 때 실행할 코드를 문서 전체에 등록합니다.
document.addEventListener("keydown", (event) => {
    // Escape 키를 눌렀고, 모달이 열려 있는 상태인지 확인합니다.
    if (event.key === "Escape" && saveModal.classList.contains("open")) {
        // 조건이 맞으면 모달을 닫습니다.
        closeSaveModal();
    }
});
