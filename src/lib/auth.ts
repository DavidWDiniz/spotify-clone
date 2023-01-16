import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;

    if (token) {
      try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          return res.status(401).json({ error: "Not authorized" });
        }
        return handler(req, res, user);
      } catch (e) {
        return res.status(401).json({ error: "Not authorized" });
      }
    }
    return res.status(401).json({ error: "Not authorized" });
  };
};
