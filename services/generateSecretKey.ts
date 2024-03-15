import crypto from "crypto";

export const generateSecretKey = () => {
  const key = crypto.randomBytes(32);
  const base64Key = key.toString("base64");

  return base64Key;
};
