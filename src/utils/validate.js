export const checkValidData = (
  email,
  password,
  name = null,
  isSignIn = true
) => {
  const isEmailEmpty = !email.trim();
  const isPasswordEmpty = !password.trim();
  const isNameEmpty = !isSignIn && !name?.trim(); // Only check name if not signing in

  if (!isSignIn && isNameEmpty && isEmailEmpty && isPasswordEmpty)
    return "Name, Email, and Password are required";
  if (isEmailEmpty && isPasswordEmpty) return "Email and Password are required";
  if (!isSignIn && isNameEmpty) return "Name is required";
  if (isEmailEmpty) return "Email is required";
  if (isPasswordEmpty) return "Password is required";

  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  let errorMessage = "";

  if (!isSignIn) {
    const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);
    if (!isNameValid) errorMessage += "Please enter a valid Name. ";
  }
  if (!isEmailValid) errorMessage += "Email is not valid. ";
  if (!isPasswordValid) errorMessage += "Password is not valid. ";

  return errorMessage ? errorMessage.trim() : null;
};
