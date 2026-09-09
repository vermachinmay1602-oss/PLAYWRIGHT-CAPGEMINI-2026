export const sauceDemoLoginData = {
  valid: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  invalid: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
  empty: {
    username: '',
    password: '',
  },
  emptyUsername: {
    username: '',
    password: 'secret_sauce',
  },
  emptyPassword: {
    username: 'standard_user',
    password: '',
  },
  passwordMasking: {
    value: 'secret_sauce',
    expectedInputType: 'password',
  },
} as const;
