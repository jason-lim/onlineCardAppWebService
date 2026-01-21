# Card App Web Service (Express + MySQL)

A simple REST API built with **Express** and **mysql2/promise** to manage cards stored in a MySQL database.

---
## Routes

| Method | Route              | URL Params | Body Params (JSON)            |
|------|--------------------|-----------|---------------------------------|
| GET  | /card          | –         | –                               |
| GET  | /card/:id          | id         | –                               |
| POST | /card           | –         | card_name, card_pic             |
| PUT  | /card/:id      | id        | card_name, card_pic             |
| DELETE | /card/:id  | id        | –                               |
