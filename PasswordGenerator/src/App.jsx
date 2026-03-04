import { useCallback, useEffect, useRef, useState } from "react";

export default function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>/?`~";

    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * str.length); // ✅ no +1 (fix)
      pass += str.charAt(idx);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (!password) return;
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9999);
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur">
          <div className="mb-6">
            <h1 className="text-center text-2xl font-semibold tracking-tight">
              Password Generator
            </h1>
            <p className="mt-2 text-center text-sm text-slate-300">
              Choose length and options, then copy with one click.
            </p>
          </div>

          {/* Output + Copy */}
          <div className="flex items-stretch gap-2">
            <div className="flex-1">
              <label className="sr-only">Generated password</label>
              <input
                ref={passwordRef}
                type="text"
                value={password}
                readOnly
                placeholder="Your password will appear here"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 font-mono text-sm tracking-wide text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-xl"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {copied && (
            <p className="mt-2 text-sm text-green-400">
              Copied to clipboard ✅
            </p>
          )}

          {/* Controls */}
          <div className="mt-6 space-y-5">
            {/* Length */}
            <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-200">
                  Length
                </span>
                <span className="rounded-lg bg-white/5 px-2 py-1 text-sm text-slate-200">
                  {length}
                </span>
              </div>

              <input
                type="range"
                min={6}
                max={100}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))} // ✅ number (fix)
                className="mt-3 w-full cursor-pointer accent-indigo-500"
              />

              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>6</span>
                <span>100</span>
              </div>
            </div>

            {/* Toggles */}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-white/20">
                <span className="text-sm font-medium text-slate-200">
                  Include numbers
                </span>
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  onChange={() => setNumberAllowed((p) => !p)}
                  className="h-5 w-5 cursor-pointer accent-indigo-500"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-white/20">
                <span className="text-sm font-medium text-slate-200">
                  Include symbols
                </span>
                <input
                  type="checkbox"
                  checked={charAllowed}
                  onChange={() => setCharAllowed((p) => !p)}
                  className="h-5 w-5 cursor-pointer accent-indigo-500"
                />
              </label>
            </div>

            {/* Generate button (optional but nice) */}
            <button
              onClick={passwordGenerator}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 active:scale-[0.99]"
            >
              Generate new password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
