# Minions - Household Helper Tools

[![Vue 3](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/vite-%5E6.3-blueviolet.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-~5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind_css-4.x-38B2AC.svg)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-~10.7-orange.svg)](https://pnpm.io/)

Welcome to Minions, your fun and friendly repository of helpful tools designed to simplify everyday household tasks!

This project is a Single Page Application (SPA) built with modern web technologies, focusing on a client-side experience with a playful "Minions" theme.

## Features

*   **Residence Bill Splitter:** Easily divide shared residence bills (e.g., water, electricity) based on the number of occupants per floor.
    *   Calculates share per head and per floor.
    *   Allows uploading multiple bill images (optional).
    *   Generates a downloadable PDF report including calculations, floor illustration, and attached bill images.
*   **Responsive Design:** Adapts smoothly to different screen sizes.
*   **"Minions" Theme:** A fun, yellow-and-blue theme inspired by the Minions!
*   **(More tools coming soon!)**

## Tech Stack

*   **Framework:** [Vue 3](https://vuejs.org/) (with `<script setup>` SFCs)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Routing:** [Vue Router v4](https://router.vuejs.org/)
*   **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF)
*   **DOM-to-Image:** [html2canvas](https://html2canvas.hertzen.com/)
*   **Package Manager:** [pnpm](https://pnpm.io/)

## Project Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd minions
    ```
2.  **Install dependencies using pnpm:**
    ```bash
    pnpm install
    ```
3.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
    The application will be available at `http://localhost:5173` (or the next available port).

## Development

*   The project follows standard Vue 3 + Vite conventions.
*   Components are organized under `src/components`, often grouped by feature (e.g., `src/components/bill-splitter`).
*   Views (pages) are located in `src/views`.
*   Shared TypeScript types are in `src/types.ts`.
*   Routing is configured in `src/router/index.ts`.
*   Global styles and Tailwind configuration are managed via `src/styles.css` and `tailwind.config.js` (implicitly handled by `@tailwindcss/vite`).
