"use client";

import { useCallback, useState } from "react";
import { TELOS as FALLBACK, type Telos } from "./data";
import { REAL_TELOS } from "./data-real";

const USE_REAL = true;   // toggle false to fall back to sample data

export function useTelosData(): { telos: Telos | null; refetch: () => void; error: string | null } {
  const [version, setVersion] = useState<number>(0);

  const refetch = useCallback(() => {
    setVersion((value) => value + 1);
  }, []);

  void version;
  return { telos: USE_REAL ? REAL_TELOS : FALLBACK, refetch, error: null };
}
