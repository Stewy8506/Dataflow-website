"use client";

import dynamic from "next/dynamic";

export const ClientGlobal3DBackground = dynamic(
  () => import("./Global3DBackground").then(mod => mod.Global3DBackground),
  { ssr: false }
);
