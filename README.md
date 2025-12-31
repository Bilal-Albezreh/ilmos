# IlmOS: Interactive Learning Platform

**Live Demo:** [https://ilmos.vercel.app](https://ilmos.vercel.app)

**IlmOS** is a modern Learning Management System (LMS) designed to digitize classical texts. It transforms static manuscripts into interactive experiences with progress tracking, assessment engines, and cloud synchronization.

Built with **Next.js 14**, **TypeScript**, and **Supabase**, it features a responsive reading interface that supports bilingual texts (Arabic/English) and real-time state management.

## 🚀 Key Features

* **Cloud-Synced Progress:** A custom sync engine tracks reading progress (chapter/section precision) and saves it to a PostgreSQL database, allowing users to switch devices seamlessly.
* **Secure Authentication:** Full user management system using Supabase Auth with Row Level Security (RLS) policies to ensure data privacy.
* **Interactive Assessment:** Dynamic quiz engine with instant feedback, scoring logic, and permanent result storage.
* **Bilingual Reader Interface:** Toggleable Arabic/English views with rich formatting, video integration, and "Takeaways" modals.
* **Gamified Dashboard:** Visual analytics, progress bars, and achievement badges to drive user retention.

## 🛠️ Technical Stack

* **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS.
* **Backend:** Supabase (PostgreSQL, Auth, Realtime APIs).
* **State Management:** React Hooks & Optimistic UI updates.
* **Deployment:** Vercel (CI/CD, Edge Network).
* **Icons:** Lucide React.

## 🗄️ Database Schema

The backend relies on a relational PostgreSQL schema:

* **`profiles`**: Extends auth users with custom metadata (Role, Full Name).
* **`courses`**: Stores course metadata (Title, Description, Section Count).
* **`progress`**: Relational table tracking `(user_id, course_id)` with percentage completion.
* **`exam_results`**: Immutable record of quiz attempts and scores.


## 🔮 Future Roadmap

* **Spaced Repetition:** automated flashcard generation based on user quiz performance.
* **Social Learning:** Leaderboards and study groups.

## 👨‍💻 Author

**Bilal Albezreh**
*Systems Design Engineering @ University of Waterloo*
