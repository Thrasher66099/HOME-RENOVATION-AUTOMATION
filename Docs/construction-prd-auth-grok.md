# Product Design and Requirements Document: Renovation Estimator Web Application

## 1. Executive Summary

### 1.1 Purpose
This document outlines the requirements and high-level design for transforming the "Andrew Cost Estimator.xlsx" spreadsheet into a modern web application called **Renovation Estimator Pro (REP)**. The current spreadsheet serves as a manual tool for home renovation estimation, property data entry, purchase order (PO) management, billing, and profit tracking. It is rigid, single-user focused, and prone to errors due to its static structure.

The webapp will digitize and enhance this workflow, enabling:
- **Multi-user collaboration**: Real-time access for estimators, project managers, and executives.
- **Intuitive UI**: Drag-and-drop interfaces, dynamic forms, and visualizations replacing static sheets.
- **Flexibility**: Customizable templates, scalable data entry, automated calculations, and integration hooks for future expansions (e.g., API integrations with suppliers like Home Depot).

### 1.2 Scope
- **In-Scope**: Core features mirroring the spreadsheet (property info, estimates, POs, billing, profit calc, regional adjustments). Multi-user auth, responsive UI, basic reporting.
- **Out-of-Scope**: Advanced integrations (e.g., full ERP systems), mobile app (web-responsive only), AI-driven suggestions (phase 2).
- **Assumptions**: Users have basic web literacy; data migration from Excel will be manual initially.
- **Success Metrics**: 50% reduction in estimation time, 95% user satisfaction (via NPS), zero manual calculation errors.

### 1.3 Target Users

| User Role              | Description                                      | Key Needs                                      |
|------------------------|--------------------------------------------------|------------------------------------------------|
| **Estimator**          | Field staff creating estimates.                  | Quick data entry, room-specific templates, auto-calcs. |
| **Project Manager**    | Oversees projects, approves POs/bills.           | Collaboration, version history, dashboards.    |
| **Executive**          | Reviews profits, high-level insights.            | Reports, analytics, regional cost overrides.   |
| **Admin**              | Manages users/templates.                         | User permissions, data exports.                |

## 2. Business Requirements

### 2.1 Functional Requirements
The app must replicate and enhance spreadsheet functionality across modules. Requirements are derived from sheet analysis:

#### 2.1.1 Property Information Management (From "Property Info" Sheet)
- **Core Data Entry**:
  - Capture address (street, city, state, ZIP), entity number, rent amount.
  - Room dimensions: Length/Width (LF), Misc SF, Total SF per room (e.g., Foyer, Family, Dining, Kitchen, etc.).
  - Property metrics: Total bedrooms/bathrooms, square footage (BPO/MLS/Zillow vs. actual takeoff), garage type/size, basement presence, foundation/roof area, floors.
  - Utilities checklist: Gas/Water/Power ON/OFF, lockbox code, breakers/water main status.
  - Age estimates: Roof (replace if <7 yrs life), HVAC (replace if ≥13 yrs), Water Heater (replace if ≥7 yrs).
  - Photos/Notes: Upload initial photos, free-text notes (e.g., "IMPORTANT WORDS FROM MANAGEMENT!").
- **Regional Adjustments (RSMeans Table)**:
  - Dropdown for state/region (e.g., IL, CA, FL MIA, NJ-Central).
  - Auto-apply multipliers: Location factor (e.g., IL: -0.039), RSMeans factor (e.g., 1.21), Contingency (e.g., 0.21), Traditional (blank or custom).
  - Support for Cont/Trad variants per region.
  - Validation: Warn if region not selected; default to "Extra" for custom.
- **Enhancements**:
  - Auto-calculate total SF from room inputs.
  - Geocode address for auto-fill (integrate Google Maps API in future).
  - Audit log for changes (e.g., "Did you enter utility info in HB?").

#### 2.1.2 Cost Estimation Engine (From "Estimate" and Room-Specific Sheets like "Basement")
- **Structure**:
  - Hierarchical: Project → Rooms (e.g., General, Exterior, Garage, Foyer, Family RM, ..., Basement) → Categories (e.g., Painting, Flooring, Trim, Blinds, Windows, Electrical, Doors, HVAC, Drywall) → Line Items.
  - Line Item Template: Scope Item, Action (e.g., Install/Replace/Repair), Required (Y/N checkbox), Quantity/SF, Material (w/SKU, e.g., "Shaw: Style 50-(S) / Color: Cachet"), Labor Hours, Total Expense.
  - Fields per Item: Description, Cost Per Unit, Total, Asset Manager Notes, Mat w/Tax, Labor.
