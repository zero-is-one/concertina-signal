import { AuthUser, IUserRepository, User } from "@signal-app/api";
export declare class AuthStore {
    private readonly userRepository;
    authUser: AuthUser | null;
    user: User | null;
    constructor(userRepository: IUserRepository);
    private createProfileIfNeeded;
    get isLoggedIn(): boolean;
}
