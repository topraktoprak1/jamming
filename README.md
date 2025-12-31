Here’s a cleaner, more professional, and visually appealing **README.md** you can drop straight into your project. I kept everything accurate, just improved structure, wording, and developer friendliness.

---

# 🎵 Jammming

**Jammming** is a React-based web application that lets users search for music using the **Spotify Web API**, build custom playlists, and save them directly to their Spotify account.

This project was built as part of a learning journey with React, API integration, and modern frontend tooling.

---

## ✨ Features

* 🔍 Search tracks, artists, or albums via Spotify
* ➕ Add songs to a custom playlist
* ➖ Remove songs from the playlist
* 💾 Save playlists directly to your Spotify account
* ⚡ Fast development with Vite
* 🐳 Optional Docker support for easy deployment

---

## 🛠️ Technologies Used

* **React** (Vite)
* **JavaScript (ES6+)**
* **CSS Modules**
* **Spotify Web API**
* **Docker & Docker Compose**

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

* **Node.js** (v16 or higher recommended)
* **npm** or **yarn**
* **Spotify Developer Account** (for API credentials)
* **Docker** (optional, for containerized setup)

---

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Jammming
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Spotify API credentials**

   Create a `.env` file in the root directory and add:

   ```env
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
   VITE_SPOTIFY_REDIRECT_URI=http://localhost:3000/
   ```

   > ⚠️ Make sure your redirect URI matches the one configured in your Spotify Developer Dashboard.

---

## ▶️ Running the App

Start the development server:

```bash
npm run dev
# or
yarn dev
```

The app will be available at:

👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🐳 Running with Docker (Optional)

To build and start the app using Docker:

```bash
docker-compose up --build
```

This will run the application in a containerized environment.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

---

## 📁 Project Structure

```text
Jammming/
├── application/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── styles/
│   └── util/
├── Dockerfile
├── docker-compose.yml
├── package.json
├── vite.config.js
└── README.md
```

---

## 📄 License

This project is intended for **educational purposes only**.

---

## 🙏 Acknowledgments

* [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
* [Codecademy](https://www.codecademy.com/)

---


