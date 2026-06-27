# Deploying the AI Enablement Scorecard to Vercel

This app is ready to deploy as a standard Next.js project.

## Option 1: Deploy with Vercel's website

1. Go to https://vercel.com/new.
2. Import this project from GitHub, GitLab, or Bitbucket.
3. Keep the framework preset as **Next.js**.
4. Use these defaults:
   - Build command: `pnpm build`
   - Install command: `pnpm install`
   - Output directory: leave blank
5. Click **Deploy**.

After deployment, Vercel will give you a public URL such as:

```text
https://ai-enablement-scorecard.vercel.app
```

## Option 2: Deploy with the Vercel CLI

From this folder, run:

```bash
npx vercel
```

For the first deployment, answer:

```text
Set up and deploy? yes
Which scope? choose your account
Link to existing project? no
Project name? ai-enablement-scorecard
Directory? ./
Modify settings? no
```

Then deploy the production version:

```bash
npx vercel --prod
```

## Add it to Carrd

Once you have the public Vercel URL, add an Embed element in Carrd and paste:

```html
<iframe
  src="https://YOUR-VERCEL-URL-HERE"
  title="AI Enablement Scorecard"
  style="width: 100%; min-height: 950px; border: 0; border-radius: 16px;"
  loading="lazy"
></iframe>
```

Replace `https://YOUR-VERCEL-URL-HERE` with your actual Vercel URL.

## Update the app links

When your real links are ready, update them in:

```text
lib/assessment-data.ts
```

Look for:

```ts
downloadResource: "#download-grow-career-framework",
speakingInquiry: "#invite-tochi-to-speak",
homepage: "#website-homepage",
```
