export interface User {
    id: string;
    email: string;
    token: string;
    emailVerified: boolean;
}

export const mapUserData = (user): User => {
    const { uid, email, za, emailVerified } = user;
    return {
        id: uid,
        email,
        token: za,
        emailVerified,
    };
};
