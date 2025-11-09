import { Request, Response } from "express";
import { PrismaClient, PropertyStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const approveProperty = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    const property = await prisma.property.findUnique({
      where: {
        id: Number(propertyId),
      },
    });

    if (!property || property.expiresIn <= new Date()) {
      res.send("property doesn't exists or time is expired ");
      return;
    }

    await prisma.property.update({
      where: {
        id: Number(propertyId),
      },
      data: {
        status: PropertyStatus.Approved,
      },
    });

    res.send("Property is approved");
  } catch (error: any) {
    console.log("Error approving property ");
    return res.send(`Error approving property ${error.message}`);
  }
};
export const rejectProperty = async (req: Request, res: Response) => {
  try {
    const { propertyId } = req.params;

    const property = await prisma.property.findUnique({
      where: {
        id: Number(propertyId),
      },
    });

    if (!property || property.expiresIn <= new Date()) {
      res.send("property doesn't exists or time is expired ");
      return;
    }

    await prisma.property.update({
      where: {
        id: Number(propertyId),
      },
      data: {
        status: PropertyStatus.Rejected,
      },
    });

    res.send("Property is Rejected");
  } catch (error: any) {
    console.log("Error rejecting property ");
    return res.send(`Error rejecting property ${error.message}`);
  }
};
