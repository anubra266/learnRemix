import { EmotionCache, withEmotionCache } from "@emotion/react";
import ServerStyleContext from "./context.server";
import ClientStyleContext from "./context.client";
import React from "react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { runIfFn } from "@chakra-ui/utils";

interface DocumentProps {
  children: MaybeRenderProp<{ emotionCache: EmotionCache }>;
}

export const ChakraDocument = withEmotionCache(
  (document: DocumentProps, emotionCache) => {
    const { children } = document;
    return runIfFn(children, { emotionCache });
  }
);

export function ChakraStyles({ emotionCache }: { emotionCache: EmotionCache }) {
  const serverSyleData = React.useContext(ServerStyleContext);
  const clientStyleData = React.useContext(ClientStyleContext);

  // Only executed on client
  React.useEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
  }, []);

  return serverSyleData ? (
    <>
      {serverSyleData?.map(({ key, ids, css }) => (
        <style
          key={key}
          data-emotion={`${key} ${ids.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: css }}
        />
      ))}
    </>
  ) : null;
}
