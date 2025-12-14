# Classroom Agents Web

A web application for creating interactive audio rooms, recording and transcribing audio, and asking questions to Gemini AI about the recorded content. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- **Create Rooms:** Create new rooms with a name and description.
- **Record Audio:** Record audio directly in the browser, with automatic chunked uploads and optimized for speech.
- **Automatic Transcription:** Audio is transcribed automatically and made available for AI-powered Q&A.
- **Ask Questions:** Submit questions about the transcribed content and receive intelligent answers from the AI.
- **Room Management:** View a list of active rooms and join any room to interact with its content.
- **Responsive UI:** Beautiful, modern, and responsive interface using Tailwind CSS and custom UI components.

## Tech Stack

- **React 19** with functional components and hooks
- **TypeScript** for type safety
- **Vite** for fast development and build
- **Tailwind CSS** for styling
- **React Query** for data fetching and caching
- **Zod** for schema validation
- **Day.js** for date formatting and relative time
- **Radix UI** for accessible UI primitives

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to use the app.

> **Note:** The backend API should be running locally at `http://localhost:3333` for full functionality.

---

## Project Structure

```
src/
  components/
    create-room-form.tsx
    footer.tsx
    project-flow-badge.tsx
    question-form.tsx
    question-item.tsx
    question-list.tsx
    room-list.tsx
    ui/
      badge.tsx
      button.tsx
      card.tsx
      form.tsx
      input.tsx
      label.tsx
      textarea.tsx
  pages/
    create-room.tsx
    record-room-audio.tsx
    room.tsx
```

### File Descriptions

#### components/

- **create-room-form.tsx**  
  Form component for creating a new room, including validation and submission logic.

- **footer.tsx**  
  Footer section with FAQ and social links, displayed at the bottom of main pages.

- **project-flow-badge.tsx**  
  Visual badge showing the step-by-step flow of the project (create room, record audio, etc.).

- **question-form.tsx**  
  Form for submitting questions to the AI about the room's content.

- **question-item.tsx**  
  Displays a single question and its answer (or loading state) in the question list.

- **question-list.tsx**  
  Lists all questions for a given room, using the `question-item` component.

- **room-list.tsx**  
  Lists all available rooms, allowing users to select and enter a room.

##### components/ui/

- **badge.tsx**  
  Reusable badge component for status or labels.

- **button.tsx**  
  Reusable button component with style variants.

- **card.tsx**  
  Card layout component for grouping content visually.

- **form.tsx**  
  Utilities and wrappers for building forms with React Hook Form.

- **input.tsx**  
  Styled input field component.

- **label.tsx**  
  Styled label component for form fields.

- **textarea.tsx**  
  Styled textarea component for multi-line input.

#### pages/

- **create-room.tsx**  
  Page for creating a new room and viewing the list of existing rooms.

- **record-room-audio.tsx**  
  Page for recording audio in a room, handling audio capture and upload.

- **room.tsx**  
  Main room page, displaying room details, the question form, and the list of questions and answers.

---

## Customization

- Update the API endpoints in the hooks under `src/http/` if your backend URL changes.
- Tailwind and theme variables can be customized in `src/index.css`.

## License

This project is for educational and portfolio purposes.
