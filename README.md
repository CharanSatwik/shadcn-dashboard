# NexusOps — Enterprise Shadcn UI Dashboard

A responsive enterprise analytics and operations dashboard built with **React**, **Vite**, **TypeScript**, **Tailwind CSS**, and **Shadcn UI** component architecture.

---

## 🚀 How to Run the Dashboard

In your terminal from the project folder (`f:\Flutter Projects\shadcn-dashoard`):

### 1. Start the Development Server
```bash
npm run dev
```

The Vite dev server will start instantly and provide a local URL:
```text
  VITE v8.3.5  ready in 150 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 2. Open in your Browser
Open [http://localhost:5173/](http://localhost:5173/) in Chrome, Edge, or any modern web browser.

---

## 🛠️ Other Available Scripts

- **`npm run build`**: Type-checks and bundles the application for production.
- **`npm run preview`**: Serves the production build locally to test optimized assets.

---

## 🌟 Key Features Implemented

1. **Fixed & Collapsible Sidebar Navigation**:
   - Collapsible desktop mode (expands from 72px icon view to 256px full menu) with Radix tooltips.
   - Fully responsive mobile drawer with backdrop overlay.
   - User profile section with initials fallback avatar and quick logout trigger.

2. **Top Navigation Bar**:
   - Global dashboard header with live version badge and contextual subtitles.
   - Quick search input with `Ctrl + K` / `⌘K` global shortcut.
   - Date range selector preset filter ("Today", "Last 7 days", "Last 30 days", etc.).
   - Interactive notification popover with unread counter, mark-as-read, and clear actions.
   - Theme toggle (Light, Dark, and System mode) using Shadcn UI CSS variables.
   - Action buttons (Live data refresh with spinning state, CSV export with toast).

3. **Metrics & Summary Cards**:
   - 4 distinct metric summary cards (Total Revenue, Active Subscriptions, Total Sales, Active Now).
   - Trend badges (positive/negative percentages) and icon highlights.

4. **Graphs & Data Visualizations**:
   - **Monthly Revenue Overview Bar Chart**: Interactive bar chart with target vs actual toggles and custom tooltip.
   - **Conversion Dynamics Area Chart**: Funnel breakdown across Visitors, Qualified Leads, and Paid Orders.
   - **Platform Traffic Donut Chart**: Breakdown of Desktop, Mobile, Tablet, and Other sessions.
   - **Recent Sales Feed**: Customer avatars, emails, and transaction amounts.

5. **Advanced Orders & Transactions Data Table**:
   - Search filter by customer name, email, or transaction ID.
   - Multi-criteria filter by status (Completed, Processing, Pending, Refunded).
   - Column sorting (Customer, Status, Amount, Date).
   - Checkbox selection with batch status updates (Mark completed, Refund).
   - Pagination controls with configurable page sizes (5, 10, 20 rows).
   - Row action menu (View receipt modal, copy transaction ID, resend invoice).
   - **New Transaction Modal**: Form to create and record new manual ledger entries with live state update.

6. **Tabbed Navigation**:
   - Tabs for **Overview**, **Analytics**, **Transactions**, **Reports**, **Settings**, and a disabled **Integrations (Soon)** tab.

