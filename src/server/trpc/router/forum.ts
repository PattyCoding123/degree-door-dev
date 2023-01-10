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
  getAllReviews: publicProcedure
    .input(z.object({ degreeId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.review.findMany({ where: { degreeId: input.degreeId }})
  }),
  createReview: protectedProcedure
    .input(z.object({ degreeId: z.string(), formData: z.object({ course: z.string(), pros: z.string(), cons: z.string() }) }))
    .mutation(async ({ input, ctx }) => {
      const { degreeId, formData } = input;
      const review = await ctx.prisma.review.create({
        data: {
          ...formData,
          userId: ctx.session.user.id,
          degreeId: degreeId,
        }
      });
      return review;
    }),
  deleteReview: protectedProcedure
    .input(z.object({ reviewId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deletedReview = await ctx.prisma.review.delete({
        where: {
          id: input.reviewId
        }
      })
      return deletedReview;
    })
});