import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";
import { Prisma } from "../../../../generated/prisma/client";


export const registerUser = async (data: Prisma.UserCreateInput) => {
  const { name, email, password } = data;

  // check user exists
  const exists = await prisma.user.findUnique({ where: {email}})
  if (exists) throw new Error("User already exists");

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  return user;
};



export const loginUser = async (data: Partial<Prisma.UserCreateInput>) => {
  const { email, password } = data;

  if (!email || !password) throw new Error("Email and password are required");

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};