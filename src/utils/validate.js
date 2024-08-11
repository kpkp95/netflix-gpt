export const validateSignUpData = (email, password, name) => {
  const isEmailEmpty = !email.trim();
  const isPasswordEmpty = !password.trim();
  const isNameEmpty = !name.trim();

  if (isNameEmpty && isEmailEmpty && isPasswordEmpty)
    return "Name, Email, and Password are required";
  if (isNameEmpty) return "Name is required";
  if (isEmailEmpty) return "Email is required";
  if (isPasswordEmpty) return "Password is required";

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  let errorMessage = "";

  if (!isNameValid) errorMessage += "Please enter a valid Name. ";
  if (!isEmailValid) errorMessage += "Email is not valid. ";
  if (!isPasswordValid) errorMessage += "Password is not valid. ";

  return errorMessage ? errorMessage.trim() : null;
};

export const validateSignInData = (email, password) => {
  const isEmailEmpty = !email.trim();
  const isPasswordEmpty = !password.trim();

  if (isEmailEmpty && isPasswordEmpty) return "Email and Password are required";
  if (isEmailEmpty) return "Email is required";
  if (isPasswordEmpty) return "Password is required";

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  let errorMessage = "";

  if (!isEmailValid) errorMessage += "Email is not valid. ";
  if (!isPasswordValid) errorMessage += "Password is not valid. ";

  return errorMessage ? errorMessage.trim() : null;
};
