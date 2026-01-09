# Card App Web Service (Express + MySQL)

A simple REST API built with **Express** and **mysql2/promise** to manage cards stored in a MySQL database.

---
## Routes

| Method | Route              | URL Params | Body Params (JSON)            |
|------|--------------------|-----------|---------------------------------|
| GET  | /allcards          | –         | –                               |
| POST | /addcard           | –         | card_name, card_pic             |
| PUT  | /editcard/:id      | id        | card_name, card_pic             |
| DELETE | /deletecard/:id  | id        | –                               |
