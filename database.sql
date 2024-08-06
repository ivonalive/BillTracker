CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "first_name" VARCHAR (40) NOT NULL,
    "last_name" VARCHAR (60) NOT NULL,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (100) NOT NULL
);

CREATE TABLE "bill_information" (
    "id" SERIAL PRIMARY KEY,
    "bill_name" VARCHAR (40) NOT NULL,
    "bill_amount" INT NOT NULL,
    "bill_link" VARCHAR (1000),
    "card_nicname" VARCHAR (40),
    "bill_due_date" DATE NOT NULL,
    "user_id" INT,
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);