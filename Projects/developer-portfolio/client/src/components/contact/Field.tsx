import { useId } from "react";

export function InputField({
  label,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-white/70 mb-1">
        {label}
        {required && <span className="text-[#22D3EE]">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={
          (error ? "ring-2 ring-red-400/60 " : "") +
          " w-full rounded-xl bg-white/[.06] border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
        }
        aria-invalid={!!error}
        aria-describedby={error ? id + "-err" : undefined}
      />
      {error && (
        <div id={id + "-err"} className="mt-1 text-xs text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  error,
  placeholder,
  rows = 6,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-white/70 mb-1">
        {label}
        {required && <span className="text-[#22D3EE]">*</span>}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={
          (error ? "ring-2 ring-red-400/60 " : "") +
          " w-full rounded-xl bg-white/[.06] border border-white/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#22D3EE]/60"
        }
        aria-invalid={!!error}
        aria-describedby={error ? id + "-err" : undefined}
      />
      {error && (
        <div id={id + "-err"} className="mt-1 text-xs text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}
