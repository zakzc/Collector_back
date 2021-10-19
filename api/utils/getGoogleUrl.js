import { googleClient } from './googleClient';

export const getGoogleUrl = () => {
    const scopes = [
        'https://www.googleapis.com/auth/userInfo.email',
        'https://www.googleapis.com/auth/userInfo.profile',
    ];
    return googleClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes,
    });
};
