import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { IoLogoGithub } from "react-icons/io";
import "./app.css";
import {IconContext} from "react-icons";

export function Layout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <Meta />
        <Links />
      </head>
      <body className="subpixel-antialiased bg-navy-blue-magenta text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>);
}

export default function App() {
  return (<>
      <a href="https://github.com/Wiktor-Sikora/glossary" target={"_blank"} className={"collapse md:visible fixed top-5 right-5 hover:scale-110 duration-200"}>
          <IconContext.Provider value={{size: "3rem", className: "fill-white" }}><IoLogoGithub /></IconContext.Provider>
      </a>
      <Outlet />
  </>);
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
