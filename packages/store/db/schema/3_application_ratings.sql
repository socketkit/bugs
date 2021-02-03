SET ROLE store;

CREATE TABLE application_ratings (
  application_id text NOT NULL,
  country_id text NOT NULL,
  rating_histogram int[] NOT NULL DEFAULT ARRAY[],

  PRIMARY KEY (application_id, country_id),
  FOREIGN KEY (country_id) REFERENCES countries,
  FOREIGN KEY (application_id) REFERENCES applications
);
