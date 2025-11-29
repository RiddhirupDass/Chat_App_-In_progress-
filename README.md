# **Real-Time Chat Application**

A full-stack real-time messaging platform that enables instant communication between users through one-to-one chats and channel-based conversations. Built using the MERN stack with WebSockets for real-time delivery, the application supports authentication, profile management, state persistence, and media/file sharing.

This project was built **solo from scratch** and now represents a fully functional real-time chat system.

---

## **Key Features**

### **User Authentication**

* Secure login & signup system using server-side authentication.
* Protected routes using `AuthRoute` to prevent unauthorized access.
* Session-aware frontend that adapts based on authentication state.

### **Real-Time Messaging**

* WebSocket-based communication for instant message delivery.
* Support for:

  * Direct one-to-one chats
  * Channel/group conversations
  * Live message status updates

### **State Management (Zustand)**

* Global state management using **Zustand**.
* Modular architecture using slices (`createBearSlice`, `createFishSlice`, etc.) for scalability.
* Efficient UI updates even during heavy real-time interactions.

### **Profile Setup Flow**

* The backend returns a `profileSetup` boolean to guide the first-time user onboarding.
* Dynamic UI behaviour based on profile completeness.

### **Media & File Sharing**

* Users can upload and send images, documents, and other files using multer package.
* File handling integrated with WebSockets.

---

## **Technology Stack**

### **Frontend**

* ReactJS
* Tailwind CSS + ShadCN UI
* Zustand for global state

### **Backend**

* NodeJS + Express
* MongoDB (Mongoose ORM)
* WebSockets for real-time communication

### **Additional Tools**

* JWT for authentication
* Multer / File upload utilities
* Socket.io (or WebSocket API) for message delivery

---

## **Project Status**

✔️ Core features completed
✔️ Real-time communication stable
✔️ Complete authentication + onboarding flow
✔️ File sharing implemented
✔️ Stable UI/UX with responsive layout

---

## **📌 Upcoming Enhancements**

Although the core project is complete, future upgrades may include:

* Push notifications for new messages
* Message search functionality
* Message reactions & typing indicators
* Video/audio calling
* Deployment on cloud (AWS / Vercel / Render)
* Admin panel for moderation

---
