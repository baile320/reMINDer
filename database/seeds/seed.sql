INSERT INTO users (email) VALUES ('baile320@umn.edu');

INSERT INTO tags (tag)
VALUES
  ('motivational'),
  ('learning'),
  ('mental models'),
  ('impostor syndrome'),
  ('sleep'),
  ('unconscious'),
  ('diffuse mode'),
  ('javascript'),
  ('coding'),
  ('closures');

INSERT INTO reminders (author, body, source)
VALUES
  ('Jake the Dog', 'Dude, suckin'' at something is the first step towards bein'' sorta good at somethin''.', 'Adventure Time'),
  ('Anonymous', 'You can do it!', ''),
  ('Make it Stick', 'Repeated effortful recall or practice helps integrate learning into mental models, in which a set of interrelated ideas or a sequence of motor skills are fused into a meaningful whole that can be adapted and applied in later settings.', ''),
  ('Make it Stick', '[The studies] support the finding that difficulty can create feelings of incompetence that engender anxiety, which in turn disrupts learning, and that “students do better when given room to struggle with difficulty.”', ''),
  ('A Mind for Numbers', 'Surprisingly, your brain can also work on a problem even while you are sleeping and are not aware of anything. But it does this only if you concentrate on trying to solve the problem before falling asleep. In the morning, as often as not, a fresh insight will pop to mind that can help you solve the problem. The intense effort before a vacation or falling asleep is important for priming your brain; otherwise it will work on some other problem.', ''),
  ('MDN', 'A closure is the combination of a function and the lexical environment within which that function was declared.'' ... it allows you to retain access to variables and state state after the function is defined. Examples: throttling/debouncing, memoization, bind/call/apply, privacy.', '');

INSERT INTO users_reminders (users_id, reminders_id)
VALUES
  (1, 1),
  (1, 2),
  (1, 3),
  (1, 4),
  (1, 5),
  (1, 6);

INSERT INTO reminders_tags (reminders_id, tags_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 2),
  (3, 3),
  (3, 4),
  (4, 4),
  (5, 2),
  (5, 5),
  (5, 6),
  (5, 7),
  (6, 8),
  (6, 9),
  (6, 10);