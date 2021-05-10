const Employee = require("../lib/Employee");

describe("Employee", () => {
  describe("Initialisation", () => {
    it("should create an object if provided valid arguments", () => {
      const e = new Employee();
      expect(typeof e).toBe("object");
    });

    it("should set name via constructor arguments", () => {
      const name = "Lara";
      const e = new Employee(name);
      expect(e.name).toBe(name);
    });

    it("should set id via constructor argument", () => {
      const testValue = 100;
      const e = new Employee("Croft", testValue);
      expect(e.id).toBe(testValue);
    });

    it("should set email via constructor argument", () => {
      const testValue = "test@test.com";
      const e = new Employee("Croft", 1, testValue);
      expect(e.email).toBe(testValue);
    });

    it("should get name via getName()", () => {
      const testValue = "Lara";
      const e = new Employee(testValue);
      expect(e.getName()).toBe(testValue);
    });

    it("should get id via getId()", () => {
      const testValue = 100;
      const e = new Employee("Croft", testValue);
      expect(e.getId()).toBe(testValue);
    });

    it("should get email via getEmail()", () => {
      const testValue = "test@test.com";
      const e = new Employee("Croft", 1, testValue);
      expect(e.getEmail()).toBe(testValue);
    });

    it('getRole() should return "Employee"', () => {
      const testValue = "Employee";
      const e = new Employee("Croft", 1, "test@test.com");
      expect(e.getRole()).toBe(testValue);
    });
  });
});
