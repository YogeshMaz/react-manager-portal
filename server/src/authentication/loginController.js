// import jwt from 'jsonwebtoken';
// import bcrypt from "bcrypt";
// import User from "../models/user";

// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     // Compare the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ userId: user._id, email: user.email }, "yourSecretKey", { expiresIn: "1h" });

//     res.status(200).json({ token, message: "Login successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Error logging in", error });
//   }
// };
