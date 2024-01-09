# frieradikaler

frieradikaler is a single-page web application that showcases the latest running activities from a Strava Club. It automates the retrieval of data from Strava API v3 and displays the activities along with the distance covered. The application ensures that the activity data is always up to date with nightly updates and leverages an SQLite databases for data persistence.

## Technologies Used

- Astro Framework for building the website
- Strava API v3 for fetching activity data
- SQLite for database management
- absurd-sql for ensuring persistence on the web
- Node.js as the runtime environment
- cron for scheduling nightly updates
- HTML and CSS3 for the presentation layer

## Project Files and Directories

This section provides a brief description of the project's file structure:

- `.gitignore` - Contains a list of files and directories ignored by git
- `astro.config.mjs` - Astro configuration module
- `package.json` - Lists the project dependencies and metadata
- `README.md` - The readme file you are currently reading
- `tsconfig.json` - Configuration file for TypeScript
- `public/favicon.svg` - The site favicon
- `src/env.d.ts` - TypeScript definitions for Astro client
- `src/components/` - Astro components used in the application
- `src/layouts/` - Layout components for the app structure
- `src/pages/` - Pages within the Astro application
- `.env.local` and `.env` - Environment configuration files (should contain sensitive data)
- `db/config.js` - Configuration for the SQLite database
- `src/components/ActivitiesList.astro` - Component listing the fetched activities
- `src/components/Activity.astro` - Represents a single activity
- `src/utils/strava.js` - Utility functions to interact with the Strava API
- `src/server/cronScheduledTasks.js` - Cron tasks for updating the database periodically
- `src/test/fetchStravaActivities.js` - Test script for the Strava API functionality
- `db/schema.sql` - SQL schema for the project's database
- `db/utils.js` - Utility functions for database interactions
- `db/database.js` - Initialization of the absurd-sql database
- `frieradikaler_key.json` - Firebase service account key
- `src/server/firebase.js` - Firebase admin initialization
- `src/utils/firestore.js` - Functions to interact with Firebase Firestore

## Setup and Configuration

Before running the application, please ensure that you have created the `.env.local` with the appropriate Strava API credentials and the database path. The `.env` file format should look like this:

```
# SQLite configuration
DATABASE_URL=file:./data/frieradikaler.db

# Strava API credentials
SECRET_CLIENT_ID=<your_client_id>
SECRET_CLIENT_SECRET=<your_client_secret>
SECRET_REFRESH_TOKEN=<your_refresh_token>
SECRET_CLUB_ID=<your_club_id>
SECRET_ACCESS_TOKEN=<your_access_token>
```

Replace `<your_client_id>`, `<your_client_secret>`, `<your_refresh_token>`, `<your_club_id>`, and `<your_access_token>` with your Strava API credentials.

## Installation

To install the dependencies for frieradikaler, run the following command:

```bash
npm install
```

## Running the application

To start the development server, execute:

```bash
npm run dev
```

To build the application for production:

```bash
npm run build
```

To preview the build locally before deployment:

```bash
npm run preview
```

## Automated Updates

The `src/server/cronScheduledTasks.js` file contains a Node.js `cron` job that will update the activities from Strava API v3 nightly. The default timezone set for the update is UTC.

## Acknowledgements

This application was built using the open-source tools and libraries listed above. Additionally, Strava API's availability is crucial for the app's operation. A special thanks to the maintainers and contributors of these projects.
