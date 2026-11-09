"use client";

import { useState } from "react";

export function Faq({ muc }: { muc: { q: string; a: string }[] }) {
  const [mo, setMo] = useState<number | null>(0);
  return (
    <ul className="divide-y divide-than-chi/15 border-y border-than-chi/15">
      {muc.map((m, i) => {
        const dangMo = mo === i;
        return (
          <li key={m.q}>
            <button
              type="button"
              aria-expanded={dangMo}
              onClick={() => setMo(dangMo ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="tieu-de text-lg md:text-xl">{m.q}</span>
              <span
                aria-hidden="true"
                className={`inline-block h-2.5 w-2.5 shrink-0 bg-champagne transition-transform duration-300 ${
                  dangMo ? "rotate-[135deg]" : "rotate-45"
                }`}
              />
            </button>
            {dangMo && <p className="max-w-3xl pb-6 text-than-chi/80">{m.a}</p>}
          </li>
        );
      })}
    </ul>
  );
}
