export const IS_LOCAL = process.env.NODE_ENV === "development"
export const IS_PROD = process.env.NODE_ENV === "production"

const BACKEND_HOST = IS_LOCAL ? "http://localhost:3005" : "https://app.numeric.io/api"

export const env = () =>
  ({
    IS_LOCAL,
    IS_PROD,
    BACKEND_HOST,
  }) as const
