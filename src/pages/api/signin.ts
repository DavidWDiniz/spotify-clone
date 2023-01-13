import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import setJWT from "../../lib/setJWT";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    setJWT(user, res);
  } else {
    res.status(401).json({
      error: "Email or password is incorrect",
    });
  }
};
