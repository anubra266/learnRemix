import { RemixBrowser } from "remix";

import React from "react";
import { CacheProvider } from "@emotion/react";
import ClientStyleContext from "./context.client";
import { createEmotionCache } from "~/createEmotionCache";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache());

  function reset() {
    setCache(createEmotionCache());
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

export function ChakraRemixBrowser() {
  return (
    <ClientCacheProvider>
      <RemixBrowser />
    </ClientCacheProvider>
  );
}