- **Room Templates** (Pre-populated from Sheets):
  - **General/Exterior/Garage**: Basic items like painting, demo.
  - **Kitchen/Laundry/Bathrooms**: Fixtures (faucets, toilets), hardware, refinishing.
  - **Bedrooms/Basement**: Doors, shelving, detectors, flooring specifics (carpet, tile, vinyl).
  - **Basement-Specific**: Dehumidifier, fireplace service, bedroom/bath sub-rooms.
  - Dynamic: Add custom rooms/items; copy from templates.
- **Calculations**:
  - Auto-total per category/room/project (Quantity × Cost Per + Tax + Labor).
  - Apply regional multipliers globally or per item.
  - Fee % override (e.g., for profit margin).
  - Validation: Required fields (e.g., smoke detectors mandatory in bedrooms).
- **Enhancements**:
  - Searchable item library (e.g., filter by "Door Hardware" → sub-options like Knob Satin Nickel).
  - Drag-and-drop to reorder items; bulk quantity updates.
  - Visual room builder: Floorplan upload with clickable rooms.

#### 2.1.3 Purchase Order Management (From "PO" Sheet)
- **Form Structure**:
  - Header: Property address, HD Pro Account ID (4044674208), Email (Business_Services@homedepot.com), Store, MAV Contact.
  - Line Items: Number (1-300+), Description, Quantity, SKU #, Material Cost, Tax, Total, Scope (e.g., Kitchen, Exterior).
  - Sections: General, Exterior, Garage, Rooms (Foyer, Family, etc.).
  - Footer: Grand Total.
- **Workflow**:
  - Auto-populate from Estimate (e.g., pull selected materials).
  - Generate PDF/CSV export; email integration.
  - Track status: Draft → Approved → Ordered → Received.
- **Enhancements**:
  - Bulk import from suppliers; real-time inventory check (future API).
  - Multi-PO per project; version history.

#### 2.1.4 Billing and Invoicing (From "Billing" Sheet)
- **Structure**:
  - Categories: General Improvements, Flooring - Carpet, Appliances.
  - Initial/Final Invoice totals.
- **Workflow**:
  - Auto-generate from Estimate/PO totals.
  - Split by phase (Initial vs. Final).
  - PDF generation with property details.
- **Enhancements**:
  - Payment tracking; integrate Stripe for invoicing (phase 2).
  - Custom line items for add-ons.

#### 2.1.5 Profit and Overhead Calculation (From "Profit" Sheet)
- **Inputs**: Project Budget, Total Cost (from Estimate).
- **Outputs**: Profit/Overhead = Budget - Cost; Profit% = (Profit / Budget) × 100.
- **Enhancements**:
  - Real-time dashboard widget.
  - Scenario modeling (what-if budget changes).
  - Alerts for negative profit.

#### 2.1.6 Reporting and Analytics
- Dashboards: Project overview (totals, progress), regional cost trends.
- Exports: Full project PDF, CSV for sheets.
- Filters: By date, region, user.

### 2.2 Non-Functional Requirements
- **Performance**: Load <2s; handle 100 concurrent users.
- **Security**: Role-based access (RBAC); JWT auth; data encryption.
- **Scalability**: Cloud-hosted; auto-scale for peak seasons.
- **Accessibility**: WCAG 2.1 AA; responsive (mobile/desktop).
- **Reliability**: 99.9% uptime; auto-backups.
- **Data Migration**: Import Excel via upload; map sheets to entities.

### 2.3 User Stories

| As a...             | I want...                                      | So that...                                             |
|---------------------|------------------------------------------------|--------------------------------------------------------|
| Estimator           | To enter property info via a wizard            | I can quickly onboard a new project without manual sheets. |
| Project Manager     | To collaborate on estimates in real-time       | Multiple team members can review/add items simultaneously. |
| Executive           | To view profit dashboards                      | I can monitor portfolio health at a glance.            |
| Estimator           | To select from pre-built room templates        | I avoid re-entering common items like door hardware.   |
| All Users           | To export POs as PDFs                          | I can share with suppliers instantly.                  |

## 3. Product Design

### 3.1 System Architecture
- **High-Level Overview**:
  - **Frontend**: Next.js (React-based) with Material-UI for intuitive, responsive UI. State management: Redux or Zustand for complex forms.
  - **Backend**: Serverless API routes in Next.js (using Vercel functions) for handling business logic, calculations, and integrations.
  - **Database**: Supabase (Postgres-based) for relational data storage, real-time subscriptions, and file storage (for photos/PDFs).
  - **Auth**: Supabase Auth for multi-user management (email/password, SSO, RBAC via Row Level Security).
  - **Deployment**: Vercel for hosting the Next.js app, integrated with GitHub for CI/CD (automatic deploys on push to main). Supabase for DB management.
