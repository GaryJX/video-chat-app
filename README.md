<!-- PROJECT LOGO -->
<div align="center">
  <img src="client/public/logo.svg" width="100">
  <h1 align="center">Video Chat App</h3>
  <img src="client/public/demo.jpg" style="border-radius: 4px;">
</div>

<!-- ABOUT THE PROJECT -->

## About This Project

A web application to connect online with others via video chat, using WebSocket and WebRTC protocols. View live demo at <a href="https://garyjx-video-chat.vercel.app/" target="_blank">garyjx-video-chat.vercel.app</a>

#### Built With

- TypeScript
- React
- Next.js
- WebRTC
- Tailwind CSS
- Socket.IO

<!-- GETTING STARTED -->

## Getting Started

#### Installation and Set Up

1. Clone the repository.
   ```sh
   git clone https://github.com/GaryJX/video-chat-app.git
   ```
2. `cd` into the `client` directory.
   ```sh
   cd video-chat-app/client
   ```
3. Install client dependencies.
   ```sh
   npm install
   ```
4. Start the front-end development server.
   ```sh
   npm run dev
   ```
5. Open the application at http://localhost:3000/
   <br>
6. In a new terminal, `cd` into the `server` directory.
   ```sh
   cd server
   ```
7. Install server dependencies
   ```sh
   npm install
   ```
8. Start the back-end development server.
   ```sh
   npm run dev
   ```

#### Production Deployment

- The `client` folder containing the front-end code is hosted on [Vercel](vercel.com), and is automatically rebuilt whenever a commit is pushed to the `main` branch
- The `server` folder containing the server-side code is hosted on [Heroku](https://heroku.com/). To trigger a re-deployment, push the changes to Heroku's remote Git repository:
  ```sh
  git subtree push --prefix server heroku main
  ```

#### Existing Bugs / Future Enhancements

- [ ] Currently, only 2 people can join a room at a time. I plan on allowing multiple people to join at once.
- [ ] Sometimes, if you toggle your camera/microphone on/off, the connection will break.
