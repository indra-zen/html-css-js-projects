const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// Format nama field dengan huruf kapital di awal
const formatFieldName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1); // contoh input id: username -> Username

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);

  let isFormValid = isRequiredValid;

  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  if (isFormValid) {
    alert("Registrasi berhasil!");
    form.reset();
    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-group";
    });
  }
});

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Password tidak cocok");
    return false;
  }
  return true;
}

function checkEmail(email) {
  // Regex email yang mencakup format email umum
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email tidak valid");
    return false;
  }
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${formatFieldName(input)} harus minimal ${min} karakter.`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${formatFieldName(input)} harus kurang dari ${max} karakter.`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    // Cek apakah field wajib diisi
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} wajib diisi`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error";
  const small = formGroup.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success";
}
