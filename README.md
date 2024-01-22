# ScrapeNext

ScrapeNext is a Vue project designed to allow users to track Amazon products. It fetches product information based on user input, updates existing entries in the database, or adds new ones. The project includes cron jobs for regular updates and email notifications to users who track specific products.

## Setup Instructions

### Clone Repository

```bash
git clone https://github.com/averrois/ScrapeNext
cd ScrapeNext
```

### Client Side Setup

```bash
# Navigate fo client side directory
cd client

# Install dependencies
bun install

# Run the development server
bun run dev
```

### Server Side Setup

```bash
# Navigate fo server side directory
cd server

# Install dependencies
bun install

# Run the development server
bun index.ts
```

Visit [http://localhost:5173/](http://localhost:5173/) in your browser to access the application.

## Usage

- Input an Amazon product URL to track.
- The system will check if the product already exists in the database.
- If the product is found, it will be updated; otherwise, a new entry will be added.
- Cron jobs regularly update product information in the background.
- Users who track products will receive email notifications.

---

**Note:** Ensure Node.js and npm are installed before running commands. Configure MongoDB properly, update server settings, and remember to add necessary authentication links to the `.env` file.
