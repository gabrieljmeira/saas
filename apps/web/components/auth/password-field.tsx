"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: string;
  showStrength?: boolean;
}

export function PasswordField({
  label,
  id,
  error,
  showStrength,
  ...props
}: PasswordFieldProps) {
  const [show, setShow] = React.useState(false);
  const [value, setValue] = React.useState("");

  const calculateStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };

  const strength = calculateStrength(value);

  const getStrengthLabel = () => {
    if (strength === 0) return "";
    if (strength <= 1) return "Fraca";
    if (strength <= 2) return "Razoável";
    return "Forte";
  };

  const getStrengthColor = () => {
    if (strength === 0) return "bg-slate-800";
    if (strength <= 1) return "bg-red-500";
    if (strength <= 2) return "bg-orange-500";
    return "bg-emerald-500";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={error ? "text-red-400" : ""}>
        {label}
      </Label>
      <div className="relative">
        <Input
          {...props}
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            props.onChange?.(e);
          }}
          className={`pr-10 ${error ? "border-red-500/50 focus-visible:ring-red-500/20" : ""}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {showStrength && value.length > 0 && (
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 flex gap-1 h-1">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`flex-1 rounded-full ${
                  strength >= level ? getStrengthColor() : "bg-slate-800"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500 w-12 text-right">
            {getStrengthLabel()}
          </span>
        </div>
      )}

      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
