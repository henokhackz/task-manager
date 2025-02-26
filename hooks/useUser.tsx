"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);
  const { data, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && data?.user?.id) {
      setUserId(data.user.id);
    }
  }, [data, isPending]);

  return { userId, isPending };
}
