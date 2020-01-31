# hacktiv-overflow

**Title**
----
registration


* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

   `name, email, password`

* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:** `{ 
        "data": {
            "_id": ".......",
            "name": ".......",
            "email": "......"
        } 
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Title**
----
login


* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

   `email, password`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "token": ".....",
            "name": "......",
            "userId": "........",
            "email": "......"
        } 
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
get all questions


* **URL**

  /questions

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": [
         {
        "_id": "......",
        "title": ".......",
        "description": "........",
        "userId": {
            "_id": "......",
            "name": ".....",
            "email": ".......",
            "password": ".....",
            "__v": 0
        },
        "votes": [],
        "time": "......",
        "__v": 0
    },
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
get 1 question


* **URL**

  /questions/:questionId

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**

   `none`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "token": ".....",
            "name": "......",
            "userId": "........",
            "email": "......"
        } 
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
add question


* **URL**

  /questions/:questionId

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `token`

   **Optional:**
 
   `none`

* **Data Params**

   `title, description`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "_id": "....",
            "title": "....",
            "description": ".....",
            "userId": "......",
            "votes": ....,
            "time": ".....",
            "__v": ...
        } 
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
delete question


* **URL**

  /questions/:questionId

* **Method:**

  `DELETE`
  
*  **URL Params**


   **Required:**
 
   `token`

   **Optional:**
 
   `none`

* **Data Params**

   `none`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "_id": "....",
            "title": "....",
            "description": ".....",
            "userId": "......",
            "votes": ....,
            "time": ".....",
            "__v": ...
        } 
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
update question


* **URL**

  /questions/:questionId

* **Method:**

  `PUT`
  
*  **URL Params**


   **Required:**
 
   `token`

   **Optional:**
 
   `none`

* **Data Params**

   `vote`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "_id": "...",
        "title": "....",
        "description": ".....",
        "userId": ".....",
        "votes": [],
        "time": ".....",
        "__v": 0
    },
    "msg": "......"
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
vote question


* **URL**

  /questions/:questionId

* **Method:**

  `PATCH`
  
*  **URL Params**


   **Required:**
 
   `token`

   **Optional:**
 
   `none`

* **Data Params**

   `vote`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "n": 1,
            "nModified": 1,
            "ok": 1
    },
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

===========================================================================

**Title**
----
get all answers


* **URL**

  /answers

* **Method:**

  `GET`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": [
         {
        "_id": "......",
        "title": ".......",
        "description": "........",
        "userId": {
            "_id": "......",
            "name": ".....",
            "email": ".......",
            "password": ".....",
            "__v": 0
        },
        "votes": [],
        "time": "......",
        "__v": 0
    },
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`



**Title**
----
add answer


* **URL**

  /answers/:answerId

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `token`

   **Optional:**
 
   `none`

* **Data Params**

   `title, description`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "_id": "....",
            "title": "....",
            "description": ".....",
            "userId": "......",
            "votes": ....,
            "time": ".....",
            "__v": ...
        } 
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
delete answer


* **URL**

  /answers/:answerId

* **Method:**

  `DELETE`
  
*  **URL Params**


   **Required:**
 
   `token`

   **Optional:**
 
   `none`

* **Data Params**

   `none`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "_id": "....",
            "title": "....",
            "description": ".....",
            "userId": "......",
            "votes": ....,
            "time": ".....",
            "__v": ...
        } 
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
update answer


* **URL**

  /answers/:answerId

* **Method:**

  `PUT`
  
*  **URL Params**


   **Required:**
 
   `token`

   **Optional:**
 
   `none`

* **Data Params**

   `vote`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "_id": "...",
        "title": "....",
        "description": ".....",
        "userId": ".....",
        "votes": [],
        "time": ".....",
        "__v": 0
    },
    "msg": "......"
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
vote answer


* **URL**

  /answers/:answerId

* **Method:**

  `PATCH`
  
*  **URL Params**


   **Required:**
 
   `token`

   **Optional:**
 
   `none`

* **Data Params**

   `vote`

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            "n": 1,
            "nModified": 1,
            "ok": 1
    },
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`