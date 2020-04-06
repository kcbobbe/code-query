const question = require("../question");
jest.mock("../question");
test("mock question model", () => {
  expect(question).toEqual({
    questionText: "What is the question?",
    questionTag: "javascript",
    date: "01/01/2020"
  });
});
