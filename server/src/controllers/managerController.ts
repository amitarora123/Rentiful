import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;

    const manager = await prisma.manager.create({
      data: {
        cognitoId,
        email,
        name,
        phoneNumber,
      },
    });

    res.status(201).json(manager);
  } catch (error) {
    console.log("Error while creating Manager", error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const getManagerByCognitoId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cognitoId } = req.params;

  try {
    const manager = await prisma.manager.findFirst({
      where: {
        cognitoId,
      },
      include: {
        properties: true,
      },
    });

    if (!manager) {
      res.status(404).json({
        message: "manager not found",
      });
      return;
    }

    res.status(200).json(manager);
  } catch (error) {
    console.log("Error while fetching Manger", error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const updateManger = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updatedManger = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.json(updatedManger);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating manager: ${error.message}` });
  }
};
