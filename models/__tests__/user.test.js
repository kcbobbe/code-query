const user = require("../user");
jest.mock("../user");
test("use mock", () => {
  expect(user).toEqual({
    email: "mock@gmail.com",
    password: "xyzhytre"
  });
});
