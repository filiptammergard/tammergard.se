import React from "react";
import { useIpLocation } from "./useIpLocation";

export function City() {
  const { ipLocation } = useIpLocation();
  return <>{ipLocation?.city}</>;
}
