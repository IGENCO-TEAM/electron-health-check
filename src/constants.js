export const APP_NAME = "Electron Health Check";
export const APP_MODE = "DEV";

export const ROUTER_BASE = "/";

let mainURL = "/";
if (process.env.NODE_ENV === "production") {
  mainURL = "/";
}

/**
 * Config URL
 */
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? `${window.location.origin + ROUTER_BASE}`
    : mainURL;
export const ROUTER_BASE_URL =
  process.env.NODE_ENV === "development" ? "/" : BASE_URL;
