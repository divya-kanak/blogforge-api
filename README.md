# BlogForge API 🖊️

A production-ready RESTful Blog API built with Node.js, Express, 
TypeScript, Prisma ORM and PostgreSQL — featuring authentication, 
role-based access, content management, and social interactions.

[![Node.js](https://img.shields.io/badge/Node.js-v20-green)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)]()
[![Prisma](https://img.shields.io/badge/Prisma-ORM-purple)]()
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v12+-blue)]()
[![Express](https://img.shields.io/badge/Express.js-4.x-black)]()

---

## ✨ Features

- 🔐 **Authentication** — Register, login, and secure routes using JWT tokens
- 👤 **User Management** — User profiles with role-based access control
- 📝 **Posts** — Full CRUD with categories and tags support
- 💬 **Comments** — Comment on posts with full CRUD operations
- 🔍 **Search** — Search posts by keyword, category, or tag
- 📄 **Pagination** — Paginated responses for posts and comments
- 🖼️ **File Upload** — Upload images for posts and user profiles
- 🛡️ **Middleware** — Request validation, error handling, and auth middleware
- 🗄️ **Prisma Studio** — Visual database browser for development

---

## 🧩 Requirements

- **Node.js**: v20.x or higher
- **npm**: v9.x or higher
- **PostgreSQL**: v12 or higher

---

## 📂 Project Structure

```
blogforge-api/
│── src/
│   ├── index.ts                # Express server entry point
│   ├── Controllers/            # Route controllers
│   ├── Validators/             # Request validation logic
│   ├── helpers/                # Utility functions
│   ├── middlewares/            # Auth, error, validation middleware
│   └── routes/                 # API route definitions
│── prisma/
│   ├── schema.prisma           # Prisma schema
│   └── migrations/             # Prisma migrations
│── package.json
│── tsconfig.json
│── .env.example
│── README.md
```

---

## ⚙️ Installation

1. **Clone the repository**
```bash
    git clone https://github.com/your-username/blogforge-api.git
    cd blogforge-api
```

2. **Install dependencies**
```bash
    npm install
```

---

## 🛠️ Prisma Setup

1. **Configure your database connection**

    Copy `.env.example` to `.env` and update values:

```env
    DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/BlogDB?schema=Prisma"
    HOST=localhost
    PORT=3000
    JWT_SECRET=your_jwt_secret_key
```

2. **Run Prisma migrations**

```bash
    npx prisma migrate dev --name init
```

3. **Generate Prisma client**

```bash
    npx prisma generate
```

4. **(Optional) Open Prisma Studio**

```bash
    npx prisma studio
```
    Opens a local DB browser at `http://localhost:5555`

---

## 🚦 Running the App

- **Development mode (with hot reload):**
```bash
    npm run dev
```

- **Build for production:**
```bash
    npm run build
```

- **Start production server:**
```bash
    npm start
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | ❌ |
| POST | /api/auth/login | Login and get JWT token | ❌ |

### Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/users | Get all users | ✅ Admin |
| GET | /api/users/:id | Get user profile | ✅ |
| PUT | /api/users/:id | Update user profile | ✅ |
| DELETE | /api/users/:id | Delete user | ✅ Admin |

### Posts
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/posts | Get all posts (paginated) | ❌ |
| GET | /api/posts/:id | Get single post | ❌ |
| GET | /api/posts/search | Search posts | ❌ |
| POST | /api/posts | Create post | ✅ |
| PUT | /api/posts/:id | Update post | ✅ |
| DELETE | /api/posts/:id | Delete post | ✅ |

### Categories & Tags
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/categories | Get all categories | ❌ |
| POST | /api/categories | Create category | ✅ Admin |
| GET | /api/tags | Get all tags | ❌ |
| POST | /api/tags | Create tag | ✅ Admin |

### Comments
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/posts/:id/comments | Get post comments | ❌ |
| POST | /api/posts/:id/comments | Add comment | ✅ |
| PUT | /api/comments/:id | Update comment | ✅ |
| DELETE | /api/comments/:id | Delete comment | ✅ |

### File Upload
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/upload | Upload image | ✅ |

---

## 📌 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| TypeScript | Type safety |
| Prisma ORM | Database ORM |
| PostgreSQL | Database |
| JWT | Authentication |
| Multer | File uploads |

---

## 🔒 Authentication

This API uses **JWT (JSON Web Tokens)** for authentication.

Include the token in your request headers:
```
Authorization: Bearer <your_jwt_token>
```

---

## 📄 Pagination

Paginated endpoints accept these query parameters:
```
GET /api/posts?page=1&limit=10
```

Response includes:
```json
{
  "data": [],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

---

## 👩‍💻 Author

**Divya Kanak** — Senior Technical Lead

Building platforms with soul 🌿

[LinkedIn](https://www.linkedin.com/in/divya-kanak/) | 
[Medium](https://medium.com/kanak-club) | 
[Topmate](https://topmate.io/divyakanak)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).