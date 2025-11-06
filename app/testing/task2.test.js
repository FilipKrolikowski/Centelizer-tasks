import { validatePesel } from "../utils/utils";

describe("PESEL Validation", () => {
  test("Valid PESEL", () => {
    expect(validatePesel("44051401359")).toBe(true);
  });

  test("Invalid PESEL - incorrect length", () => {
    expect(validatePesel("4405140135")).toBe(false);
  });

  test("Invalid PESEL - incorrect characters", () => {
    expect(validatePesel("4405140135a")).toBe(false);
  });

  test("Invalid PESEL - incorrect control sum", () => {
    expect(validatePesel("44051401358")).toBe(false);
  });
});
