# SmartBrain - Advanced Face Detection App

SmartBrain is a modern web application that detects faces in images using advanced AI algorithms. It provides a simple and intuitive user interface for face detection in images through URL input.

## Features

- 👤 **Advanced Face Detection**: Detect multiple faces in images with high accuracy
- 🔒 **User Authentication**: Secure login and registration with Firebase
- 📊 **Dashboard**: Track your face detection history and activities
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Performance**: Built with Vue 3 and Vite for optimal performance

## Tech Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Authentication
- **API Integration**: Axios
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/smartbrain-frontend.git
cd smartbrain-frontend
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and visit `http://localhost:3000`

## Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Deployment

The application can be deployed to any static site hosting service like:
- Netlify
- Vercel
- Firebase Hosting
- GitHub Pages

## Project Structure

```
smartbrain-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   └── ui/          # UI components (buttons, loaders, etc.)
│   ├── stores/          # Pinia stores
│   ├── views/           # Page components
│   │   ├── auth/        # Authentication pages
│   │   └── dashboard/   # Dashboard pages
│   ├── App.vue          # Root component
│   ├── main.js          # Application entry point
│   └── router.js        # Vue Router configuration
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── package.json         # Project dependencies and scripts
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Clarifai API](https://www.clarifai.com/) for face detection functionality
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Firebase](https://firebase.google.com/) for authentication
- [Vue.js](https://vuejs.org/) for the frontend framework
