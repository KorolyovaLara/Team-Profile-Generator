const Manager = require("../lib/Manager");

describe("Manager", () => {
  describe("Initialisation", () => {
    it("should set office number via constructor argument", () => {
      const testValue = 100;
      const e = new Manager("Croft", 1, "test@test.com", testValue);
      expect(e.officeNumber).toBe(testValue);
    });

    it("should get office number via getOffice()", () => {
      const testValue = 100;
      const e = new Manager("Croft", 1, "test@test.com", testValue);
      expect(e.getOfficeNumber()).toBe(testValue);
    });

    it('getRole() should return "Manager"', () => {
      const testValue = "Manager";
      const e = new Manager("Croft", 1, "test@test.com", 100);
      expect(e.getRole()).toBe(testValue);
    });
  });
});
