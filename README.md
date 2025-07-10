# 📱 Event Buddy

**Event Buddy** is a modern mobile application built with **React Native** and **Expo**, designed to help users discover, explore, and manage events effortlessly.

It features secure authentication using Firebase, allowing users to sign up, log in, recover passwords, and manage their profiles. Users can browse upcoming events, view detailed information, mark favorites, and confirm participation.

---

## 🚀 Features

- 🔐 Firebase Authentication (sign up, login, password recovery)
- 🗓️ Event listing with date and time
- ⭐ Add/remove favorite events
- ✅ Join or leave event participation
- 📍 View event location via Google Maps
- 👤 Edit profile (name and birthdate)
- 💚 Clean, responsive user interface

---

## 📦 Requirements

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase account with Firestore and Authentication enabled

---

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/monica-evelin/EventBuddy.git
cd EventBuddy

2. Install dependencies:
npm install
# or
yarn install

3. Create a firebaseConfig.js file in the root directory:
// firebaseConfig.js
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

4. Run the app:
expo start

🧱 Project Structure
.
├── assets/               # Icons and images
├── components/           # Reusable components (e.g., Background)
├── context/              # Authentication context
├── Navigators/           # Tab and stack navigators
├── screens/              # Main app screens
├── styles/               # Global styles
├── firebaseConfig.js     # Firebase configuration
├── App.js                # Main app file
├── README.md             # Project documentation
└── screenshots/          # Screenshots for the README

🧪 Completed Features

| Feature                         | Status |
| ------------------------------- | ------ |
| Firebase auth (login/signup)    | ✅      |
| Password recovery               | ✅      |
| Event listing + details         | ✅      |
| Join/cancel event participation | ✅      |
| Favorites system                | ✅      |
| Google Maps integration         | ✅      |
| Profile editing (name & DOB)    | ✅      |
| Profile picture upload          | ✅      |
| Responsive UI                   | ✅      |

📸 Screenshots

🔐 Login Screen
![Login Screen](https://github.com/user-attachments/assets/7879d79c-fa18-4c2e-92fe-cc6c1fcaea79)

📝 Signup Screen
![Signup Screen](https://github.com/user-attachments/assets/68ebb07f-e706-4039-bcb5-d6b6af1eaba5)

🗓️ Events List
![Events List](https://github.com/user-attachments/assets/73df96b5-5deb-4616-af9d-58cebefbcf6e)

📄 Event Details
![Event Details](https://github.com/user-attachments/assets/04fdf3e6-c777-448c-b26c-c4055b9fd7b7)

⭐ Favorites
![Favorites](https://github.com/user-attachments/assets/56424a42-f131-4343-a2d3-261f4962c0df)

👤 Profile
![Profile](https://github.com/user-attachments/assets/cc86a7cc-7cf0-419b-a355-91fa1c7e7b87)

🔁 Password Recovery
![Recover Password](https://github.com/user-attachments/assets/a1d7c97e-247b-4413-9447-e612f249d012)

📫 Contact
Developed by Monica Oliveira
GitHub: @monica-evelin
Email: monica.evelin@hotmail.com
```
