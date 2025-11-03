import "dotenv/config";
import jwt from "jsonwebtoken";

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET));
    return { valid: true, decoded };
  } catch (error) {
    console.log("token", token, { error });
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }
    return {
      valid: false,
      msg: msg,
      decoded: null,
    };
  }
};
