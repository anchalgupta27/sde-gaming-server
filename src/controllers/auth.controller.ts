import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import ApprovedEmail from "../models/ApprovedEmail";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET!;

export class AuthController {
  public async authorizeGoogleLogin(req: Request, res: Response) {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: "Missing Google credential" });
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      if (!payload || !payload.email || !payload.given_name) {
        return res.status(400).json({ error: "Missing user info in token" });
      }

      const { email, given_name, family_name } = payload;
      console.log(payload);
      console.log(await ApprovedEmail.find());
      const approvedEmail = await ApprovedEmail.findOne({ email });
      console.log(approvedEmail);
      if (!approvedEmail) {
        return res.status(403).json({ error: "Email not approved for login" });
      }

      let user = await User.findOne({ email });

      if (!user) {
        user = await User.create({
          email,
          name: `${given_name} ${family_name ?? ""}`,
          googleId: payload.sub, 
        });
      }

      const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "24h",
      });

      return res.status(200).json({
        message: "Authentication successful",
        token,
        user,
      });

    } catch (err) {
      console.error("Google login error:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
  }
}
