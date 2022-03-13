export const getErrorMessage = (e: unknown): string => {
    if (e instanceof Error) {
        return e.message;
    }
    if (typeof e === "string") {
        return e;
    }
    return `Unknown error ${e}`;
};
