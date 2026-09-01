# Appwrite Database & Collection Schema

This document specifies the database structure for the **Book Tracker** mobile application on Appwrite Cloud / Self-hosted.

---

## 🗄️ Database
- **Database Name**: `Book Tracker Database`
- **Database ID**: `book_tracker_db` (configured via `EXPO_PUBLIC_APPWRITE_DATABASE_ID`)

---

## 📚 Collection: `books`
- **Collection Name**: `books`
- **Collection ID**: `books` (configured via `EXPO_PUBLIC_APPWRITE_COLLECTION_ID`)

### Attributes

| Attribute Key | Type | Size / Limits | Required | Description |
|---|---|---|---|---|
| `title` | String | 255 | Yes | Title of the book |
| `author` | String | 255 | Yes | Author name |
| `rating` | Integer | Min: 1, Max: 5 | Yes | Rating out of 5 stars |
| `userId` | String | 255 | Yes | Appwrite User ID of the owner |

---

## 🔐 Permissions & Security
- **Permissions Mode**: Collection-level or Document-level permissions.
- **Roles**:
  - `role:all` or `role:users` -> Create, Read, Update, Delete access.
  - Documents are queried with `Query.equal('userId', userId)` to restrict view to the authenticated owner.
