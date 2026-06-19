const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const rememberLogin = document.querySelector("#rememberLogin");
const loginMessage = document.querySelector("#loginMessage");
const loginStatus = document.querySelector("#loginStatus");
const loginStatusText = document.querySelector("#loginStatusText");
const logoutBtn = document.querySelector("#logoutBtn");

function getLoginUser() {
  return JSON.parse(localStorage.getItem("loginUser")) || null;
}

function setLoginUser(user) {
  localStorage.setItem("loginUser", JSON.stringify(user));
}

function getReturnUrl() {
  return new URLSearchParams(window.location.search).get("returnUrl");
}

function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers")) || [];
}

function findRegisteredUser(email) {
  return getRegisteredUsers().find((user) => user.email.toLowerCase() === email.toLowerCase());
}

function showLoginMessage(message, isError = false) {
  loginMessage.textContent = message;
  loginMessage.classList.toggle("error", isError);
}

function renderLoginStatus() {
  const user = getLoginUser();

  if (!user) {
    loginStatus.classList.remove("show");
    return;
  }

  loginStatusText.textContent = `${user.name || user.email}님 로그인 중`;
  loginStatus.classList.add("show");
}

function fillRememberedUser() {
  const user = getLoginUser();
  const signupEmail = localStorage.getItem("signupEmail");

  if (signupEmail) {
    loginEmail.value = signupEmail;
    localStorage.removeItem("signupEmail");
    return;
  }

  if (!user || !user.remember) {
    return;
  }

  loginEmail.value = user.email;
  rememberLogin.checked = true;
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!email || !password) {
    showLoginMessage("이메일과 비밀번호를 모두 입력해주세요.", true);
    return;
  }

  const registeredUser = findRegisteredUser(email);

  if (!registeredUser || registeredUser.password !== password) {
    showLoginMessage("가입된 계정이 아니거나 비밀번호가 맞지 않습니다.", true);
    return;
  }

  setLoginUser({
    email,
    name: registeredUser.name,
    remember: rememberLogin.checked,
    loggedInAt: new Date().toISOString(),
  });

  showLoginMessage("로그인되었습니다. 잠시 후 홈으로 이동합니다.");

  setTimeout(() => {
    window.location.href = getReturnUrl() || "../Index/Index.html";
  }, 700);
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loginUser");
  loginPassword.value = "";
  showLoginMessage("로그아웃되었습니다.");
  renderLoginStatus();
});

fillRememberedUser();
renderLoginStatus();
