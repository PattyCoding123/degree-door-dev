import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { forumRouter } from "./forum";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  forum: forumRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
