# How to Get Sanity Environment Variables

This guide will walk you through setting up a Sanity project and getting your environment variables.

## Step 1: Create a Sanity Account

1. Go to [https://www.sanity.io](https://www.sanity.io)
2. Click "Sign up" or "Get started"
3. Sign up using:
   - Google account
   - GitHub account
   - Email and password

## Step 2: Create a New Sanity Project

1. After logging in, you'll see your dashboard
2. Click **"Create project"** or **"New project"**
3. Fill in the project details:
   - **Project name**: e.g., "ESAP AI" or "ESAP AI Website"
   - **Organization**: Select your organization (or create one)
   - **Plan**: Choose "Free" for development (or upgrade for production)
4. Click **"Create project"**

## Step 3: Get Your Project ID

1. Once your project is created, you'll be taken to the project dashboard
2. The **Project ID** is displayed in several places:
   - In the URL: `https://www.sanity.io/manage/personal/project/YOUR_PROJECT_ID`
   - In the project settings
   - In the API section

3. **To find it easily:**
   - Go to [https://www.sanity.io/manage](https://www.sanity.io/manage)
   - Click on your project
   - The Project ID is shown at the top or in the project settings
   - It looks like: `abc123xyz` (8-10 characters)

## Step 4: Get Your Dataset Name

1. In your Sanity project dashboard, go to **"API"** or **"Settings"**
2. You'll see **"Datasets"** section
3. By default, there's usually a dataset called **"production"**
4. You can also create additional datasets like:
   - `development` - for testing
   - `staging` - for staging environment
   - `production` - for live content

## Step 5: Set Up Environment Variables

### For Next.js App (Root Directory)

Create or update `.env.local` in the project root:

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

**Example:**
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

### For Sanity Studio

Create or update `.env` in the `studio/` directory:

```bash
# studio/.env
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

**Example:**
```bash
SANITY_STUDIO_PROJECT_ID=abc123xyz
SANITY_STUDIO_DATASET=production
```

**Important**: Sanity Studio uses the `SANITY_STUDIO_` prefix for environment variables (not `NEXT_PUBLIC_`). This is different from Next.js apps.

## Step 6: Verify Your Setup

1. **Start the Sanity Studio:**
   ```bash
   cd studio
   pnpm install
   pnpm dev
   ```

2. **Open** [http://localhost:3333](http://localhost:3333)

3. **You should see:**
   - The Sanity Studio login page (first time)
   - Or the studio interface with your schemas (if already logged in)

4. **If you see errors:**
   - Check that your Project ID is correct
   - Check that your Dataset name matches (case-sensitive)
   - Make sure you're logged in to Sanity

## Step 7: Initialize Your Schema

1. In Sanity Studio, you should see "Case Study" in the content list
2. If not, the schema should auto-load from `studio/schemas/caseStudy.ts`
3. Click **"Create new"** → **"Case Study"** to create your first case study

## Quick Reference

### Where to Find Project ID:
- **Sanity Dashboard**: [https://www.sanity.io/manage](https://www.sanity.io/manage)
- **Project Settings**: Click on your project → Settings → API
- **URL**: The ID is in the URL when viewing your project

### Common Dataset Names:
- `production` - Default production dataset
- `development` - For development/testing
- `staging` - For staging environment

### Environment Variable Format:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

## Troubleshooting

### "No authentication credentials found"
- Make sure you're logged in to Sanity Studio
- Run `sanity login` in the studio directory if needed

### "Project not found"
- Double-check your Project ID
- Make sure the project exists in your Sanity account
- Verify you have access to the project

### "Dataset not found"
- Check the dataset name (case-sensitive)
- Create the dataset in Sanity dashboard if it doesn't exist
- Default dataset is usually "production"

### Studio won't start
- Make sure you've run `pnpm install` in the studio directory
- Check that all environment variables are set
- Verify Node.js version (should be 18+)

## Next Steps

Once you have your environment variables set:

1. ✅ Start the Sanity Studio: `cd studio && pnpm dev`
2. ✅ Create your first case study
3. ✅ View it on your site at `/case-study`

## Need Help?

- **Sanity Documentation**: [https://www.sanity.io/docs](https://www.sanity.io/docs)
- **Sanity Community**: [https://slack.sanity.io](https://slack.sanity.io)
- **Sanity Support**: Check the Sanity dashboard for support options
