/**
 * 用户类别
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    userIntro?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    tags: string;
    createTime: Date;
};