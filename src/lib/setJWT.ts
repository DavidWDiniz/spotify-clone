import { NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const setJWT = (user, res: NextApiResponse) => {
  const token = jwt.sign(
    { email: user.email, id: user.id, time: Date.now() },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.setHeader(
    "Set-Cookie",
    cookie.serialize(process.env.COOKIE_NAME, token, {
      httpOnly: true,
      maxAge: 12 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  res.json(user);
};

export default setJWT;
