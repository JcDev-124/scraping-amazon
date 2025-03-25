Here is a simple `README.md` file with the necessary instructions for setting up and running the project:

```markdown
# Amazon Scraper

This is a simple web scraper built with Express.js, Axios, and JSDOM. It allows you to search for products on Amazon based on a keyword and fetch product details like title, rating, reviews, and image.

## Requirements

- Node.js (version 16 or higher)
- Bun (for the backend server)
- npm (for frontend dependencies)
- A working internet connection to access Amazon

## Project Setup

### Backend (Server)

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd scraping-amazon
   ```

2. Navigate to the `backend` folder:

   ```bash
   cd backend
   ```

3. Install the required dependencies for the backend using **Bun**:

   ```bash
   bun install
   ```

4. Start the backend server:

   ```bash
   bun run serv.js
   ```

   The server will be running at `http://localhost:3000`.

### Frontend (Web Interface)

1. Navigate to the `frontend` folder:

   ```bash
   cd ../frontend
   ```

2. Install the required dependencies for the frontend:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be running at `http://localhost:5173`.

## How to Use

1. Open the frontend web interface at `http://localhost:5173`.
2. Enter a keyword (e.g., "laptop") in the search field and click **Search**.
3. The page will display a list of Amazon products related to your search.
4. You can click **Clear Search** to reset the search and try a new keyword.

## CORS

The backend uses the `cors` middleware to allow cross-origin requests from the frontend (running on a different port). Ensure that the backend is running before testing the frontend.

## Troubleshooting

- If you see a `CORS` error, ensure both the backend and frontend servers are running on their respective ports (`3000` for backend and `5173` for frontend).
- Ensure you have internet access since the scraper fetches data from Amazon.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Key Sections:
1. **Requirements**: Specifies the software versions and dependencies needed.
2. **Setup Instructions**: Details how to set up and run both the backend and frontend parts of the project.
3. **Usage**: Explains how to use the frontend to search for products.
4. **CORS Setup**: Mentions the need to have both backend and frontend servers running.
5. **Troubleshooting**: Provides advice on common issues like CORS errors.
6. **License**: Includes a placeholder for licensing.

This `README.md` should make it easier for someone to get started with your project!