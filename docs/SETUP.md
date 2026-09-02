# 🛠️ Appwrite & Local Environment Setup Guide

This guide provides step-by-step instructions to configure **Appwrite Cloud / Self-Hosted**, create the database and collection schema, set up environment variables, and launch the Expo development server.

---

## 1. Appwrite Project Configuration

1. Log in to [Appwrite Console](https://cloud.appwrite.io) (or your self-hosted instance).
2. Click **Create Project** and enter project details:
   - **Project Name**: `Book Tracker Mobile`
   - **Project ID**: (Auto-generated or custom, e.g., `6701a2b3001122334455`)

---

## 2. Add Platform Registration

1. In your Appwrite Project Dashboard, under **Platforms**, click **Add Platform**.
2. Select **Android App** (or iOS App):
   - **Name**: `Book Tracker`
   - **Package Name**: `com.anonymous.reactnativeexpobooktracker` (matches `app.json` package bundle ID)

---

## 3. Database & Collection Setup

### Create Database
1. In the left navigation, select **Database**.
2. Click **Create Database**:
   - **Database Name**: `Book Tracker Database`
   - **Database ID**: `book_tracker_db`

### Create Collection
1. Inside `book_tracker_db`, click **Create Collection**:
   - **Collection Name**: `books`
   - **Collection ID**: `books`

### Add Collection Attributes
Navigate to **Attributes** tab inside the `books` collection and add the following 4 attributes:

| Attribute Key | Type | Size / Range | Required | Description |
|---|---|---|---|---|
| `title` | String | 255 | Yes | Book title string |
| `author` | String | 255 | Yes | Author name string |
| `rating` | Integer | Min: 1, Max: 5 | Yes | Numerical rating out of 5 stars |
| `userId` | String | 255 | Yes | Appwrite User ID of owner |

### Configure Permissions & Document Security
1. Navigate to **Settings** tab in the `books` collection.
2. Under **Permissions**, grant access roles:
   - **Role**: `users` (or `any`) -> Enable **Create**, **Read**, **Update**, **Delete**.
3. Enable **Document Security** so documents are isolated by ownership.

---

## 4. Local Environment Configuration (`.env`)

In the root directory of your cloned repository, create a `.env` file containing your Appwrite credentials:

```env
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
EXPO_PUBLIC_APPWRITE_PROJECT_ID=6701a2b3001122334455
EXPO_PUBLIC_APPWRITE_DATABASE_ID=book_tracker_db
EXPO_PUBLIC_APPWRITE_COLLECTION_ID=books
```

> ⚠️ **Note**: Environment variable names MUST match `EXPO_PUBLIC_APPWRITE_*` exactly as read by `lib/appwrite.js`.

---

## 5. Running the Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Expo Development Server**:
   ```bash
   npx expo start
   ```

3. **Launch on Mobile Device / Emulator**:
   - **Physical Device**: Scan the generated QR code using the **Expo Go** app (iOS/Android).
   - **Android Emulator**: Press `a` in the terminal.
   - **iOS Simulator**: Press `i` in the terminal.
