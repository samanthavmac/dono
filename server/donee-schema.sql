CREATE TABLE donees
(
  id             SERIAL,
  name           VARCHAR(255),
  email          VARCHAR(255),
  image          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);