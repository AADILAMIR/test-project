# Record Wizard

A modern, production-ready Vue 3 + TypeScript application built with Vite, TailwindCSS, and Zod-powered validation. Features include a multi-step record creation wizard, dynamic seal tab input, drag-and-drop file uploads, and a responsive admin dashboard UI.

---

## 📸 UI Highlights

### Dashboard
<img width="971" height="576" alt="image" src="https://github.com/user-attachments/assets/5accde83-d4c9-416d-a120-ec385fedb0f4" />

- Summary cards for records submitted, pending, and processed.
- Quick actions to navigate and manage data efficiently.

### Add Record Wizard

- Step-based form (3 steps):
  1. Basic information
  2. OPJ/Review details
  3. Dynamic Seals tab with validations and file uploads
- Real-time form validation using **vee-validate + Zod**
- Drag & drop support with file previews

---

## Tech Stack

| Layer             | Tech                                |
| ----------------- | ----------------------------------- |
| **Frontend**      | Vue 3 + TypeScript                  |
| **Tooling**       | Vite, Yarn, Husky, ESLint, Prettier |
| **Validation**    | vee-validate + Zod                  |
| **Styling**       | Tailwind CSS + PostCSS              |
| **Routing**       | Vue Router                          |
| **UI Add-ons**    | Heroicons, Date-Time Picker         |
| **Notifications** | vue-toast-notification              |
| **Docker**        | Node 20.19 + NGINX (SPA-ready)      |

---

## 📦 Installation

> Requires **Node.js v20.19+** and **Yarn**

```bash
# Clone the project
git clone https://github.com/your-username/test-project.git
cd test-project

# Install dependencies
yarn install
```

---

## Development

```bash
yarn dev
```

Access the app at: [http://localhost:5173](http://localhost:5173)

---

## Build & Preview

```bash
# Create a production build
yarn build

# Preview the production build locally
yarn preview
```

---

## Lint & Format

```bash
# Fix ESLint issues
yarn lint

# Format code with Prettier
yarn format
```

---

## 🐳 Docker Support

### Build Docker Image

```bash
docker build -t vue-app .
```

### Run the Container

```bash
docker run -p 80:80 vue-app
```

> ℹ️ The app is served with `nginx.conf` configured for SPA routing.

Here’s the updated section of your `README.md` with **Docker Compose** support added alongside the existing Docker CLI commands:

### Docker Compose (Recommended for Teams & CI/CD)

`docker-compose.yaml` file configured:

#### Build & Start the App

```bash
docker-compose up --build -d
```

#### Stop the App

```bash
docker-compose down
```

#### Rebuild Without Cache

```bash
docker-compose build --no-cache
```

---

## Git Hooks (Husky)

To enable Husky Git hooks:

```bash
yarn prepare
```

---

## Project Structure

```
.
├── public/                 # Static assets
├── src/                    # Components, views, composables
├── .github/workflows/     # GitHub Actions CI/CD configs
├── .husky/                # Git hooks
├── Dockerfile             # Docker config for production
├── nginx.conf             # NGINX SPA config
├── compose.yaml           # (Optional) Docker Compose setup
├── package.json           # Scripts and dependencies
└── README.md              # Project info
```

---

## Available Scripts

| Command        | Description                      |
| -------------- | -------------------------------- |
| `yarn dev`     | Start Vite dev server            |
| `yarn build`   | Production build with type check |
| `yarn preview` | Serve built app locally          |
| `yarn lint`    | Fix ESLint issues                |
| `yarn format`  | Format code with Prettier        |
| `yarn prepare` | Set up Git hooks with Husky      |

---

### Improvements

1. Unit & E2E Tests: Add Vitest and Playwright for component and end-to-end testing.
2. API Integration: Centralize API calls using Axios with proper error handling and .env configuration.
3. PWA Support: Enable offline access and installability using vite-plugin-pwa.
