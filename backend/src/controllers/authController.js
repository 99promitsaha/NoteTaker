const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const { signJwt } = require("../utils/jwt");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function googleAuth(req, res) {
  const { credential } = req.body;
  if (!credential) {
    return res.status(400).json({ message: "Missing credential" });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const googleId = payload.sub;
    const email = payload.email;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name: payload.name,
        avatarUrl: payload.picture
      });
    }

    const token = signJwt({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl
    });

    const isProd = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Google token verification failed" });
  }
}

async function me(req, res) {
  const user = await User.findById(req.user.id).select("_id email name avatarUrl");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl
    }
  });
}

async function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}

module.exports = { googleAuth, me, logout };
