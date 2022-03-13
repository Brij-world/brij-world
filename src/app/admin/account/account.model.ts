export interface ILogin {
    email: string;
    password: string;
}

export interface IRegister {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    referralCode: string;
}

export interface IUser {
    token: string;
    emailConfirmed: boolean;
    isChangePassword: boolean;
}

export interface IChangePassword {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}
