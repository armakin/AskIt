import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

async function protect(req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log(req.headers.authorization);
      token = req.headers.authorization.split(" ")[1];
      let decoded;

      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (e) {
        res.status(401);
        throw Error("Not authorized. Invalid token.");
      }
      req.user = await User.findByPk(decoded.id);
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized. No token.");
    }
    next();
  } catch (e) {
    res.status(401);
    res.send({ error: e.message });
  }
}

export { protect };
