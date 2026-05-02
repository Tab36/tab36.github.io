// ─────────────────────────────────────────────────────────────
//  TAB36 — PROJECT LIST
//  Edit this file to add, remove, or reorder projects.
//
//  Each project object has these fields:
//
//  title       {string}  — displayed on the card and popup
//  tag         {string}  — small label, e.g. "web · 2024"
//  thumb       {string}  — path or URL to thumbnail image
//                          e.g. "imgs/project1.png" or "https://..."
//  emoji       {string}  — fallback emoji shown if image fails to load
//  shortDesc   {string}  — 1–2 sentences shown on the card
//  fullDesc    {string}  — full description shown in the popup
//                          use \n\n to create paragraph breaks
//  hasLink     {boolean} — true  → "View project ↗" button
//                          false → "Download ↓" button
//  url         {string}  — href for whichever button is shown
// ─────────────────────────────────────────────────────────────

const PROJECTS = [
    {
        title:     "Project 1",
        tag:       "web · 2024",
        thumb:     "imgs/project1.png",
        emoji:     "⚡",
        shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        fullDesc:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        hasLink:   true,
        url:       "https://example.com",
    },
    {
        title:     "Project 2",
        tag:       "design · 2024",
        thumb:     "imgs/project2.png",
        emoji:     "🌿",
        shortDesc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
        fullDesc:  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.\n\nNeque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.",
        hasLink:   false,
        url:       "https://example.com/download.zip",
    },
    {
        title:     "Project 3",
        tag:       "tool · 2023",
        thumb:     "imgs/project3.png",
        emoji:     "🔥",
        shortDesc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
        fullDesc:  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.\n\nNam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
        hasLink:   true,
        url:       "https://example.com",
    },
    {
        title:     "Project 4",
        tag:       "app · 2023",
        thumb:     "imgs/project4.png",
        emoji:     "💎",
        shortDesc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
        fullDesc:  "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut voluptates repudiandae.\n\nItaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur.",
        hasLink:   false,
        url:       "https://example.com/download.zip",
    },
    {
        title:     "Project 5",
        tag:       "research · 2022",
        thumb:     "imgs/project5.png",
        emoji:     "🌀",
        shortDesc: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        fullDesc:  "Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.\n\nUllamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit.",
        hasLink:   true,
        url:       "https://example.com",
    },
    {
        title:     "Project 6",
        tag:       "experiment · 2022",
        thumb:     "imgs/project6.png",
        emoji:     "🛸",
        shortDesc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia dolores.",
        fullDesc:  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut voluptates repudiandae.\n\nItaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias consequatur.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem.",
        hasLink:   false,
        url:       "https://example.com/download.zip",
    },
];