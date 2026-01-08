# Card App Web Service (Express + MySQL)

A simple REST API built with **Express** and **mysql2/promise** to manage cards stored in a MySQL database.

---
## Routes

GET     /allcards  
POST    /addcard              body: { card_name, card_pic }  
PUT     /editcard/:id         params: { id }, body: { card_name, card_pic }  
DELETE  /deletecard/:id       params: { id }  
