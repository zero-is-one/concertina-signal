export function addTick(events) {
    let tick = 0;
    return events.map((e) => {
        const { deltaTime, ...rest } = e;
        tick += deltaTime;
        return {
            ...rest,
            tick,
        };
    });
}
//# sourceMappingURL=addTick.js.map