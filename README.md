# JobAlert

**JobAlert** is a recruitment platform that automates job posting, candidate selection, and the hiring process for recruitment agencies. Candidates fill out a form, and their data is saved in a database. When a relevant job becomes available, the system fetches candidate data and triggers an API to make an IVR (Interactive Voice Response) call to confirm if the candidate is interested in the opportunity.

## Features

- **Automated Candidate Management**: Collects candidate data via form submission and stores it in the database.
- **IVR Call System**: Uses Twilio to automatically make IVR calls to candidates when job opportunities arise.
- **Call Attempt Tracking**: Limits the number of call attempts to avoid redundant notifications.
- **Job Posting Automation**: Streamlines job postings and candidate selection based on predefined criteria.
- **Multi-Stage Hiring Process**: Assists recruitment agencies in managing multiple stages of hiring, from job posting to final selection.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YusufManiyar/JobAlert-IVR.git
   ```

2. Navigate into the project directory:

   ```bash
   cd JobAlert-IVR
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file with the following environment variables:

   ```
   TWILIO_ACCOUNT_SID=your_account_sid
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_number
   DB_NAME='your_db_name',
   DB_USER='your_db_user_name'
   DB_PASSWORD='your_db_user_password'
   ```

## Usage

- To start the application in development mode (with `nodemon`):

  ```bash
  npm run dev
  ```

- To start the application in production mode:

  ```bash
  npm start
  ```

## Dependencies

The project uses the following key dependencies:

- **Express**: Web framework for Node.js.
- **Twilio**: For making IVR calls to candidates.
- **MySQL2**: To manage the database of candidates and jobs.
- **Sequelize**: ORM for working with relational databases like MySQL.
- **Cron**: For scheduling the job alerts and calls.
- **Google Cloud Storage**: For handling file uploads (such as resumes).
- **Multer**: Middleware for handling multipart/form-data (file uploads).
- **Axios**: For making HTTP requests.

## Project Structure

```
job-alert/
│
├── app.js            # Main entry point of the application
├── db.js             # database configuration
├── middleware/       # middleware functions
├── controllers/      # API controllers for job and candidate management
├── models/           # Sequelize models (e.g., User, Job, Application)
├── routes/           # Express routes
├── provider/         # provider functions (e.g., Twilio integration)
└── .env              # Environment variables
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any feature requests or bug reports.

## License

This project is licensed under the ISC License.
