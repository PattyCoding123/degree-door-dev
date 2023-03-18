import { TRPCError } from "@trpc/server";
import { type Context } from "../server/trpc/context";

export const assertIsReviewAuthor = async (ctx: Context, reviewId: string) => {
  const review = await ctx.prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review || ctx.session?.user?.id !== review.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
};
