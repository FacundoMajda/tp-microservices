import { Request, Response, NextFunction } from "express";
import { verify } from "../utils/jwt";

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Token no proporcionado" });
    return;
  }

  const token = authHeader.substring(7);
  const result = verify(token);

  if (!result.valid) {
    res.status(401).json({ success: false, message: "Token inválido" });
    return;
  }

  req.user = result.decoded as JwtPayload;
  next();
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== "admin") {
    res
      .status(403)
      .json({
        success: false,
        message: "Acceso denegado: se requiere rol de administrador",
      });
    return;
  }
  next();
};

export const ownerOrAdminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = parseInt(req.params.id);
  if (!req.user || (req.user.id !== userId && req.user.role !== "admin")) {
    res
      .status(403)
      .json({
        success: false,
        message:
          "Acceso denegado: solo el propietario o administrador puede acceder",
      });
    return;
  }
  next();
};
