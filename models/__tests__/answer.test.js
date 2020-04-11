const answer = require("../answer");
jest.mock("../answer");

test("mock answer model", () => {
  expect(answer).toEqual({
    answerText: "This is my answer",
    answerTag: "JavaScript",
    date: "04/10/2020 12:30:12PM"
  });
});
