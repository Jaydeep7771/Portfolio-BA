"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(
  () => import("@/components/chat/chat-widget").then((m) => m.ChatWidget),
  { ssr: false }
);

/**
 * Loads the assistant after the page is idle.
 *
 * The widget is a floating affordance with no SEO value and nothing above the
 * fold depends on it, so there is no reason for its JS to compete with the
 * rest of the page during load. `requestIdleCallback` pushes it past the
 * initial render; the 2s timeout is the fallback for browsers without it.
 */
export function ChatWidgetLoader() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    let idleId: number | undefined;
    const timeoutId = window.setTimeout(() => setReady(true), 2000);

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(() => setReady(true), {
        timeout: 2500,
      });
    }

    return () => {
      window.clearTimeout(timeoutId);
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!ready) return null;
  return <ChatWidget />;
}
