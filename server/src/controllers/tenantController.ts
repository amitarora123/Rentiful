import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;

    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        email,
        name,
        phoneNumber,
      },
    });

    res.status(201).json(tenant);
  } catch (error) {
    console.log("Error while creating Tenant", error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const getTenant = async (req: Request, res: Response): Promise<void> => {
  const { cognitoId } = req.params;

  console.log(cognitoId);

  try {
    const tenant = await prisma.tenant.findFirst({
      where: {
        cognitoId,
      },
      include: {
        favorites: true,
      },
    });

    if (!tenant) {
      res.status(404).json({
        message: "Tenant not found",
      });
      return;
    }

    res.status(200).json(tenant);
  } catch (error) {
    console.log("Error while fetching Tenant", error);
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

export const updateTenant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updatedTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.json(updatedTenant);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating tenant: ${error.message}` });
  }
};
