export interface UserData {
    id: string;
    userId: string;
    image?: string;
    isAdmin: boolean;
    postLoginHandled: boolean;
    email?: string;
    lastName?: string;
    firstName?: string;
    displayName?: string;
    userBio?: string;
    birthday?: string;
    phoneNumber?: number;
    createdAt: string;
    updatedAt: string;
}
