const signupForm = document.querySelector("#signupForm");
const signupName = document.querySelector("#signupName");
const signupEmail = document.querySelector("#signupEmail");
const signupPassword = document.querySelector("#signupPassword");
const signupPasswordConfirm = document.querySelector("#signupPasswordConfirm");
const signupMessage = document.querySelector("#signupMessage");

function getRegisteredUsers() {
  return JSON.parse(localStorage.getItem("registeredUsers")) || [];
}

function setRegisteredUsers(users) {
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function isEmailRegistered(email) {
  return getRegisteredUsers().some((user) => user.email.toLowerCase() === email.toLowerCase());
}

function showSignupMessage(message, isError = false) {
  signupMessage.textContent = message;
  signupMessage.classList.toggle("error", isError);
}

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value.trim();
  const passwordConfirm = signupPasswordConfirm.value.trim();

  if (!name || !email || !password || !passwordConfirm) {
    showSignupMessage("모든 항목을 입력해주세요.", true);
    return;
  }

  if (password !== passwordConfirm) {
    showSignupMessage("비밀번호가 서로 다릅니다.", true);
    return;
  }

  if (isEmailRegistered(email)) {
    showSignupMessage("이미 가입된 이메일입니다.", true);
    return;
  }

  const users = getRegisteredUsers();
  users.push({
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  });
  setRegisteredUsers(users);
  localStorage.setItem("signupEmail", email);

  showSignupMessage("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");

  setTimeout(() => {
    window.location.href = "../login/login.html";
  }, 800);
});
