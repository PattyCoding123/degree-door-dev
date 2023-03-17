import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  editProfile: protectedProcedure
    .input(
      z.object({
        displayName: z.string().nullish(),
        status: z.string(),
        about: z.string().nullish(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // * Update user's name, status, and about if changed.
      const userInfo = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.displayName,
          status: input.status,
          about: input.about,
        },
      });
      return userInfo;
    }),
});
