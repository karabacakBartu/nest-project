const validatePhone = (username: string) => {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
    username,
  );
};

const validateGender = (gender: string) => {
  return /^[MF]$/.test(gender);
};
export { validatePhone, validateGender };
