const answer = require("../answer");
jest.mock("../answer");

test("mock answer model", () => {
  expect(answer).toEqual({
    answerText: "This is my answer",
    answerTag: "javascript",
    date: "01/01/2020"
  });
});
