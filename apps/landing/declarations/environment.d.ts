declare global {
    namespace NodeJS {
        interface ProcessEnv {
            /**
             * Full database connection string
             */
            DATABASE_URL: string;
            /**
             * "development" or "production"
             */
            NODE_ENV: "development" | "production";
            /**
             * Must be 32 characters long
             */
            SECRET_PASSWORD: string;
            /**
             * "1" to turn on maintenance mode
             */
            NEXT_PUBLIC_MAINTENANCE_MODE?: string;
            /**
             * Users of your instance will see this as their support email
             */
            SUPPORT_EMAIL: string;
        }
    }
}

export {};