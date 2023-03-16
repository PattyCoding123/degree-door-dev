import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      status: string;
      about?: string | null;
    } & DefaultSession["user"];
  }

  // ! Augment user to include about and status information.
  interface User {
    about?: string;
    status: string;
  }
}
