"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone } from "lucide-react";

export default function PropertyContactCard() {
  return (
    <Card className="w-full p-4">
      <CardContent className="flex flex-col gap-4">
        {/* Phone Info */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-900 rounded-full">
            <Phone className="text-white w-5 h-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Contact This Property</p>
            <p className="text-lg font-bold">(424) 340-5574</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1">
            Request Tour
          </Button>
          <Button className="flex-1">Message</Button>
        </div>

        <Separator />

        {/* Additional Info */}
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            Language: <span className="font-medium">English, Bahasa</span>
          </p>
          <p>
            Open by appointment on{" "}
            <span className="font-medium">Monday - Sunday</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
