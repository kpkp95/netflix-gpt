const ERROR_MESSAGES = {
  required: (field) => `${field} is required.`,
  invalidEmail: "Email is not valid.",
  invalidPassword:
    "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
  invalidName: "Please enter a valid Name.",
};

const isEmpty = (value) => !value.trim();
const isValidEmail = (email) =>
  /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
const isValidPassword = (password, strict = true) => {
  const strictRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const lenientRegex = /^.{6,}$/; // At least 6 characters
  return strict ? strictRegex.test(password) : lenientRegex.test(password);
};

export const validateSignUpData = (email, password, name) => {
  if (isEmpty(name) && isEmpty(email) && isEmpty(password))
    return `${ERROR_MESSAGES.required("Name")}, ${ERROR_MESSAGES.required(
      "Email"
    )}, and ${ERROR_MESSAGES.required("Password")}`;
  if (isEmpty(name)) return ERROR_MESSAGES.required("Name");
  if (isEmpty(email)) return ERROR_MESSAGES.required("Email");
  if (isEmpty(password)) return ERROR_MESSAGES.required("Password");

  const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  let errorMessage = "";

  if (!isNameValid) errorMessage += `${ERROR_MESSAGES.invalidName} `;
  if (!isValidEmail(email)) errorMessage += `${ERROR_MESSAGES.invalidEmail} `;
  if (!isValidPassword(password))
    errorMessage += `${ERROR_MESSAGES.invalidPassword} `;

  return errorMessage.trim() || null;
};

export const validateSignInData = (email, password) => {
  if (isEmpty(email) && isEmpty(password))
    return ` ${ERROR_MESSAGES.required("Email")}, and ${ERROR_MESSAGES.required(
      "Password"
    )}`;
  if (isEmpty(email)) return ERROR_MESSAGES.required("Email");
  if (isEmpty(password)) return ERROR_MESSAGES.required("Password");

  let errorMessage = "";

  if (!isValidEmail(email)) errorMessage += `${ERROR_MESSAGES.invalidEmail} `;
  if (!isValidPassword(password))
    errorMessage += `${ERROR_MESSAGES.invalidPassword} `;

  return errorMessage.trim() || null;
};
