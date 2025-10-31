import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
export const getProperties = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const properties = await prisma.property.findMany();
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error while fetching properties", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
