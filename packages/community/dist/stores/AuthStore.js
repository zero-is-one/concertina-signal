import { makeObservable, observable } from "mobx";
export class AuthStore {
    userRepository;
    authUser = null;
    user = null;
    constructor(userRepository) {
        this.userRepository = userRepository;
        makeObservable(this, {
            authUser: observable,
            user: observable,
        });
        let subscribe = null;
        try {
            userRepository.observeAuthUser(async (user) => {
                this.authUser = user;
                subscribe?.();
                if (user !== null) {
                    subscribe = userRepository.observeCurrentUser((user) => {
                        this.user = user;
                    });
                    await this.createProfileIfNeeded(user);
                }
            });
        }
        catch (e) {
            console.warn(e);
        }
    }
    async createProfileIfNeeded(authUser) {
        // Create user profile if not exists
        const user = await this.userRepository.getCurrentUser();
        if (user === null) {
            const newUserData = {
                name: authUser.displayName ?? "",
                bio: "",
            };
            await this.userRepository.create(newUserData);
        }
    }
    get isLoggedIn() {
        return this.authUser !== null;
    }
}
//# sourceMappingURL=AuthStore.js.map