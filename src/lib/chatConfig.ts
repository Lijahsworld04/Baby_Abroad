/**
 * Chat assistant settings.
 * CHAT_URL is the public chat address from the n8n "Chat Trigger" node.
 * It is public by design (like the EmailJS public key): it is visible in the page.
 * While it is empty, the chat bubble is simply not shown.
 */
export const CHAT_URL = "https://n8n.gobabyabroad.com/webhook/f986c3c5-fa85-4995-a5bc-dd453d697daf/chat";

export const CHAT_NAME = "Aajah";
export const CHAT_GREETING =
  "Hi love! I'm Aajah, Baby Abroad's AI helper. Ask me about moving abroad, our services, or how booking works.";
export const CHAT_MAX_CHARS = 500;
