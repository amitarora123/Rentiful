"use client";

import React from "react";
import { MapProvider } from "@/context/map-context";
import StoreProvider from "@/store/StoreProvider";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./(auth)/AuthProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MapProvider>
      <StoreProvider>
        <Authenticator.Provider>
          <Auth>{children}</Auth>
        </Authenticator.Provider>
      </StoreProvider>
    </MapProvider>
  );
};

export default Providers;
