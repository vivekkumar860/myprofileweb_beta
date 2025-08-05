# Environment Setup for Admin Dashboard

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXTAUTH_SECRET=CaKfQq9Q8jgdmKqxjRJXc5cFn1XT9MILznCczrK8A9k=
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Setup Instructions:

1. **Google OAuth Setup:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
   - Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy the Client ID and Client Secret to your `.env.local` file

2. **Admin Email Configuration:**
   - Update `src/config/auth.config.ts` with your email address:
   ```typescript
   export const ADMIN_EMAILS = ["your.email@gmail.com"] // change this
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the admin dashboard:**
   - Visit `http://localhost:3000/dashboard`
   - Login with your Google account
   - Only emails listed in `ADMIN_EMAILS` can access the dashboard

## Features:

- **Project Management:** Add, edit, and delete projects from `projects.json`
- **Blog Management:** Create new MDX blog posts
- **Resume Upload:** Upload PDF resume files
- **Secure Authentication:** Google OAuth with admin-only access
- **Protected Routes:** Middleware protection for `/dashboard/*` routes 