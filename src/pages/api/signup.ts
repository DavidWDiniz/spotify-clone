import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import setJWT from "../../lib/setJWT";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;
  let user;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    return res.status(401).json({ error: "User already exists" });
  }

  setJWT(user, res);
};
