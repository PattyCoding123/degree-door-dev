import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

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
        formData: z.object({
          displayName: z.string().nullish(),
          status: z.string(),
          about: z.string().nullish(),
        }),
        urlUserId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // ! PROTECT AGAIN USER CHANGING OTHER USER INFO,
      // ! VERY UNLIKELY BUT JUST A PRECAUTION
      if (ctx.session.user.id !== input.urlUserId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // * Update user's name, status, and about if changed.
      const userInfo = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.formData.displayName,
          status: input.formData.status,
          about: input.formData.about,
        },
      });
      return userInfo;
    }),
  deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.user.delete({
      where: {
        id: ctx.session.user.id,
      },
    });

    return user;
  }),
});
