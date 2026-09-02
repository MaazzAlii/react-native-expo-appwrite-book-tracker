# 🎯 Standalone Practice Screens & Hub Documentation

This document describes the design, layout architecture, and user interaction flows for the standalone practice screens contained inside the `app/(practice)` route group.

---

## 🏛️ Route Group Architecture (`app/(practice)`)

To keep the primary protected Dashboard clean (**exactly 3 tabs**: `My Books`, `Add Book`, `Profile`), the practice screens reside in a dedicated `(practice)` route group with its own Stack layout (`_layout.jsx`) and context wrapper (`BooksProvider`).

Access to the practice screens hub is available via the **Practice Screens Hub** button on the `Profile` screen.

```
app/(practice)/
├── _layout.jsx         # Stack Navigation Layout & BooksProvider
├── index.jsx           # Practice Screens Hub Screen
├── search.jsx          # Search & Star Filter Screen
├── stats.jsx           # Reading Statistics Screen
└── goal.jsx            # Annual Goal Tracker Screen
```

---

## 📱 Practice Screens Overview

### 1. 🎯 Practice Hub (`index.jsx`)
- **Route**: `/(practice)`
- **Description**: Central portal listing feature cards for each standalone practice demonstration.
- **Navigation**: Provides direct buttons to open Search & Filter, Reading Stats, Annual Goal, or return to Profile.

### 2. 🔍 Search & Star Filter (`search.jsx`)
- **Route**: `/(practice)/search`
- **Features**:
  - **Text Filter**: Real-time string matching against book title and author fields.
  - **Rating Chips**: Horizontally scrollable star rating filter chips (`All`, `5 ⭐`, `4 ⭐`, `3 ⭐`, `2 ⭐`, `1 ⭐`).
  - **Filtered List**: Dynamic `<FlatList>` updating results live based on query string and selected rating filter.
  - **Empty State Card**: Displays friendly advice when no books match the applied criteria.

### 3. 📊 Reading Statistics (`stats.jsx`)
- **Route**: `/(practice)/stats`
- **Features**:
  - **Summary Cards**: Displays total library count and overall average star rating (`X.X ⭐`).
  - **Highest Rated Title**: Dynamically computes and displays the highest-rated book in the library.
  - **Rating Breakdown**: Renders a visual bar chart distributing books across 1 to 5 star tiers with percentage width calculations.

### 4. 🎯 Annual Goal Tracker (`goal.jsx`)
- **Route**: `/(practice)/goal`
- **Features**:
  - **Goal Stepper**: Stepper controls (`-` / `+`) allowing users to adjust their annual reading target.
  - **Progress Visualizer**: Percentage completion indicator and dynamic colored progress bar.
  - **Milestone Alert Banner**: Triggers celebration banner (`🎉🏆 LEVEL COMPLETE!`) when current book count meets or exceeds the target goal.
