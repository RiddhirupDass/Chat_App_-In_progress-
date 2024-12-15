Real-Time Chat Application  

A real-time messaging platform that facilitates seamless communication between users through instant text-based chats. The application is built using the MERN stack and is currently under development. Currently it is a project based on solo efforts, but collaboration oppurtunities may open in the future...

## Features (Implemented so far):  
- **User Authentication:**  
  - Secure login and signup system using server-side authentication.  
  - Authentication routes (`AuthRoute`) to manage access control.  

- **Real-Time Communication:**  
  - WebSocket integration for instant messaging.  

- **State Management:**  
  - Zustand is used for efficient state management across the application.  
  - Modular slices like `createBearSlice` and `createFishSlice` ensure a scalable architecture.  

- **Profile Setup:**  
  - The server returns a `profileSetup` boolean flag, enabling dynamic UI adjustments based on user state.  

## Technology Stack:  
- **Frontend:**  
  - ReactJS  

- **Backend:**  
  - NodeJS  
  - MongoDB  

- **Additional Tools & Libraries:**  
  - WebSockets for real-time communication.  
  - Zustand for global state management.  

## Current Challenges:  
- Handling authentication routes (`AuthRoute`) while ensuring a smooth user experience.  
- Debugging small errors like variable reusage and managing efficient state updates.  

## Next Steps:  
- Implement advanced features like group chats and media sharing.  
- Enhance the UI/UX for better usability.  
- Integrate notification systems for message alerts.  
- Deploy the app for testing and feedback.  
