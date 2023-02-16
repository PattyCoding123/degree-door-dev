import type { NextApiRequest, NextApiResponse } from "next";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { appRouter } from "../../../server/trpc/router/_app";
import { createContext } from "../../../server/trpc/context";

const degreeByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create conext and caller
  const ctx = await createContext({ req, res });
  const caller = appRouter.createCaller(ctx);

  try {
    const { id } = req.query;
    if (typeof id !== "string") {
      throw new Error();
    }
    const degree = await caller.forum.getDegreeInfo({ degreeId: id });
    res.status(200).json(degree);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      // An error from tRPC occured
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    // Another error occured
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default degreeByIdHandler;
