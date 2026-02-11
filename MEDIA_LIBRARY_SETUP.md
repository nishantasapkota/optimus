# Media Library Setup Guide

This guide will help you set up the media library with Cloudinary storage for your admin panel.

## Overview

The media library allows you to:
- Upload images to Cloudinary
- Browse and manage uploaded images
- Select images from the library when creating/editing blogs and services
- Store image metadata in MongoDB

## Prerequisites

1. **Cloudinary Account** - Create an account at cloudinary.com
2. **MongoDB** - Local or cloud MongoDB instance

## Step 1: Create Cloudinary Account

1. Sign up at cloudinary.com
2. Verify your email address
3. Open the Cloudinary dashboard

## Step 2: Get API Credentials

From the Cloudinary dashboard, copy your:
- **Cloud Name**
- **API Key**
- **API Secret**

## Step 3: Configure Environment Variables

Create or update your `.env.local` file:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017

# Cloudinary (recommended single variable)
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME

# Optional: customize upload folder (defaults to "optimus/media")
CLOUDINARY_MEDIA_FOLDER=optimus/media

# Optional: unsigned uploads (fallback)
# Create an unsigned upload preset in Cloudinary and set:
# CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

If you prefer separate variables instead of `CLOUDINARY_URL`, you can use:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

If you prefer unsigned uploads (no API secret on the server), set:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

## Step 4: Install Dependencies

The project uses `next-cloudinary` for Cloudinary integration (already installed). No additional server SDK is required for uploads in this project.

## Step 5: Seed Media Collection

Run the media seed script to create the collection and add sample data:

```bash
node scripts/06-seed-media.js
```

## Step 6: Test the Upload

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/media` in your browser

3. Try uploading an image:
   - Click the upload area
   - Select an image (max 5MB)
   - The image should upload to Cloudinary and appear in your media library

## Usage in Blogs and Services

When creating or editing a blog post or service:

1. Look for the **Featured Image** or **Icon** field
2. Click the **Browse** button next to the URL input
3. The media picker dialog will open
4. You can:
   - Upload a new image
   - Select an existing image from the library
   - Search for images by filename
5. Click **Select Image** to use it

The image URL will be automatically populated in the form.

## Troubleshooting

### Upload fails with "Unauthorized" or "Invalid Signature"

- Check that your `CLOUDINARY_URL` (or `CLOUDINARY_CLOUD_NAME`/`CLOUDINARY_API_KEY`/`CLOUDINARY_API_SECRET`) is correct
- If you don't want to use signed uploads, create an unsigned upload preset and set `CLOUDINARY_UPLOAD_PRESET`
- Restart the dev server after adding environment variables

### Images upload but don't display

- Verify the image URL is accessible
- Confirm the upload completed successfully in the Cloudinary dashboard

### "Failed to connect to MongoDB" error

- Ensure MongoDB is running locally or your cloud connection string is correct
- Check that `MONGODB_URI` is set in `.env.local`

## Security Best Practices

1. **Never commit** `.env.local` to version control
2. **Keep your API secret private** - never expose it in client-side code
3. **Validate file types and sizes** on the server side (already implemented)
4. **Set up rate limiting** on upload endpoints in production
5. **Monitor usage** in the Cloudinary dashboard

## Production Deployment

When deploying to production (e.g., Vercel):

1. Add environment variables in your hosting platform:
   - `CLOUDINARY_URL` (or the split variables)
   - `CLOUDINARY_MEDIA_FOLDER` (optional)
   - `MONGODB_URI`

2. Redeploy your application

## Next Steps

- Add image transformations using Cloudinary URLs
- Implement bulk upload functionality
- Add image search and tagging features
- Configure custom file size limits per upload type
