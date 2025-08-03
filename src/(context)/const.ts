// Default network
export const DEFAULT_NETWORK =
    process.env.NODE_ENV !== "production"
        ? process.env.DEFAULT_NETWORK || "polygon_amoy"
        : (process.env.DEFAULT_NETWORK ?? "base");

export const SSE_DATA_PREFIX = "data: ";
export const SSE_DONE_MESSAGE = `[DONE]`;
export const SSE_LINE_DELIMITER = "\n\n";
