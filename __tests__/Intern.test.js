const Intern = require("../lib/Intern");

describe("Intern", () => {
  describe("Initialisation", () => {
    it("should set school via constructor", () => {
      const testValue = "Monash";
      const e = new Intern("Croft", 1, "test@test.com", testValue);
      expect(e.school).toBe(testValue);
    });

    it("should get school via getSchool()", () => {
      const testValue = "Monash";
      const e = new Intern("Croft", 1, "test@test.com", testValue);
      expect(e.getSchool()).toBe(testValue);
    });

    it('getRole() should return "Intern"', () => {
      const testValue = "Intern";
      const e = new Intern("Croft", 1, "test@test.com", "Monash");
      expect(e.getRole()).toBe(testValue);
    });
  });
});
