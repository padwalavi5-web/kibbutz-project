<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/485737e1-e7bc-45bb-8718-f7c573863f29

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Firebase Votes

To save votes to your own Firestore project instead of the local fallback:

1. Copy the Firebase values from your project settings into [.env.local](.env.local)
2. Use the `VITE_FIREBASE_*` variables listed in [.env.example](.env.example)
3. Deploy with the included `firebase.json` and `firestore.rules`

The app writes votes to the `kibbutz_60_votes` collection and keeps reads blocked by default in `firestore.rules`.
