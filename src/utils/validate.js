const ERROR_MESSAGES = {
  required: (field) => `${field} is required.`,
  invalidEmail: "Email is not valid.",
  invalidPassword:
    "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.",
  invalidName: "Please enter a valid Name.",
};

// Null/undefined-safe empty check
const isEmpty = (value) => value == null || String(value).trim() === "";

// Real‑world friendly email regex (leave strict checks to server)
const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());

// Unicode-aware simple human name validator
const isValidName = (name) =>
  /^[\p{L}][\p{L} .'-]{1,}$/u.test(String(name).trim());

const isValidPassword = (password, strict = true) => {
  // Strict: at least 8 chars, one uppercase, one lowercase, one digit, one special (any non-alphanumeric), no spaces
  const strictRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])\S{8,}$/;
  // Lenient: at least 6 non-space characters
  const lenientRegex = /^\S{6,}$/;
  return strict ? strictRegex.test(password) : lenientRegex.test(password);
};

// Helper to build clean required field messages
const requiredMessages = (fields) => {
  const items = fields.map((f) => ERROR_MESSAGES.required(f).replace(/\.$/, ""));
  if (items.length === 0) return null;
  if (items.length === 1) return `${items[0]}.`;
  if (items.length === 2) return `${items[0]} and ${items[1]}.`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}.`;
};

export const validateSignUpData = (email, password, name) => {
  const n = String(name ?? "").trim();
  const e = String(email ?? "").trim();
  const p = String(password ?? "").trim();

  const missing = [];
  if (isEmpty(n)) missing.push("Name");
  if (isEmpty(e)) missing.push("Email");
  if (isEmpty(p)) missing.push("Password");
  if (missing.length) return requiredMessages(missing);

  const errors = [];
  if (!isValidName(n)) errors.push(ERROR_MESSAGES.invalidName);
  if (!isValidEmail(e)) errors.push(ERROR_MESSAGES.invalidEmail);
  if (!isValidPassword(p)) errors.push(ERROR_MESSAGES.invalidPassword);

  return errors.join(" ") || null;
};

export const validateSignInData = (email, password) => {
  const e = String(email ?? "").trim();
  const p = String(password ?? "").trim();

  const missing = [];
  if (isEmpty(e)) missing.push("Email");
  if (isEmpty(p)) missing.push("Password");
  if (missing.length) return requiredMessages(missing);

  const errors = [];
  if (!isValidEmail(e)) errors.push(ERROR_MESSAGES.invalidEmail);
  if (!isValidPassword(p)) errors.push(ERROR_MESSAGES.invalidPassword);

  return errors.join(" ") || null;
};

// Expose validators for reuse if needed
export { isEmpty, isValidEmail, isValidPassword };

