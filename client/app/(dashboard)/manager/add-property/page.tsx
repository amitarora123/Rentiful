"use client";

import React, { useState } from "react";
import UploadCard from "@/components/UploadCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function PropertyFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    city: "",
    country: "",
    latitude: "",
    longitude: "",
    features: "",
    ratings: 0,
    reviews: 0,
    pricePerNight: 0,
    beds: 0,
    baths: 0,
    poolAvailable: false,
    managerId: 1,
  });

  const [images, setImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert image files to Base64 or handle them as FormData (if your backend expects file uploads)
      const imageUrls: string[] = [];

      for (const img of images) {
        if (img) {
          const base64 = await fileToBase64(img);
          imageUrls.push(base64 as string);
        } else {
          imageUrls.push("");
        }
      }

      const payload = {
        name: formData.name,
        address: {
          state: formData.state,
          city: formData.city,
          country: formData.country,
          coordinates: {
            latitude: parseFloat(formData.latitude),
            longitude: parseFloat(formData.longitude),
          },
        },
        features: formData.features.split(",").map((f) => f.trim()),
        ratings: formData.ratings,
        reviews: formData.reviews,
        pricePerNight: formData.pricePerNight,
        beds: formData.beds,
        baths: formData.baths,
        poolAvailable: formData.poolAvailable,
        imageUrls,
        managerId: formData.managerId,
      };

      const res = await fetch("http://localhost:4000/api/property/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to post property");

      alert("✅ Property added successfully!");
      setFormData({
        name: "",
        state: "",
        city: "",
        country: "",
        latitude: "",
        longitude: "",
        features: "",
        ratings: 0,
        reviews: 0,
        pricePerNight: 0,
        beds: 0,
        baths: 0,
        poolAvailable: false,
        managerId: 1,
      });
      setImages([null, null, null, null, null]);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload property.");
    }
  };

  const fileToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 p-10 bg-gray-50 min-h-screen"
    >
      <h1 className="text-3xl font-semibold">Add New Property</h1>

      {/* Property Basic Info */}
      <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <Label className="mb-3">Property Name</Label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-3">Price per Night</Label>
          <Input
            type="number"
            value={formData.pricePerNight}
            onChange={(e) =>
              handleChange("pricePerNight", parseFloat(e.target.value))
            }
          />
        </div>

        <div>
          <Label className="mb-3">Beds</Label>
          <Input
            type="number"
            value={formData.beds}
            onChange={(e) => handleChange("beds", parseInt(e.target.value))}
          />
        </div>

        <div>
          <Label className="mb-3">Baths</Label>
          <Input
            type="number"
            value={formData.baths}
            onChange={(e) => handleChange("baths", parseInt(e.target.value))}
          />
        </div>

        <div className="col-span-2">
          <Label className="mb-3">Features (comma separated)</Label>
          <Textarea
            value={formData.features}
            onChange={(e) => handleChange("features", e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            checked={formData.poolAvailable}
            onCheckedChange={(val) => handleChange("poolAvailable", val)}
          />
          <Label className="mb-3">Pool Available</Label>
        </div>
      </div>

      {/* Address Section */}
      <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-sm">
        <div>
          <Label className="mb-3">State</Label>
          <Input
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-3">City</Label>
          <Input
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        <div>
          <Label className="mb-3">Country</Label>
          <Input
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label className="mb-3">Latitude</Label>
            <Input
              type="number"
              value={formData.latitude}
              onChange={(e) => handleChange("latitude", e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Label className="mb-3">Longitude</Label>
            <Input
              type="number"
              value={formData.longitude}
              onChange={(e) => handleChange("longitude", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Upload Images */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Label className="mb-3">Upload Property Images</Label>
        <div className="flex flex-wrap gap-5 mt-4">
          {images.map((_, idx) => (
            <UploadCard
              key={idx}
              onChange={(file: File) =>
                setImages((prev) => {
                  const updated = [...prev];
                  updated[idx] = file;
                  return updated;
                })
              }
            />
          ))}
        </div>
      </div>

      <div>
        <Button type="submit" className="mt-4 px-6 py-2 text-base">
          Submit Property
        </Button>
      </div>
    </form>
  );
}
