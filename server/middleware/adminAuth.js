import crypto from "crypto";

const getBearerToken = (authorizationHeader = "") => {
  const [scheme, token] = authorizationHeader.split(" ");
  return scheme?.toLowerCase() === "bearer" ? token : "";
};

const safeCompare = (first, second) => {
  const firstBuffer = Buffer.from(first);
  const secondBuffer = Buffer.from(second);

  if (firstBuffer.length !== secondBuffer.length) return false;
  return crypto.timingSafeEqual(firstBuffer, secondBuffer);
};

export const requireAdminKey = (req, res, next) => {
  const configuredKey = process.env.ADMIN_POST_KEY;

  if (!configuredKey) {
    return res.status(500).json({
      success: false,
      message: "Admin post key is not configured.",
    });
  }

  const providedKey =
    req.get("x-admin-key") || getBearerToken(req.get("authorization"));

  if (!providedKey || !safeCompare(providedKey, configuredKey)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized.",
    });
  }

  next();
};
