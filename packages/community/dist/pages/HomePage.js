import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { RecentSongList } from "../components/RecentSongList.js";
import { PageLayout, PageTitle } from "../layouts/PageLayout.js";
import { Localized } from "../localize/useLocalization.js";
export const HomePage = () => {
    return (_jsxs(PageLayout, { children: [_jsx(PageTitle, { children: _jsx(Localized, { name: "recent-tracks" }) }), _jsx(RecentSongList, {})] }));
};
//# sourceMappingURL=HomePage.js.map