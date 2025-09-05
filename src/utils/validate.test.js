import { validateSignInData, validateSignUpData, isValidPassword, isValidEmail } from './validate';

describe('validateSignInData', () => {
  test('returns required message for both missing fields', () => {
    expect(validateSignInData('', '')).toBe('Email is required and Password is required.');
  });

  test('returns required message for missing email', () => {
    expect(validateSignInData('', 'Password1!')).toBe('Email is required.');
  });

  test('returns required message for missing password', () => {
    expect(validateSignInData('user@example.com', '')).toBe('Password is required.');
  });

  test('flags invalid email', () => {
    expect(validateSignInData('invalid-email', 'Password1!')).toBe('Email is not valid.');
  });

  test('flags invalid password', () => {
    expect(validateSignInData('user@example.com', 'short')).toBe(
      'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.'
    );
  });

  test('returns null for valid credentials', () => {
    expect(validateSignInData('user@example.com', 'StrongPass1!')).toBeNull();
  });
});

describe('validateSignUpData', () => {
  test('returns required messages when all empty', () => {
    expect(validateSignUpData('', '', '')).toBe('Name is required, Email is required, and Password is required.');
  });

  test('returns required message for missing name', () => {
    expect(validateSignUpData('user@example.com', 'StrongPass1!', '')).toBe('Name is required.');
  });

  test('flags invalid name', () => {
    expect(validateSignUpData('user@example.com', 'StrongPass1!', '1')).toBe('Please enter a valid Name.');
  });

  test('flags invalid email and password together', () => {
    const msg = validateSignUpData('invalid', 'weak', 'Alice');
    expect(msg).toBe(
      'Email is not valid. Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.'
    );
  });

  test('returns null for valid inputs', () => {
    expect(validateSignUpData('user@example.com', 'StrongPass1!', 'Alice Doe')).toBeNull();
  });
});

describe('primitive validators', () => {
  test('isValidEmail basic checks', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('  a@b.co  ')).toBe(true);
    expect(isValidEmail('a@b')).toBe(false);
    expect(isValidEmail('a b@c.com')).toBe(false);
  });

  test('isValidPassword strict by default', () => {
    expect(isValidPassword('StrongPass1!')).toBe(true);
    expect(isValidPassword('noupper1!')).toBe(false);
    expect(isValidPassword('NOLOWER1!')).toBe(false);
    expect(isValidPassword('NoSpecial12')).toBe(false);
    expect(isValidPassword('Short1!')).toBe(false);
  });
});
