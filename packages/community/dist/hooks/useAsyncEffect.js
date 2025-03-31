import { useEffect } from "react";
export function useAsyncEffect(effect, deps) {
    useEffect(() => {
        effect();
    }, deps);
}
//# sourceMappingURL=useAsyncEffect.js.map