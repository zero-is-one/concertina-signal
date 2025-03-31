import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Alert } from "../components/Alert.js";
import { CircularProgress } from "../components/CircularProgress.js";
import { UserSongList } from "../components/UserSongList.js";
import { useAsyncEffect } from "../hooks/useAsyncEffect.js";
import { useStores } from "../hooks/useStores.js";
import { PageLayout, PageTitle } from "../layouts/PageLayout.js";
import { Localized } from "../localize/useLocalization.js";
const Bio = styled.p `
  margin-top: 1rem;
`;
const SectionTitle = styled.h2 `
  margin-top: 2rem;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;
export const UserPage = observer(({ userId }) => {
    const { userRepository } = useStores();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    useAsyncEffect(async () => {
        try {
            const user = await userRepository.get(userId);
            setUser(user);
            setIsLoading(false);
        }
        catch (e) {
            setError(e);
        }
    }, [userId]);
    if (isLoading) {
        return (_jsxs(PageLayout, { children: [_jsx(PageTitle, { children: "User" }), _jsx(CircularProgress, {}), " Loading..."] }));
    }
    if (error !== null) {
        return (_jsxs(PageLayout, { children: [_jsx(PageTitle, { children: "User" }), _jsxs(Alert, { severity: "warning", children: ["Failed to load user profile: ", error.message] })] }));
    }
    if (user === null) {
        return (_jsxs(PageLayout, { children: [_jsx(PageTitle, { children: "User" }), _jsx(Alert, { severity: "warning", children: _jsx(Localized, { name: "user-not-found" }) })] }));
    }
    return (_jsxs(PageLayout, { children: [_jsx(Helmet, { children: _jsx("title", { children: `${user.name} - signal` }) }), _jsx(PageTitle, { children: user.name }), _jsx(Bio, { children: user.bio }), _jsx(SectionTitle, { children: _jsx(Localized, { name: "tracks" }) }), _jsx(UserSongList, { userId: userId })] }));
});
//# sourceMappingURL=UserPage.js.map