"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageSquare, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  knowledgeBase,
  suggestedQuestions,
  type KnowledgeEntry,
} from "@/data/knowledge-base";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  link?: KnowledgeEntry["link"];
};

const FALLBACK =
  "I don't have a good answer for that one — I only know what's on this site. Try asking about her experience, a specific project, her analytics or AI work, or how to get in touch.";

const STOP_WORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "do", "does", "did", "of",
  "to", "in", "on", "for", "with", "and", "or", "me", "my", "you", "your",
  "she", "her", "about", "what", "how", "can", "tell", "show", "i", "it",
  "that", "this", "have", "has", "any", "please",
]);

/** Token-overlap scoring. Crude, predictable, and good enough for 14 entries. */
function retrieve(query: string): KnowledgeEntry | null {
  const tokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));

  if (tokens.length === 0) return null;

  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const keyword of entry.keywords) {
      for (const token of tokens) {
        if (keyword === token) score += 3;
        else if (keyword.includes(token) || token.includes(keyword)) score += 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 2 ? best : null;
}

export function ChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: "Hi — I'm a small assistant trained on this portfolio. Ask me about Juveriyah's experience, projects or skills and I'll point you to the right page.",
    },
  ]);

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const nextId = React.useRef(1);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  React.useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes the panel.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ask = React.useCallback((question: string) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: nextId.current++, role: "user", text: trimmed },
    ]);
    setInput("");
    setThinking(true);

    // A short delay so answers don't appear instantly — reads as considered
    // rather than as a lookup table, which is what it is.
    window.setTimeout(() => {
      const hit = retrieve(trimmed);
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "assistant",
          text: hit?.answer ?? FALLBACK,
          link: hit?.link,
        },
      ]);
      setThinking(false);
    }, 520);
  }, []);

  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Ask the portfolio assistant"}
        aria-expanded={open}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-[60] grid size-[3.25rem] place-items-center rounded-full bg-primary text-background shadow-[var(--shadow-lg)] sm:bottom-7 sm:right-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            className="absolute grid place-items-center"
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <MessageSquare className="size-5" />
            )}
          </motion.span>
        </AnimatePresence>
        {!open ? (
          <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-background bg-accent" />
        ) : null}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-label="Portfolio assistant"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed bottom-[5.5rem] right-4 z-[60] flex h-[min(30rem,70vh)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-[1.4rem] border border-border shadow-[var(--shadow-lg)] sm:right-7"
          >
            <header className="flex items-center gap-2.5 border-b border-border px-4 py-3.5">
              <span className="grid size-8 place-items-center rounded-lg bg-accent/15">
                <Sparkles className="size-4 text-accent-text" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">
                  Portfolio Assistant
                </p>
                <p className="truncate text-[0.68rem] text-tertiary">
                  Answers from this site only
                </p>
              </div>
            </header>

            <div
              ref={scrollRef}
              className="hide-scrollbar flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.8rem] leading-relaxed",
                    msg.role === "user"
                      ? "ml-auto bg-primary text-background"
                      : "bg-surface-muted text-primary"
                  )}
                >
                  {msg.text}
                  {msg.link ? (
                    <Link
                      href={msg.link.href}
                      onClick={() => setOpen(false)}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-accent-text hover:underline"
                    >
                      {msg.link.label}
                      <ArrowRight className="size-3" />
                    </Link>
                  ) : null}
                </motion.div>
              ))}

              {thinking ? (
                <div className="flex w-fit gap-1 rounded-2xl bg-surface-muted px-3.5 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-tertiary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              ) : null}

              {messages.length === 1 ? (
                <div className="space-y-1.5 pt-1">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => ask(q)}
                      className="block w-full rounded-xl border border-border bg-surface px-3 py-2 text-left text-[0.74rem] text-secondary transition-colors hover:border-accent/40 hover:text-primary"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-border px-3 py-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about her work…"
                aria-label="Your question"
                className="min-w-0 flex-1 bg-transparent px-2 text-[0.8rem] text-primary outline-none placeholder:text-tertiary"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send question"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-accent text-[var(--accent-contrast)] transition-opacity disabled:opacity-35"
              >
                <Send className="size-3.5" />
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
