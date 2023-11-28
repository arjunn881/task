import jwt from "jsonwebtoken";

export const Auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodeData = jwt.verify(token, process.env.KEY);

    req.userId = decodeData?.id;

    next();
  } catch (error) {
    res.status(505).json({ messsage: error });
  }
};