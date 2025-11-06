export const validatePesel = (pesel: string) => {
  if (!/^\d{11}$/.test(pesel)) {
    return false;
  }

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  const sum = weights.reduce((acc, weight, index) => {
    return acc + parseInt(pesel[index]) * weight;
  }, 0);

  const controlDigit = (10 - (sum % 10)) % 10;

  return controlDigit === parseInt(pesel[10]);
};
