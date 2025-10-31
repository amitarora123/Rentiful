"use client";

import React, { useState, DragEvent, SetStateAction } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X } from "lucide-react";
import Image from "next/image";

const UploadCard = ({ onChange }: { onChange: (image: File) => void }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    onChange(file);
    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleRemove = () => setPreview(null);

  return (
    <div className="w-64">
      <Card
        className={`h-60 w-full border-2 p-0 border-dashed transition-all duration-200 
        ${
          isDragging
            ? "border-blue-400 bg-blue-50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50"
        } 
        flex flex-col items-center justify-center relative rounded-xl`}
      >
        <CardContent className="flex flex-col items-center justify-center h-full w-full p-0">
          {preview ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover rounded-xl"
                fill
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1 shadow"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="upload-input"
              className="cursor-pointer flex flex-col items-center justify-center h-full w-full text-center rounded-xl"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="rounded-full bg-gray-100 p-4 mb-3 shadow-sm">
                <Upload className="h-8 w-8 text-gray-400" strokeWidth={1.5} />
              </div>
              <p className="text-sm font-medium text-gray-700">
                {isDragging ? "Drop to upload" : "Click or drag file to upload"}
              </p>
              <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
              <input
                id="upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadCard;
