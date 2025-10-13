# Members-Only Clubhouse

[Live Demo](https://members-only-project.vercel.app)

## Overview

Members-Only Clubhouse is a secure web application where registered users can anonymously post messages. Inside the clubhouse, members can see who authored a post, while non-members can only see the content of the messages without author information. This project emphasizes **user authentication, authorization, and database management**, giving users different levels of access and permissions.

## Features

* **User Authentication:** Sign-up and login using **Passport.js**.
* **Membership Access Control:** Users must enter a secret passcode to become members and access author information.
* **Admin Permissions:** Admin users can delete any message.
* **Secure Passwords:** Passwords are hashed using **bcrypt**.
* **Message Posting:** Members can create messages with a title, content, and timestamp.
* **Public Message Viewing:** Non-members can view messages anonymously.
* **Responsive UI:** Clean interface for both members and non-members.

## Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL
* **Authentication:** Passport.js, bcrypt
* **Templating Engine:** EJS
* **Deployment:** Vercel
* **Version Control:** Git & GitHub

## Database Models

### clubuser

* `fullname` – String
* `username` – String
* `password` – Hashed string
* `membershipstatus` – Boolean
* `admin` – Boolean (optional, for admin privileges)

### message

* `content` – Text
* `timestamp` – Date
* `userid` – Reference to User

## Usage

1. Sign up using your username and password.
2. Login using your registered username and password. 
3. Become a member by entering the secret passcode.
4. Create new messages once logged in as a member.

## Project Demo

<img width="1900" height="943" alt="Screenshot 2025-10-13 214413" src="https://github.com/user-attachments/assets/b0535680-6da9-4640-9ca9-bc04659f5f49" />
<img width="1900" height="945" alt="Screenshot 2025-10-13 214442" src="https://github.com/user-attachments/assets/334c2205-2d59-467f-89be-cbdf152373cb" />


## Learnings & Skills Applied

* User authentication & authorization with Passport.js
* Database modeling and relationships with PostgreSQL
* Role-based access control (member vs admin)
* Secure password handling using bcrypt
* Deployment on Vercel

---

