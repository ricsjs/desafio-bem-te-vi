"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middlewares/auth-jwt.ts
var auth_jwt_exports = {};
__export(auth_jwt_exports, {
  authenticateJWT: () => authenticateJWT
});
module.exports = __toCommonJS(auth_jwt_exports);
var authenticateJWT = (c, next) => {
  const authHeader = c.req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("Token not found");
    return c.status(401).json({ error: "Token not found" });
  }
  try {
    var jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    c.set("user", decoded);
    return next();
  } catch (error) {
    return c.status(403).json({ error: "Invalid token" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authenticateJWT
});
