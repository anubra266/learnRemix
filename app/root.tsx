import {
  ErrorBoundaryComponent,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import type { MetaFunction } from "remix";
import { Button, ChakraProvider, Heading } from "@chakra-ui/react";
import { ChakraDocument, ChakraStyles } from "~/chakraDocument";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <ChakraDocument>
      {({ emotionCache }) => (
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
            <Meta />
            <Links />
            <ChakraStyles emotionCache={emotionCache} />
          </head>
          <body>
            <ChakraProvider>
              <Outlet />
            </ChakraProvider>
            <ScrollRestoration />
            <Scripts />
            {process.env.NODE_ENV === "development" && <LiveReload />}
          </body>
        </html>
      )}
    </ChakraDocument>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <ChakraDocument>
      {({ emotionCache }) => (
        <html>
          <head>
            <title>Oops!</title>
            <Meta />
            <Links />
            <ChakraStyles emotionCache={emotionCache} />
          </head>
          <body>
            <ChakraProvider>
              <Heading>
                {caught.status} - {caught.statusText}
              </Heading>
              <Button>Go back</Button>
            </ChakraProvider>
            <Scripts />
          </body>
        </html>
      )}
    </ChakraDocument>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <ChakraDocument>
      {({ emotionCache }) => (
        <html>
          <head>
            <title>Oh no!</title>
            <Meta />
            <Links />
            <ChakraStyles emotionCache={emotionCache} />
          </head>
          <body>
            <ChakraProvider>
              Error
              {/* add the UI you want your users to see */}
            </ChakraProvider>
            <Scripts />
          </body>
        </html>
      )}
    </ChakraDocument>
  );
};
