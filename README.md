# Transfer AngularJS 🚀

> **Simple Bank Transfer Application** built with **AngularJS 1.x**, focusing on usability, accessibility, and user experience.  
> Allows simulating a transfer between accounts with validation, confirmation, and result, including dynamic success/error notifications.

---

## 🔹 Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Project Architecture](#project-architecture)
- [Setup & Installation](#setup--installation)
- [Controllers & Services Structure](#controllers--services-structure)
- [Accessibility](#accessibility)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## 🔹 Demo

> Screenshots and GIFs can be added here to show the user experience.  
> Example: step 1 → input, step 2 → verify, step 3 → result.

---

## 🔹 Features

- **Complete Transfer Flow:**

  - Account and amount input
  - Field validation
  - Transfer confirmation
  - Result with success/error messages

- **Temporary Data Storage:**

  - `StorageService` keeps data across steps without relying on a backend

- **Step Navigation:**

  - Smart step management with `StepsService`
  - Prevents users from going back incorrectly

- **Dynamic Notifications:**

  - Success/error messages (`result-message`)
  - Bounce-in animation effect
  - Updated in real-time via AngularJS

- **Accessibility (ARIA + Keyboard):**

  - Inputs and buttons with proper labels and roles
  - Toast notifications with `aria-live="polite"` and `role="status"`
  - Fully navigable via keyboard

- **Modular AngularJS Architecture:**
  - Separate Controllers, Services, and Config
  - Easy to maintain and scale

---

## 🔹 Technologies

- AngularJS 1.8.x
- HTML5, CSS3 (animations and responsive design)
- JavaScript ES6
- JSON Server (mock data)
- Node.js and NPM (for local development)

---

## 🔹 Project Architecture

```text
transfer-angular-js/
│
├─ index.html                # Main layout and global container
├─ app/
│   ├─ components/
│   │   ├─ steps/
│   │   │   ├─ steps.component.js
│   │   │   └─ steps.template.html
│   │   └─ toast/
│   │       ├─ toast.component.js
│   │       └─ toast.css
│   ├─ controllers/
│   │   ├─ ResultController.js
│   │   └─ TransferController.js
│   ├─ directives/
│   │   └─ currencyMask.directive.js
│   ├─ services/
│   │   ├─ steps.service.js
│   │   ├─ storage.service.js
│   │   ├─ toast.service.js
│   │   └─ TransferService.js
│   └─ views/
│       ├─ transfer-input.html
│       ├─ transfer-result.html
│       └─ transfer-verify.html
├─ app.js
├─ app.routes.js
├─ styles.css
├─ db.json                   # Mock data for JSON Server
├─ package.json
├─ package-lock.json
└─ README.md
```
