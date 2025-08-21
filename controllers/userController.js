import { getAllUsersService, createUserService } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.email",
  port: 587,
  secure: false,
  auth: {
    user: "manojkumar25071992@gmail.com",
    pass: "gsvf llgp mttu vfim",
  },
});

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "lura.rath@ethereal.email",
//     pass: "28YZJveAh3jscts7yr",
//   },
// });

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json({
      success: true,
      data: { results: users.rows, total: users.rows.length },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const users = await getAllUsersService();
    const userid = users.rows.length + 1;
    req.body.userid = userid.toString().padStart(6, "UR0000");
    const isExistingUser = users.rows.some(
      (user) => user.username === username
    );
    if (!username || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    } else if (isExistingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    } else {
      const result = await createUserService(req.body);
      if (result.rowCount > 0) {
        res.status(201).json({
          success: true,
          data: result.rows[0],
        });
      } else {
        res.status(400).json({
          success: false,
          message: "User creation failed",
        });
      }
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }
    const users = await getAllUsersService();
    const user = users.rows.find(
      (_user) => _user.username === username && _user.password === password
    );
    const isNotAuthorised = users.rows.every(
      (_user) => _user.username !== username || _user.password !== password
    );
    const token = jwt.sign(
      { username: user?.username, role: user?.role },
      process.env.JWT_SECRET,
      { expiresIn: "1hr" }
    );
    if (isNotAuthorised) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    } else {
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          userid: user.userid,
        },
      });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const userforgotpassword = async (req, res) => {
  try {
    const { username, email } = req.body;
    const users = await getAllUsersService();

    const user = users?.rows?.filter((u) => u.username === username)[0];
    console.log(users);

    if (user?.username === username) {
      transporter.sendMail(
        {
          from: "NMK",
          to: email,
          subject: "Forgot Password 🔐",
          // text: "", // plain‑text body
          html: `Dear User, Please find your forgot password. \n Your Password is: <b>${user?.password}</b>`, // HTML body
        },
        (error, info) => {
          res.status(200).json({
            success: true,
            email: info?.accepted[0],
            message: "Password is Sent to Your E-Mail id",
          });
        }
      );
    } else {
      res
        .status(404)
        .json({ success: false, message: "Please provide correct inputs" });
    }
  } catch (error) {
    console.log("forgot password ap error", error);
  }
};
