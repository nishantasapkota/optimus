# Next.js Admin Panel

A modern, full-featured admin panel built with Next.js 15, MongoDB, Tailwind CSS, and shadcn/ui components.

## Features

- **Dashboard Overview** - Statistics cards, charts, and recent activity
- **User Management** - Full CRUD operations with search and filters
- **Authentication** - Secure login system with session management
- **MongoDB Integration** - Direct database connection without ORM
- **Responsive Design** - Mobile-friendly sidebar and layouts
- **Modern UI** - Built with shadcn/ui and Tailwind CSS
- **Custom Theme** - Red primary and blue secondary brand colors

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: MongoDB (Cloud or Local)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (cloud) or MongoDB running locally

### Installation

1. **Clone or download the project**

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   
   **For MongoDB Atlas (Cloud - Recommended):**
   \`\`\`env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/admin_panel
   \`\`\`
   
   **For Local MongoDB:**
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017
   \`\`\`

4. **Set up the database**
   
   Run the seed scripts to create collections and sample data:
   \`\`\`bash
   node scripts/02-seed-data.js
   node scripts/03-create-admin.js
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Default Login Credentials

\`\`\`
Email: admin@example.com
Password: admin123
\`\`\`

**⚠️ IMPORTANT**: Change these credentials in production!

## Database Schema

Complete schema documentation is available in the `database/` folder:
- `database/schema.json` - Structured schema definition
- `database/SCHEMA_EXPORT.md` - Full documentation with export/import commands

### Exporting Your Database

To export your cloud database for local use later:

\`\`\`bash
# Export entire database
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/admin_panel" --out=./backup

# Export specific collections
mongoexport --uri="mongodb+srv://username:password@cluster.mongodb.net/admin_panel" --collection=users --out=users.json
\`\`\`

### Importing to Local MongoDB

\`\`\`bash
# Import collections
mongoimport --uri="mongodb://localhost:27017/admin_panel" --collection=users --file=users.json

# Restore entire database
mongorestore --uri="mongodb://localhost:27017" --db=admin_panel ./backup/admin_panel
\`\`\`

See `database/SCHEMA_EXPORT.md` for complete migration instructions.

## Project Structure

\`\`\`
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── layout.tsx      # Admin layout with sidebar
│   │   ├── page.tsx        # Dashboard overview
│   │   └── users/          # User management
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   └── users/          # User CRUD endpoints
│   ├── login/              # Login page
│   └── globals.css         # Global styles and theme
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── admin-sidebar.tsx   # Sidebar navigation
│   ├── admin-header.tsx    # Header with search
│   ├── stat-card.tsx       # Statistics cards
│   ├── users-table.tsx     # User data table
│   └── ...
├── database/               # Schema documentation
│   ├── schema.json         # Structured schema
│   └── SCHEMA_EXPORT.md    # Export/import guide
├── lib/
│   ├── mongodb.ts          # MongoDB connection
│   ├── db-utils.ts         # Database utilities
│   └── auth.ts             # Authentication helpers
├── scripts/                # Database scripts
│   ├── 01-create-collections.sql
│   ├── 02-seed-data.js
│   └── 03-create-admin.js
└── middleware.ts           # Route protection
\`\`\`

## Database Collections

### users
- `_id`: ObjectId
- `name`: string
- `email`: string (unique)
- `password`: string (hashed with bcrypt)
- `role`: "admin" | "user" | "moderator"
- `status`: "active" | "inactive"
- `avatar`: string (URL)
- `createdAt`: Date
- `updatedAt`: Date

### activities
- `_id`: ObjectId
- `userId`: ObjectId (references users._id)
- `action`: string
- `description`: string
- `timestamp`: Date

## Security Notes

**⚠️ This is a demo application. For production use:**

1. **Hash passwords** - Use bcrypt or similar:
   \`\`\`bash
   npm install bcrypt
   \`\`\`

2. **Use proper session management** - Consider NextAuth.js or similar

3. **Add CSRF protection**

4. **Implement rate limiting**

5. **Add input validation** - Use Zod schemas

6. **Enable HTTPS** in production

7. **Set secure cookie options**

8. **Add environment variable validation**

## Customization

### Change Brand Colors

Edit `app/globals.css` to customize the color scheme:

\`\`\`css
:root {
  --primary: oklch(0.45 0.22 25);      /* Red primary */
  --secondary: oklch(0.5 0.15 250);    /* Blue secondary */
  /* ... other colors */
}
\`\`\`

### Add New Pages

1. Create a new page in `app/admin/your-page/page.tsx`
2. Add navigation link in `components/admin-sidebar.tsx`

### Modify Database Schema

1. Update interfaces in `lib/db-utils.ts`
2. Create migration script in `scripts/`
3. Run the migration
4. Update `database/schema.json` for documentation

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add `MONGODB_URI` environment variable in Vercel dashboard
4. Deploy

### Other Platforms

Ensure your platform supports:
- Node.js 18+
- Environment variables
- MongoDB connection (cloud or local)

## Switching from Cloud to Local MongoDB

1. Export your data using commands in `database/SCHEMA_EXPORT.md`
2. Install MongoDB locally
3. Import your data to local MongoDB
4. Update `MONGODB_URI` in `.env.local` to `mongodb://localhost:27017`
5. Restart your development server

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
