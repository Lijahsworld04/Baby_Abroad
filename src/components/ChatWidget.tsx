import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Send, X } from "lucide-react";
import { CHAT_GREETING, CHAT_MAX_CHARS, CHAT_NAME, CHAT_URL } from "@/lib/chatConfig";

interface Msg {
  id: number;
  from: "bot" | "me";
  text: string;
}

const SESSION_KEY = "baby-abroad-chat-session";

function getSessionId(): string {
  try {
    const saved = window.sessionStorage.getItem(SESSION_KEY);
    if (saved) return saved;
  } catch {
    /* storage blocked: fall through */
  }
  const id = crypto.randomUUID();
  try {
    window.sessionStorage.setItem(SESSION_KEY, id);
  } catch {
    /* ignore */
  }
  return id;
}

/** Reads n8n's reply, whether it is a single JSON object or streamed JSON lines. */
function parseReply(raw: string): string {
  const text = raw.trim();
  try {
    const j = JSON.parse(text);
    const out = j.output ?? j.text ?? j.message ?? (Array.isArray(j) ? j[0]?.output : undefined);
    if (typeof out === "string") return out;
  } catch {
    /* maybe streamed lines */
  }
  let acc = "";
  for (const line of text.split("\n")) {
    try {
      const j = JSON.parse(line);
      if (j.type === "item" && typeof j.content === "string") acc += j.content;
    } catch {
      /* skip */
    }
  }
  return acc;
}

/** Tiny, safe formatter: **bold** only. Everything else stays plain text (no HTML, no links). */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>,
      )}
    </>
  );
}

function Avatar({ size }: { size: number }) {
  return (
    <img
      src="/mascot.png"
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full object-contain"
      style={{ width: size, height: size, background: "var(--chat-avatar-bg)" }}
    />
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: CHAT_GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const nextId = useRef(1);
  const session = useRef<string>("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs, busy, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!CHAT_URL) return null;

  const add = (from: Msg["from"], text: string) =>
    setMsgs((m) => [...m, { id: nextId.current++, from, text }]);

  async function send(e?: FormEvent) {
    e?.preventDefault();
    const text = input.trim().slice(0, CHAT_MAX_CHARS);
    if (!text || busy) return;
    setInput("");
    add("me", text);
    setBusy(true);
    if (!session.current) session.current = getSessionId();
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 45000);
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "sendMessage", sessionId: session.current, chatInput: text }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error(String(res.status));
      const reply = parseReply(await res.text());
      add("bot", reply || "Hmm, I didn't catch that. Could you try asking another way?");
    } catch {
      add(
        "bot",
        "Sorry love, I'm having trouble right now. You can reach Aalijah at contact@gobabyabroad.com or through the Contact page.",
      );
    } finally {
      setBusy(false);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <div className="chat-widget">
      {open && (
        <section className="chat-panel" role="dialog" aria-label={`Chat with ${CHAT_NAME}`}>
          <header className="chat-header">
            <Avatar size={44} />
            <div className="min-w-0 flex-1">
              <p className="chat-title">{CHAT_NAME}</p>
              <p className="chat-sub">Baby Abroad's AI helper</p>
            </div>
            <button
              type="button"
              className="chat-close"
              aria-label="Close chat"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </header>

          <div ref={logRef} className="chat-log" role="log" aria-live="polite" aria-relevant="additions">
            {msgs.map((m) => (
              <div key={m.id} className={m.from === "me" ? "chat-row chat-row-me" : "chat-row"}>
                {m.from === "bot" && <Avatar size={32} />}
                <div className={m.from === "me" ? "chat-msg chat-msg-me" : "chat-msg chat-msg-bot"}>
                  <Rich text={m.text} />
                </div>
              </div>
            ))}
            {busy && (
              <div className="chat-row">
                <Avatar size={32} />
                <div className="chat-msg chat-msg-bot" role="status" aria-label={`${CHAT_NAME} is typing`}>
                  <span className="chat-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={send}>
            <label htmlFor="chat-input" className="sr-only">
              Message {CHAT_NAME}
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={CHAT_MAX_CHARS}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your question..."
              className="chat-input"
            />
            <button type="submit" className="chat-send" disabled={busy || !input.trim()} aria-label="Send message">
              <Send className="size-5" aria-hidden="true" />
            </button>
          </form>
          <p className="chat-note">
            AI helper, not legal or immigration advice. Please don't share passwords or ID numbers.{" "}
            <Link to="/privacy">Privacy</Link>
          </p>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        className="chat-launcher"
        aria-label={open ? "Close chat" : `Chat with ${CHAT_NAME}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X className="size-7" aria-hidden="true" /> : <MessageCircle className="size-7" aria-hidden="true" />}
      </button>
    </div>
  );
}
