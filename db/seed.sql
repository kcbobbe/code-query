insert into Users (username, password, createdAt, updatedAt) VALUES ('kc-user', '1234', NOW(), NOW())
insert into Users (username, password, createdAt, updatedAt) VALUES ('st-user', '1234', NOW(), NOW())
insert into Users (username, password, createdAt, updatedAt) VALUES ('rh-user', '1234', NOW(), NOW())
insert into Users (username, password, createdAt, updatedAt) VALUES ('rs-user', '1234', NOW(), NOW())


insert into Questions (questionText, questionTag, createdAt, updatedAt, UserId) VALUES ('What is CSS', 'CSS', NOW(), NOW(), 1)
insert into Questions (questionText, questionTag, createdAt, updatedAt, UserId) VALUES ('What is HTML', 'HTML', NOW(), NOW(), 2)
insert into Questions (questionText, questionTag, createdAt, updatedAt, UserId) VALUES ('What is JavaScript', 'JavaScript', NOW(), NOW(), 3)
insert into Questions (questionText, questionTag, createdAt, updatedAt, UserId) VALUES ('Is Java the same as JavaScript?????', 'JavaScript', NOW(), NOW(), 4)

insert into Answers(answerText, answerTag, createdAt, updatedAt, QuestionId, UserId) VALUES ('CSS is style', 'CSS', NOW(), NOW(), 1,2)
insert into Answers(answerText, answerTag, createdAt, updatedAt, QuestionId, UserId) VALUES ('HTML is markup language', 'HTML', NOW(), NOW(), 2,1)
insert into Answers(answerText, answerTag, createdAt, updatedAt, QuestionId, UserId) VALUES ('Javascript is a programming language', 'JavaScript', NOW(), NOW(), 3,4)
insert into Answers(answerText, answerTag, createdAt, updatedAt, QuestionId, UserId) VALUES ('Java is an OOP (object-oriented programming) language, and JavaScript is specifically an OOP scripting language.', 'CSS', NOW(), NOW(), 4,3)
insert into Answers(answerText, answerTag, createdAt, updatedAt, QuestionId, UserId) VALUES ('CSS describes how HTML elements are to be displayed on screen', 'CSS', NOW(), NOW(), 1,1)
insert into Answers(answerText, answerTag, createdAt, updatedAt, QuestionId, UserId) VALUES ('HTML is standard markup language for documents designed to be displayed in a web browser', 'HTML', NOW(), NOW(), 2,4)
