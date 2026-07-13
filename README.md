<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=24&pause=1000&color=4694F8&center=true&vCenter=true&width=600&lines=HealthBridge+%F0%9F%8F%A5;AI-Powered+Telehealth+Platform;Smart+Triage+%C2%B7+Secure+Auth+%C2%B7+PDF+Docs" alt="HealthBridge" />

<br/>

<p>A fullstack telehealth platform with AI-assisted symptom triage, appointment management, and secure medical documentation — all in one clean interface.</p>

<br/>

[![Live Demo](https://img.shields.io/badge/Live_Demo-healthbridge--rho.vercel.app-4694F8?style=for-the-badge&logo=vercel&logoColor=white)](https://healthbridge-rho.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-83.7%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://github.com/ShelbyG2/Healthbridge)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

</div>

---

## ⌁ What is HealthBridge?

HealthBridge is an AI-powered telehealth appointment platform designed to make healthcare access smarter and more efficient. Patients can describe their symptoms, get triaged by an AI layer, book appointments with relevant providers, and receive secure PDF-based documentation — all without friction.

---

## ✦ Features

- **🤖 AI Smart Triage** — OpenAI-powered symptom analysis routes patients to the right care level before they even book
- **📅 Appointment Management** — Schedule, view, and manage consultations through a clean dashboard
- **🔐 Secure Authentication** — JWT-based auth with protected routes for both patients and providers
- **📄 PDF Documentation** — Auto-generated visit summaries and medical records exported as PDFs
- **⚡ Animated UI** — Smooth transitions and interactions powered by Framer Motion
- **📱 Responsive Design** — Works across desktop and mobile with a Tailwind-first layout

---

## 🛠 Tech Stack

<div align="center">

**Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**AI & Infra**

![OpenAI](https://img.shields.io/badge/OpenAI_API-412991?style=for-the-badge&logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 📁 Project Structure

```
healthbridge/
├── client/          # React + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   └── package.json
├── server/          # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── package.json
└── package.json     # Root — runs both concurrently
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB instance (local or Atlas)
- OpenAI API key

### Clone & Install

```bash
git clone https://github.com/ShelbyG2/Healthbridge.git
cd Healthbridge
npm install
cd client && npm install
cd ../server && npm install
```

### Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000
```

### Run in Development

```bash
# From project root — starts both client and server
npm run dev
```

| Service  | URL                    |
|----------|------------------------|
| Client   | http://localhost:5173  |
| Server   | http://localhost:5000  |

### Build for Production

```bash
npm run build
```

---

## 🌐 Deployment

The client is deployed on **Vercel**. For the server, any Node.js host works (Railway, Render, Fly.io).

```bash
# Build client only
npm run build:client

# Build server only
npm run build:server
```

---

## 🗺 Roadmap

- [ ] Video consultation support
- [ ] Real-time chat between patient and provider
- [ ] Doctor availability calendar
- [ ] Prescription management
- [ ] Mobile app (React Native)

---

## 👤 Author

**Joseph Njenga (ShelbyG2)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/njenga-joseph-2528112b1)
[![X](https://img.shields.io/badge/X-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/pickyblind_ass)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:wailerjengaa@gmail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-shelbydev.tech-4694F8?style=for-the-badge&logo=vercel&logoColor=white)](https://shelbydev.tech)

---

<div align="center">
  <sub><i>"Clean code always looks like it was written by someone who cares."</i></sub>
</div>
