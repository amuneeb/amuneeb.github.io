/**
 * Inline SVG of the Falah Academy platform architecture. Inline (not an
 * image file) so colors follow the theme and text stays crisp; the
 * title/desc pair carries the flow for screen readers. Two front doors
 * (public site, family portal) plus the teachers' Google tools all feed
 * one Supabase backend, with three side systems and a dev/prod note.
 */

const BOX =
  "fill-white stroke-neutral-300 dark:fill-neutral-900 dark:stroke-neutral-700";
const ACCENT_BOX =
  "fill-accent-50 stroke-accent-600 dark:fill-accent-950 dark:stroke-accent-400";
const TEXT = "fill-neutral-700 dark:fill-neutral-300";
const TEXT_ACCENT = "fill-accent-800 dark:fill-accent-300";
const TEXT_MUTED = "fill-neutral-500";
const ARROW = "stroke-neutral-400";

export function FalahArchitectureDiagram() {
  return (
    <svg
      viewBox="0 0 720 486"
      role="img"
      aria-labelledby="falah-diagram-title falah-diagram-desc"
      className="h-auto w-full"
    >
      <title id="falah-diagram-title">
        Falah Academy platform architecture
      </title>
      <desc id="falah-diagram-desc">
        Parents and prospects use the static public website (GitHub Pages),
        whose admissions form inserts directly into Supabase over REST. Parents
        and admins use the React family portal at /platform/, which talks to
        Supabase through supabase-js with the publishable key and Row-Level
        Security. Teachers never log in to the portal; they work in Google
        Sheets, Forms and Drive, and Google Apps Script syncs that data into
        Supabase. Supabase (Postgres with 29 tables, 76 RLS policies, 21
        functions, 11 triggers, Auth, Storage and an Edge Function) connects to
        three side systems: Google Apps Script, GitHub Actions cron workflows,
        and Brevo for email. The whole stack runs in separate dev and prod
        environments, promoted local preview to dev to prod.
      </desc>
      <defs>
        <marker
          id="falah-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="7"
          refY="4"
          orient="auto"
        >
          <path
            d="M1,1 L7,4 L1,7"
            fill="none"
            className={ARROW}
            strokeWidth="1.5"
          />
        </marker>
      </defs>

      {/* User labels */}
      <text
        x="130"
        y="14"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[11px] font-semibold`}
      >
        Parents / Prospects
      </text>
      <text
        x="360"
        y="14"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[11px] font-semibold`}
      >
        Parents + Admin
      </text>
      <text
        x="596"
        y="14"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[11px] font-semibold`}
      >
        Teachers
      </text>
      <line
        x1="130"
        y1="18"
        x2="130"
        y2="30"
        className={ARROW}
        markerEnd="url(#falah-arrow)"
      />
      <line
        x1="360"
        y1="18"
        x2="360"
        y2="30"
        className={ARROW}
        markerEnd="url(#falah-arrow)"
      />
      <line
        x1="596"
        y1="18"
        x2="596"
        y2="30"
        className={ARROW}
        markerEnd="url(#falah-arrow)"
      />

      {/* Front doors */}
      <rect x="24" y="32" width="212" height="66" rx="8" className={BOX} />
      <text
        x="130"
        y="52"
        textAnchor="middle"
        className={`${TEXT} text-[12.5px] font-semibold`}
      >
        Public website
      </text>
      <text
        x="130"
        y="68"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        static · GitHub Pages
      </text>
      <text
        x="130"
        y="82"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        15 pages · admissions form
      </text>

      <rect x="252" y="32" width="216" height="66" rx="8" className={BOX} />
      <text
        x="360"
        y="50"
        textAnchor="middle"
        className={`${TEXT} text-[12.5px] font-semibold`}
      >
        Family Portal · /platform/
      </text>
      <text
        x="360"
        y="66"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        React 19 · TS · Vite · Tailwind · HashRouter
      </text>
      <text
        x="360"
        y="80"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        18 admin screens + parent home
      </text>

      <rect x="484" y="32" width="212" height="66" rx="8" className={BOX} />
      <text
        x="590"
        y="52"
        textAnchor="middle"
        className={`${TEXT} text-[12px] font-semibold`}
      >
        Google Sheets · Forms · Drive
      </text>
      <text
        x="590"
        y="68"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        the teachers&apos; interface
      </text>
      <text
        x="590"
        y="82"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[9.5px] italic`}
      >
        teachers never log in to the portal
      </text>

      {/* Front doors -> Supabase */}
      <line
        x1="150"
        y1="98"
        x2="260"
        y2="148"
        className={ARROW}
        markerEnd="url(#falah-arrow)"
      />
      <text x="150" y="126" className={`${TEXT_MUTED} text-[9.5px]`}>
        admission form → REST insert
      </text>
      <line
        x1="360"
        y1="98"
        x2="360"
        y2="148"
        className={ARROW}
        markerEnd="url(#falah-arrow)"
      />
      <text x="368" y="126" className={`${TEXT_MUTED} text-[9.5px]`}>
        supabase-js · publishable key + RLS
      </text>

      {/* Supabase */}
      <rect
        x="150"
        y="150"
        width="420"
        height="92"
        rx="8"
        className={ACCENT_BOX}
      />
      <text
        x="360"
        y="172"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[15px] font-semibold`}
      >
        Supabase
      </text>
      <text
        x="360"
        y="192"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[11px]`}
      >
        Postgres · 29 tables · 76 RLS policies
      </text>
      <text
        x="360"
        y="208"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[11px]`}
      >
        21 functions / RPCs · 11 triggers
      </text>
      <text
        x="360"
        y="224"
        textAnchor="middle"
        className={`${TEXT_ACCENT} text-[11px]`}
      >
        Auth · Storage · Edge Function
      </text>

      {/* Supabase -> side systems */}
      <line
        x1="240"
        y1="242"
        x2="150"
        y2="300"
        className={ARROW}
        markerEnd="url(#falah-arrow)"
      />
      <text
        x="120"
        y="276"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[9.5px]`}
      >
        SMTP / API
      </text>
      <line
        x1="360"
        y1="242"
        x2="360"
        y2="300"
        className={ARROW}
        markerEnd="url(#falah-arrow)"
      />
      <text x="368" y="276" className={`${TEXT_MUTED} text-[9.5px]`}>
        cron
      </text>
      <line
        x1="480"
        y1="242"
        x2="576"
        y2="300"
        className={ARROW}
        markerEnd="url(#falah-arrow)"
      />
      <text
        x="600"
        y="276"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[9.5px]`}
      >
        service key
      </text>

      {/* Apps Script <-> Google tools (teacher data bridge) */}
      <line
        x1="596"
        y1="300"
        x2="596"
        y2="100"
        className={ARROW}
        strokeDasharray="2 3"
        markerEnd="url(#falah-arrow)"
      />
      <text x="600" y="150" className={`${TEXT_MUTED} text-[9.5px]`}>
        sync
      </text>

      {/* Side systems */}
      <rect x="24" y="302" width="204" height="64" rx="8" className={BOX} />
      <text
        x="126"
        y="322"
        textAnchor="middle"
        className={`${TEXT} text-[12px] font-semibold`}
      >
        Brevo
      </text>
      <text
        x="126"
        y="338"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        auth emails
      </text>
      <text
        x="126"
        y="352"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        + daily digest
      </text>

      <rect x="258" y="302" width="204" height="64" rx="8" className={BOX} />
      <text
        x="360"
        y="322"
        textAnchor="middle"
        className={`${TEXT} text-[12px] font-semibold`}
      >
        GitHub Actions
      </text>
      <text
        x="360"
        y="338"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        daily digest · keep-alive
      </text>
      <text
        x="360"
        y="352"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        weekly encrypted backup
      </text>

      <rect x="492" y="302" width="204" height="64" rx="8" className={BOX} />
      <text
        x="594"
        y="322"
        textAnchor="middle"
        className={`${TEXT} text-[12px] font-semibold`}
      >
        Google Apps Script ×3
      </text>
      <text
        x="594"
        y="338"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        attendance sync · class /
      </text>
      <text
        x="594"
        y="352"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10px]`}
      >
        Qur&apos;an forms · Drive assignments
      </text>

      {/* Environments footnote */}
      <line
        x1="24"
        y1="404"
        x2="696"
        y2="404"
        className={ARROW}
        strokeDasharray="4 3"
      />
      <text
        x="360"
        y="428"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10.5px]`}
      >
        Two environments — dev and prod (separate repos + Supabase projects)
      </text>
      <text
        x="360"
        y="446"
        textAnchor="middle"
        className={`${TEXT_MUTED} text-[10.5px]`}
      >
        promotion: local preview → dev → prod
      </text>
    </svg>
  );
}
