import { renderToString } from "react-dom/server";
import { RemixServer, RemixServerProps } from "remix";

import createEmotionServer from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";
import ServerStyleContext from "./context.server";
import { createEmotionCache } from "~/createEmotionCache";

export function ChakraRemixServer(props: RemixServerProps) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  const html = renderToString(
    <ServerStyleContext.Provider value={null}>
      <CacheProvider value={cache}>
        <RemixServer {...props} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );

  const chunks = extractCriticalToChunks(html);

  return (
    <ServerStyleContext.Provider value={chunks.styles}>
      <CacheProvider value={cache}>
        <RemixServer {...props} />
      </CacheProvider>
    </ServerStyleContext.Provider>
  );
}
