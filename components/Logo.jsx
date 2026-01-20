export default function Logo({ className = "w-8 h-8", textClassName = "text-xl" }) {
    return (
        <div className="flex items-center gap-2">
            <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e40af" /> {/* Blue-800 */}
                        <stop offset="100%" stopColor="#0f172a" /> {/* Slate-900 */}
                    </linearGradient>
                </defs>
                <path
                    d="M16 2L3 14H6V28H12V18H20V28H26V14H29L16 2Z"
                    fill="url(#logoGradient)"
                    stroke="white"
                    strokeWidth="0" // Flat modern look
                    className="drop-shadow-sm"
                />
                {/* Optional: Add a subtle 'smile' or pin curve to make it unique */}
                <circle cx="16" cy="14" r="3" fill="white" fillOpacity="0.9" />
            </svg>
            <span className={`font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-slate-900 hidden sm:block ${textClassName}`}>
                KostJepara
            </span>
        </div>
    )
}
