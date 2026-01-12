"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Protocol } from "@/lib/models/protocols";

export default function NavbarWrapper() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);

  useEffect(() => {
    fetch("/api/protocols")
      .then((res) => res.json())
      .then((data) => setProtocols(data));
  }, []);

  return <Navbar protocols={protocols} />;
}
