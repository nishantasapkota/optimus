# Quick Setup Guide

## Step-by-Step Setup

### 1. Install MongoDB Locally

**macOS (using Homebrew):**
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
\`\`\`

**Windows:**
- Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Run the installer
- Start MongoDB service

**Linux (Ubuntu):**
\`\`\`bash
sudo apt-get install mongodb
sudo systemctl start mongodb
\`\`\`

### 2. Verify MongoDB is Running

\`\`\`bash
mongosh
# Should connect to mongodb://localhost:27017
\`\`\`

### 3. Set Up the Project

\`\`\`bash
# Install dependencies
npm install

# Create environment file
echo "MONGODB_URI=mongodb://localhost:27017" > .env.local

# Seed the database
node scripts/02-seed-data.js
node scripts/03-create-admin.js

# Start the dev server
npm run dev
\`\`\`

### 4. Access the Admin Panel

1. Open [http://localhost:3000](http://localhost:3000)
2. Login with:
   - Email: `admin@example.com`
   - Password: `admin123`

## Using MongoDB Atlas (Cloud)

If you prefer cloud hosting:

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `.env.local`:
   \`\`\`env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/admin_panel
   \`\`\`
5. Whitelist your IP address in Atlas
6. Run seed scripts

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solution**: Make sure MongoDB is running:
\`\`\`bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongodb

# Windows
net start MongoDB
\`\`\`

### Port Already in Use

**Error**: `Port 3000 is already in use`

**Solution**: Use a different port:
\`\`\`bash
PORT=3001 npm run dev
\`\`\`

### Module Not Found

**Error**: `Cannot find module 'mongodb'`

**Solution**: Reinstall dependencies:
\`\`\`bash
rm -rf node_modules package-lock.json
npm install
\`\`\`

## Next Steps

1. ✅ Change default admin password
2. ✅ Customize brand colors in `globals.css`
3. ✅ Add your own pages and features
4. ✅ Set up proper authentication for production
5. ✅ Deploy to Vercel or your preferred platform
