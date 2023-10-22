# IoT Link Nexus Project

The IoT Link Nexus project is a web application built using Next.js and Node.js, enabling users to monitor and control IoT devices through Firebase Realtime/Firestore. The project includes features such as user authentication, real-time data display, error logging, and the ability to capture and download snapshots of the dashboard.

### Note:
  - If you want to upgrade it or like to add some features or want to do any enhancement, please feel free to fork or create your own feature branch and raise a pull request.
  I'ld be glad to new features on top of it. Thank you.
  
## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [How to set Rules for Firebase](#how-to-set-rules-for-firebase)
- [How to Run](#how-to-run)
- [How to Deploy as a Containerized App](#how-to-deploy-as-a-containerized-app)
- [Screenshot](#screenshot)
- [Conclusion](#conclusion)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contribute](#contribute)

## Features

- User authentication with Firebase.
- Real-time data display for humidity and temperature from IoT devices.
- Toggle switch to control live status of IoT devices.
- Error logging with detailed error information.
- Snapshot capture and download functionality for the dashboard.
- Redis caching implemented.
- Internationalization to support local languages.

## Project Structure

The project is divided into the following components and utilities:

### Client

- `(auth)`: For login & register.
- `api`: Contains server related actions.
- `components`: Contains UI components.
- `constants`: Contains constant files.
- `libs`: Libraries.
- `pages`: Contains different pages of the web application.
- `redux`: Redux store configuration and slices.
- `utils`: Contains multiple utility files.
- `firebase`: Firebase configuration file.
- `public`: Contains images and shared data.

### Server

- `i18n`: Internationalization server.
- `locales`: Contains JSON language files.
- `middleware`: for error logging.
- `webSocket`: webSocket server.

### IoT_Device
- micropython files to get temperature and humidity data.

## How to set Rules for Firebase

In Firebase Real-time Database you can set rules to prevent un-authorised access. Below is some example how you can restrict. It can be made more complex according to project need.

```json
{
  "rules": {
    ".read": false,
    ".write": false,

    "power": {
      ".read": true, // Allow read access to the "power" key
      ".write": true // Allow write access to the "power" key
    },

    "sensor": {
      ".read": true, // Allow read access to the "sensor" key
      ".write": true // Allow write access to the "sensor" key
    }
  }
}
```

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/Virtuallified/IoT_Link_Nexus.git
   ```
2. Navigate to the project directory:
   `cd iot-link-nexus`

3. Install dependencies:
   `npm install`

4. Create a `.env.local` file in the root directory and add your Firebase configuration:
   `NEXT_PUBLIC_APP_SECRET_KET=your-secret-key`
   `NEXT_PUBLIC_REDIS_URL=your-redis-connection-url`

5. Run the Next.js app (Client):
   `npm run dev`

6. Run the Node.js app (Server):
   `npm start` | - production
   `npm hotreload` | - development

7. Access the app at `http://localhost:3000`.

8. To try out different languages in DEV, please follow the steps below -
   - Open Chrome
   - Goto `Inspect` element
   - Click: triple dots (...)
   - Click: More tools
   - Click: Sensors
   - Select location `Others...`
   - Enter `en` or `bn`, etc in locale

## How to Deploy as a Containerized App

1.  Install Docker and Docker Compose on your system.
2.  Build the Docker images:

    `docker-compose build`

3.  Start the multi-container application:

    `docker-compose up -d`

4.  Access the Next.js app at `http://localhost/`.
5.  Communicate with the Node.js app with Socket.IO & i18n agent at `3011` & `3012` port accordingly..
6.  To stop and remove the containers while preserving data volumes:

    `docker-compose down`

    To remove the containers and associated volumes:

    `docker-compose down -v`

## Screenshot
  1. ### Dashboard
![dash](https://github.com/Virtuallified/IoT_Link_Nexus/assets/64164597/68934b87-89e3-4819-8007-8fb8c202dd48)
  
  2. ### Running on Docker Container
![dock](https://github.com/Virtuallified/IoT_Link_Nexus/assets/64164597/7b58a29b-9723-4dbe-9171-05872125478f)

## Conclusion

The IoT Link Nexus project provides an efficient and user-friendly way to manage IoT devices, monitor data in real-time, and capture snapshots of the dashboard. Whether you want to run it in a normal environment or containerized using Docker, this project simplifies the process of IoT device management.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://chat.openai.com/c/LICENSE.md) file for details.

## Acknowledgments

Special thanks to the contributors and open-source libraries that made this project possible.

## Contribute

Please feel free to contribute and add your own features to the project if you like to enrich the repo.
