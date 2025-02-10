# 🌥️ **Cloudy Book**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/usama-8738/Cloudy-Book) [![Contributors](https://img.shields.io/badge/contributors-1-orange)](https://github.com/usama-8738/Cloudy-Book/graphs/contributors)

---

## 📝 **About the Project**

**Cloudy Book** is a fast, secure, and user-friendly React application that allows users to store their notes on the cloud. Each user can register, log in, and manage their personal notes seamlessly. The app leverages modern technologies like **React**, **Express**, and **MongoDB** to provide a smooth and responsive experience.

### **Key Features**
- **User Authentication**: Secure registration and login for personalized note management.
- **Cloud Storage**: Notes are stored securely on the cloud using MongoDB.
- **Fast and Lightweight**: Built with performance in mind, ensuring quick load times and responsiveness.
- **Context API**: State management is handled using React's Context API (no Redux!).
- **Full-Stack Application**: Frontend built with React, backend powered by Express, and database managed with MongoDB.

---

## 🚀 **Getting Started**

### **Prerequisites**
Before running the project, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (local or cloud instance)

### **Installation**

1. **Clone the Repository**
   ```bash
   git clone https://github.com/usama-8738/Cloudy-Book.git
   cd Cloudy-Book
   ```

2. **Install Dependencies**
   Install dependencies for both the frontend and backend:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the Application**
   Use the following command to start both the server and frontend simultaneously:
   ```bash
   npm run both
   ```
   - **Frontend**: Runs on `http://localhost:3000`
   - **Backend**: Runs on `http://localhost:5000`

---

## 🛠️ **Built With**

This project uses the following technologies:

- **Frontend**:
  - React (v18)
  - React Router DOM (for routing)
  - Context API (state management)

- **Backend**:
  - Express.js (Node.js framework)
  - MongoDB (NoSQL database)
  - Mongoose (ODM for MongoDB)
  - bcrypt (password hashing)
  - jsonwebtoken (JWT for authentication)

- **Other Tools**:
  - Nodemon (development server)
  - Concurrently (to run frontend and backend together)

---

## 🧪 **Testing the App**

To test the app locally:
1. Register a new account or log in with existing credentials.
2. Add, edit, or delete notes to see how they are stored and retrieved from the cloud.
3. Verify that only authenticated users can access their notes.

---

## 🌟 **Contributing**

We welcome contributions to **Cloudy Book**! Here’s how you can help:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m "Add some feature"`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a pull request.

---

## 📜 **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- Inspired by modern cloud-based note-taking apps.
- Special thanks to the open-source community for providing amazing tools and libraries.

---

## 📞 **Contact**

For questions or feedback, feel free to reach out:

- **GitHub**: [@usama-8738](https://github.com/usama-8738)
- **Email**: sulemanafzal@outlook.com

---

### **Screenshots**

![Login Page](https://via.placeholder.com/800x400?text=Login+Page)  
*Login Page*

![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)  
*User Dashboard*

---

### **Live Demo**

Check out the live demo of **Cloudy Book**: [https://cloudy-book-demo.example.com](https://cloudy-book-demo.example.com)

---
