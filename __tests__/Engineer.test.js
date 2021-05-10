const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
  describe("Initialisation", () => {
    it("should set GitHUb account via constructor", () => {
      const testValue = "GitHubUser";
      const e = new Engineer("Croft", 1, "test@test.com", testValue);
      expect(e.github).toBe(testValue);
    });

    it("should get GitHub username via getGithub()", () => {
      const testValue = "GitHubUser";
      const e = new Engineer("Croft", 1, "test@test.com", testValue);
      expect(e.getGithub()).toBe(testValue);
    });

    it('getRole() should return "Engineer"', () => {
      const testValue = "Engineer";
      const e = new Engineer("Croft", 1, "test@test.com", "GitHubUser");
      expect(e.getRole()).toBe(testValue);
    });
  });
});
