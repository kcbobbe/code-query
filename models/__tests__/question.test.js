const question = require("../question");
jest.mock("../question");
test("mock question model", () => {
  expect(question).toEqual({
    questionText: "What is the question?",
    questionTag: "JavaScript",
    date: "04/10/2020 12:30:12PM"
  });
});
