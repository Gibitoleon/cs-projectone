# Lost and Found System for Universities

A smart Lost and Found system built specifically for university environments — designed to streamline the process of reporting, tracking, and recovering lost or found items on campus.

The platform enables students, staff, and faculty to report items in real time, upload images, and search intelligently using AI-powered semantic search.

##  Purpose

To reduce the time, stress, and inefficiency of traditional noticeboards and manual reporting by providing a centralized, digital solution tailored to campus life.

##  Key Features

-  User registration and JWT-based authentication
-  Report lost or found items with image upload (via Cloudinary)
-  **Context-aware semantic search** using a Python microservice powered by OpenAI’s CLIP model  
    Users can describe items in different ways (e.g., “laptop bag” vs. “black zipped pouch”), and the system retrieves relevant matches using vector similarity — not just keywords.
-  Real-time updates and notifications with Socket.IO
-  Filter and search items by category, location, or time reported
-  Admin dashboard for managing and moderating reported items

##  Semantic Search with CLIP

The system includes a Python-based microservice that uses [OpenAI’s CLIP](https://openai.com/research/clip) model to convert both item descriptions and image data into vectors. This allows for:

- Matching items based on **meaning**, not just exact text
- Improved search results when users use different wording
- A smarter, more forgiving search experience — closer to how humans think

## 🛠 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Image Uploads:** Cloudinary
- **Real-Time Updates:** Socket.IO
- **Semantic Search:** Python microservice + OpenAI CLIP + vector embeddings

---

🚧 
