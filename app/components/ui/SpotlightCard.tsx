"use client";

export function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`card ${className} group`}>
      <div 
        className="spotlight absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(255,107,0,0.12), transparent 40%)"
        }}
      />
      <div 
        className="border-spotlight absolute inset-0 opacity-0 transition-opacity duration-500 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x, -100px) var(--mouse-y, -100px), rgba(255,107,0,0.6), transparent 40%)",
          maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
          borderRadius: "inherit"
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
