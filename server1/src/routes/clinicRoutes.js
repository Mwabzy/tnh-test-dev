import express from "express";
//import db from "../db.js";
import prisma from "../prismaClient.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // const getClinics = db.prepare("SELECT * FROM clinics");
  // const clinics = getClinics.all();

  const clinics = await prisma.clinicalService.findMany({
    include: {
      contact: true,
      clinics: true,
      relatedServices: true,
      doctors: true,
    },
  });

  res.json(clinics);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const clinicalService = await prisma.clinicalService.findUnique({
      where: { id: Number(id) },
      include: {
        contact: {
          include: { emails: true },
        },
        clinics: true,
        relatedServices: true,
        doctors: true,
        // image: true,
      },
    });

    if (!clinicalService) {
      return res.status(404).json({ message: "Clinical service not found" });
    }

    res.json(clinicalService);
  } catch (error) {
    console.error("Failed to fetch clinical service:", error);
    res.status(500).json({ message: "Error fetching clinical service", error });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  console.log("Received body:", req.body);

  try {
    const {
      title,
      tagline,
      overview,
      features,
      contact,
      clinics,
      relatedServices,
      image,
    } = req.body;

    const clinicalService = await prisma.clinicalService.create({
      data: {
        title,
        tagline,
        overview,
        features: { set: features || [] },
        //testimonial: testimonial?.length ? { create: testimonial } : undefined,
        contact: contact
          ? {
              create: {
                phone: contact.phone,
                emails: contact.emails?.length
                  ? { create: contact.emails }
                  : undefined,
              },
            }
          : undefined,

        relatedServices:
          relatedServices && relatedServices.length
            ? { create: relatedServices }
            : undefined,
        clinics,
        image: image ?? null,
      },
    });

    res.json(clinicalService);
  } catch (error) {
    console.error("Failed to create clinical service:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.patch("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const raw = req.body;

  if (Object.keys(raw).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }

  try {
    const data = {
      ...(raw.title && { title: raw.title }),
      ...(raw.tagline && { tagline: raw.tagline }),
      ...(raw.overview && { overview: raw.overview }),
      ...(Array.isArray(raw.features) && {
        features: { set: raw.features },
      }),
      ...(raw.image && { image: raw.image }),
      ...(raw.contact && {
        contact: {
          update: {
            ...(raw.contact.phone && { phone: raw.contact.phone }),
            ...(Array.isArray(raw.contact.emails) && {
              emails: {
                deleteMany: {},
                create: raw.contact.emails,
              },
            }),
          },
        },
      }),
      ...(Array.isArray(raw.relatedServices) && {
        relatedServices: {
          set: raw.relatedServices,
        },
      }),
      ...(Array.isArray(raw.doctors) && {
        doctors: {
          deleteMany: {},
          create: raw.doctors,
        },
      }),
    };

    const updated = await prisma.clinicalService.update({
      where: { id: Number(id) },
      data,
    });

    console.log(`Clinical service updated successfully`);

    res.json(updated);
  } catch (error) {
    console.error("Error updating clinical service", error);
    res.status(500).json({ message: "Error updating clinical service", error });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  // const deleteClinic = db.prepare("DELETE FROM clinics WHERE id = ?");
  // deleteClinic.run(id);

  try {
    await prisma.clinicalService.delete({
      where: { id: Number(id) },
    });
    console.log(`Clinical service deleted successfully`);
    res.json({ message: "Clinical service deleted successfully" });
  } catch (error) {
    console.error("Error deleting clinical service", error);
    res.status(500).json({ message: "Error deleting clinical service", error });
  }
});

export default router;
