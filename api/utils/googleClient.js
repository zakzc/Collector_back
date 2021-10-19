import { google } from 'googleapis';

export const googleClient = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.Google_SECRET,
    'http //localhost:300/getGoogle'
);
