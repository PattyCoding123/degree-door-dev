import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const forumRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getDegreeInfo: publicProcedure
    .input(z.object({ degreeId: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.degree.findUniqueOrThrow({
          where: {
            id: input.degreeId,
          },
        });
      } catch (err) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
    }),
  getAllReviews: publicProcedure
    .input(z.object({ degreeId: z.string() }))
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.review.findMany({
        where: {
          degreeId: input.degreeId,
        },
      });
    }),
  createReview: protectedProcedure
    .input(
      z.object({
        degreeId: z.string(),
        formData: z.object({
          course: z.string(),
          pros: z.string(),
          cons: z.string(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { degreeId, formData } = input;
      const review = await ctx.prisma.review.create({
        data: {
          ...formData,
          userId: ctx.session.user.id,
          degreeId: degreeId,
        },
      });
      return review;
    }),
  deleteReview: protectedProcedure
    .input(z.object({ reviewId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const deletedReview = await ctx.prisma.review.delete({
        where: {
          id: input.reviewId,
        },
      });
      return deletedReview;
    }),
  getAllDegreePaths: publicProcedure.query(async ({ ctx }) => {
    const degreePaths = await ctx.prisma.degree.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return degreePaths;
  }),
  checkIfFavorite: protectedProcedure
    .input(z.object({ degreeId: z.string() }))
    .query(async ({ ctx, input }) => {
      /*
       * Prisma API has a special syntax when querying object by a
       * composite key!
       */
      const favoriteDegree = await ctx.prisma.favorites.findUnique({
        where: {
          userId_degreeId: {
            degreeId: input.degreeId,
            userId: ctx.session.user.id,
          },
        },
      });

      return favoriteDegree;
    }),
  removeFavoriteDegree: protectedProcedure
    .input(z.object({ degreeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const prismaDb = ctx.prisma;

      const degree = await prismaDb.favorites.delete({
        where: {
          userId_degreeId: {
            userId: userId,
            degreeId: input.degreeId,
          },
        },
      });

      return degree;
    }),
  favoriteDegree: protectedProcedure
    .input(z.object({ degreeId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const prismaDb = ctx.prisma;

      const degree = await prismaDb.favorites.create({
        data: {
          userId: userId,
          degreeId: input.degreeId,
        },
      });

      return degree;
    }),
  getFavorites: protectedProcedure.query(async ({ ctx }) => {
    const favoriteDegrees = await ctx.prisma.favorites.findMany({
      where: { userId: ctx.session.user.id },
      include: {
        degree: {
          select: { name: true },
        },
      },
    });

    return favoriteDegrees;
  }),
});