- **Data Model** (Supabase Tables - ER Diagram Conceptual):
  - **projects**: id (UUID PK), address (JSON), entity_num (text), budget (numeric), created_by (UUID FK to users), status (text).
  - **property_infos**: id (UUID PK), project_id (UUID FK), rooms (JSONB array), utilities (JSONB checklist), ages (JSONB: {roof: int, hvac: int, wh: int}).
  - **regions**: id (UUID PK), state (text), multipliers (JSONB: {location: numeric, rsmeans: numeric, contingency: numeric, traditional: numeric}).
  - **estimates**: id (UUID PK), project_id (UUID FK), rooms (JSONB array of {name: text, categories: array of {name: text, line_items: array}}).
  - **pos**: id (UUID PK), project_id (UUID FK), line_items (JSONB array), status (text).
  - **billings**: id (UUID PK), project_id (UUID FK), invoices (JSONB array: {type: 'initial'|'final', categories: array, totals: numeric}).
  - **profit_calcs**: View (computed: budget - sum(estimates.totals); profit_pct: formula).
  - Relationships: Foreign keys enforced in Supabase; Real-time queries via Supabase subscriptions for collab.

### 3.2 UI/UX Design
- **Navigation**: Sidebar: Dashboard → Projects → Estimates → POs → Billing → Reports. Breadcrumbs for deep navigation (e.g., Project > Kitchen > Flooring).
- **Key Screens**:
  - **Project Dashboard**: Kanban view of projects (New/In Progress/Complete). Cards show Budget, Cost, Profit%, Regional Factor.
    - Visual: Pie chart for cost breakdown (Painting 30%, Flooring 25%); Bar chart for room totals.
  - **Property Info Form**: Stepper wizard (Step 1: Address/Utilities; Step 2: Rooms/Dimensions; Step 3: Ages/Notes). Auto-save; validation highlights.
    - Regional Dropdown: Modal with table view of multipliers; preview impact on sample costs.
  - **Estimate Builder**: Tabbed by Room. Accordion for Categories. Table for Line Items (editable inline).
    - Intuitive: Search bar for items (e.g., "HVAC Register" → auto-add); Checkbox for Required; Slider for Qty.
    - Visual: Progress bar per room; Heatmap for high-cost items.
  - **PO Generator**: Mirror Estimate table; Filter by Scope. One-click PDF export.
  - **Billing View**: Invoice templates; Drag categories to Initial/Final.
  - **Profit Widget**: Embedded card with formula breakdown; Edit Budget for scenarios.
- **Interactions**:
  - Real-time collab: Supabase Realtime for live edits.
  - Flexibility: Custom fields (e.g., add "Misc SF Note"); Template library for rooms.
  - Themes: Light/Dark; Color-coded (Green: Under Budget, Red: Over).
- **Wireframes (Conceptual Text-Only)**:
  - Dashboard: Grid of project cards [Card: Addr | Budget: $X | Profit: Y% | Actions: Edit/View].
  - Estimate Row: [Checkbox Req] [Dropdown Category] [Text Desc] [Num Qty] [Num Cost/Unit] [=Total] [Text Notes] [Btn Delete].

### 3.3 Technical Design Details
- **API Endpoints** (Next.js Routes - Examples):
  - POST /api/projects: Create project w/PropertyInfo.
  - GET /api/projects/[id]/estimate: Fetch room-structured estimate.
  - PUT /api/estimates/[id]/lineitems: Bulk update items w/regional apply.
  - POST /api/pos/export: Generate PDF.
- **Calculations Engine**: Serverless function in Next.js; Use math libs (e.g., Big.js for precision); Cache in Supabase Edge Functions if needed.
- **File Handling**: Supabase Storage for photos/PDFs; Preview via signed URLs.
- **Extensibility**: Supabase Edge Functions for plugins (e.g., new categories).

### 3.4 Risks and Mitigations

| Risk                     | Mitigation                                             |
|--------------------------|--------------------------------------------------------|
| Data Migration Errors    | Provide Excel import validator; Beta test w/sample files. |
| User Adoption            | Onboarding tour; Mirror spreadsheet layout initially.  |
| Cost Overruns in Dev     | MVP: Core Estimate + Property (2 months); Full: +3 months. |

### 3.5 Timeline and Milestones
- **Phase 1 (MVP, 8 weeks)**: Auth, Property Info, Basic Estimate.
- **Phase 2 (12 weeks)**: POs, Billing, Profit, Multi-User.
- **Phase 3 (4 weeks)**: Reports, Polish, Launch.

This document provides a blueprint for development. Next steps: Wireframe prototypes, user interviews for validation.