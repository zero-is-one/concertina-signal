import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { Route } from "wouter";
import { EditProfilePage } from "../pages/EditProfilePage.js";
import { HomePage } from "../pages/HomePage.js";
import { SongPage } from "../pages/SongPage.js";
import { UserPage } from "../pages/UserPage.js";
import { SignInDialog } from "./SignInDialog/SignInDialog.js";
const Routes = observer(() => {
    return (_jsxs(_Fragment, { children: [_jsx(Route, { path: "/home", component: HomePage }), _jsx(Route, { path: "/profile", component: EditProfilePage }), _jsx(Route, { path: "/users/:userId", children: (params) => _jsx(UserPage, { userId: params.userId }) }), _jsx(Route, { path: "/songs/:songId", children: (params) => _jsx(SongPage, { songId: params.songId }) })] }));
});
export const RootView = observer(() => {
    return (_jsxs(_Fragment, { children: [_jsx(Routes, {}), _jsx(SignInDialog, {})] }));
});
//# sourceMappingURL=RootView.js.map