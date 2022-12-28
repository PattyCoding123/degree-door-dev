import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const forumRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  createPost: protectedProcedure
    .input(z.object({ course: z.string(), pros: z.string(), cons: z.string() }))
    .mutation(({ input }) => {
      
    })
});