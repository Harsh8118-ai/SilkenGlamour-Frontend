"use client"

export function MehndiIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Hand outline - bride's hand in 3/4 profile */}
        <path
          d="M200 350 C180 340, 160 320, 150 280 L150 200 C150 180, 140 160, 130 150 L130 100 C130 80, 140 60, 160 60 C180 60, 190 80, 190 100 L190 140"
          stroke="#6C0A12"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        />

        {/* Fingers with varied stroke widths */}
        <path
          d="M190 140 L190 80 C190 60, 200 40, 220 40 C240 40, 250 60, 250 80 L250 140"
          stroke="#6C0A12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "0.3s" }}
        />
        <path
          d="M250 140 L250 70 C250 50, 260 30, 280 30 C300 30, 310 50, 310 70 L310 140"
          stroke="#6C0A12"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "0.6s" }}
        />
        <path
          d="M310 140 L310 90 C310 70, 320 50, 340 50 C360 50, 370 70, 370 90 L370 140"
          stroke="#6C0A12"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "0.9s" }}
        />

        {/* Palm */}
        <path
          d="M150 200 L150 280 C150 320, 170 340, 200 350 C230 340, 250 320, 250 280 L250 140 L310 140 L370 140 L370 200 C370 240, 350 270, 320 290 C290 310, 250 320, 200 350"
          stroke="#6C0A12"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "1.2s" }}
        />

        {/* Central mandala on palm - intricate design */}
        <circle
          cx="260"
          cy="220"
          r="45"
          stroke="#6C0A12"
          strokeWidth="1.8"
          fill="none"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "1.5s" }}
        />
        <circle
          cx="260"
          cy="220"
          r="35"
          stroke="#6C0A12"
          strokeWidth="1.4"
          fill="none"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "1.6s" }}
        />
        <circle
          cx="260"
          cy="220"
          r="25"
          stroke="#6C0A12"
          strokeWidth="1.2"
          fill="none"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "1.7s" }}
        />
        <circle
          cx="260"
          cy="220"
          r="15"
          stroke="#6C0A12"
          strokeWidth="1"
          fill="none"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "1.8s" }}
        />

        {/* Mandala petals */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`petal-${i}`}
            x1="260"
            y1="220"
            x2="260"
            y2="175"
            stroke="#6C0A12"
            strokeWidth="1"
            transform={`rotate(${i * 45} 260 220)`}
            className="animate-draw"
            style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: `${1.9 + i * 0.05}s` }}
          />
        ))}

        {/* Paisley patterns around palm */}
        <path
          d="M220 180 Q210 170, 220 160 Q230 150, 240 160 Q250 170, 240 180 Q230 190, 220 180 Z"
          stroke="#6C0A12"
          strokeWidth="1.4"
          fill="none"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "2.1s" }}
        />
        <path
          d="M215 175 Q220 170, 225 175"
          stroke="#6C0A12"
          strokeWidth="0.8"
          fill="none"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "2.2s" }}
        />

        <path
          d="M300 260 Q290 250, 300 240 Q310 230, 320 240 Q330 250, 320 260 Q310 270, 300 260 Z"
          stroke="#6C0A12"
          strokeWidth="1.4"
          fill="none"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "2.3s" }}
        />
        <path
          d="M295 255 Q300 250, 305 255"
          stroke="#6C0A12"
          strokeWidth="0.8"
          fill="none"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "2.4s" }}
        />

        {/* Wrist floral clusters - jasmine & marigold inspired */}
        <g transform="translate(180, 310)">
          <circle cx="0" cy="0" r="6" stroke="#6C0A12" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="3" fill="#C69C3A" opacity="0.7" />
          <circle cx="12" cy="4" r="5" stroke="#6C0A12" strokeWidth="0.8" fill="none" />
          <circle cx="12" cy="4" r="2" fill="#C69C3A" opacity="0.6" />
          <circle cx="-8" cy="6" r="5" stroke="#6C0A12" strokeWidth="0.8" fill="none" />
          <circle cx="-8" cy="6" r="2" fill="#C69C3A" opacity="0.6" />
        </g>

        {/* Finger patterns - intricate details */}
        {[
          { x: 190, y: 100 },
          { x: 250, y: 90 },
          { x: 310, y: 95 },
          { x: 370, y: 105 },
        ].map((pos, i) => (
          <g
            key={i}
            className="animate-draw"
            style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: `${2.5 + i * 0.15}s` }}
          >
            <line x1={pos.x} y1={pos.y - 15} x2={pos.x} y2={pos.y + 15} stroke="#6C0A12" strokeWidth="1" />
            <circle cx={pos.x} cy={pos.y} r="4" stroke="#6C0A12" strokeWidth="1" fill="none" />
            <circle cx={pos.x} cy={pos.y} r="2" stroke="#6C0A12" strokeWidth="0.8" fill="none" />
            <line x1={pos.x - 3} y1={pos.y} x2={pos.x + 3} y2={pos.y} stroke="#6C0A12" strokeWidth="0.8" />
          </g>
        ))}

        {/* Mehndi cone in background drawing a flourish */}
        <g
          transform="translate(80, 120)"
          className="animate-draw"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animationDelay: "3s" }}
        >
          <path d="M0 0 L20 40 L-20 40 Z" fill="#0B8A63" stroke="#0B8A63" strokeWidth="1.5" />
          <rect x="-3" y="-10" width="6" height="10" fill="#0B8A63" />
          {/* Flourish line being drawn */}
          <path
            d="M0 40 Q10 55, 20 60 Q35 65, 50 60"
            stroke="#6C0A12"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            className="animate-pulse"
          />
        </g>

        {/* Additional decorative florals - marigold clusters */}
        <g transform="translate(340, 320)">
          <circle cx="0" cy="0" r="8" fill="#C69C3A" opacity="0.7" />
          <circle cx="0" cy="0" r="5" stroke="#6C0A12" strokeWidth="0.8" fill="none" />
          <circle cx="15" cy="5" r="6" fill="#C69C3A" opacity="0.6" />
          <circle cx="15" cy="5" r="4" stroke="#6C0A12" strokeWidth="0.8" fill="none" />
          <circle cx="-10" cy="8" r="7" fill="#C69C3A" opacity="0.6" />
          <circle cx="-10" cy="8" r="4" stroke="#6C0A12" strokeWidth="0.8" fill="none" />
        </g>

        {/* Gold foil highlights */}
        <circle cx="260" cy="220" r="5" fill="#C69C3A" opacity="0.8" />
        <circle cx="240" cy="170" r="3" fill="#C69C3A" opacity="0.6" />
        <circle cx="310" cy="250" r="3" fill="#C69C3A" opacity="0.6" />
      </svg>
    </div>
  )
}
