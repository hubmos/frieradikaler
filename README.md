# frieradikaler

frieradikaler is a single-page web application that showcases the latest running activities from a Strava Club. It automates the retrieval of data from Strava API v3 and displays the activities along with the distance covered. The application ensures that the activity data is always up to date and leverages an Firebase for db and eventfunctions.

## Technologies Used

- Astro Framework for building the website
- Strava API v3 for fetching activity data
- Firebase for db and eventfunctions
- Node.js as the runtime environment
- Tailwind for the looks
- HTML and CSS3 for the presentation layer

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

## Acknowledgements

This application was built using the open-source tools and libraries listed above. Additionally, Strava API's availability is crucial for the app's operation. A special thanks to the maintainers and contributors of these projects.
