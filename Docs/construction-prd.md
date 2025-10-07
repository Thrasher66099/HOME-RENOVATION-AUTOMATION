# Construction Cost Estimator - Product Requirements Document (PRD)

## Document Control

**Version:** 1.0
**Last Updated:** October 2025
**Document Owner:** Product Management
**Status:** Final - Ready for Development

---

## 1. Executive Summary

### 1.1 Product Name
**Renovation Estimator Pro (REP)** - Construction Cost Estimator Web Application

### 1.2 Product Description
A cloud-based construction estimation and project management platform that transforms the existing Excel-based workflow into an intuitive, collaborative, multi-user web application for home renovation companies. The system replaces manual spreadsheet processes with automated calculations, real-time collaboration, and professional client-facing deliverables.

### 1.3 Business Objectives
- Reduce estimate creation time by 50%
- Enable real-time collaboration among team members
- Improve estimate accuracy and reduce budget overruns by 25%
- Provide mobile accessibility for field teams
- Generate professional client-facing documents automatically
- Track project financials in real-time with comprehensive audit trails
- Eliminate manual calculation errors (target: zero errors)
- Achieve 95% user satisfaction (NPS score)
- Positive ROI within 12 months

### 1.4 Success Criteria
- 90% user adoption within 3 months of launch
- 99.9% system uptime
- Reduce support tickets by 60% compared to Excel-based system
- User satisfaction rating of 4.5/5 or higher
- 50% reduction in time to create estimates
- Zero manual calculation errors

### 1.5 Scope

**In-Scope:**
- Core features mirroring the spreadsheet (property info, room-based estimates, POs, billing, profit tracking)
- Regional cost adjustments and multipliers
- Multi-user authentication and role-based access control
- Responsive web UI (mobile and desktop)
- Basic reporting and analytics
- PDF/Excel export capabilities
- Photo upload and management

**Out-of-Scope (Future Phases):**
- Advanced ERP integrations
- Native mobile applications
- AI-driven cost suggestions
- Real-time supplier inventory integration
- Payment processing (Stripe integration)

**Assumptions:**
- Users have basic web literacy
- Initial data migration from Excel will be manual
- Home Depot Pro Account integration will be manual initially

---

## 2. User Personas

### 2.1 Primary Persona: Sarah - Project Estimator
- **Role:** Creates detailed cost estimates for renovation projects
- **Goals:** Quickly generate accurate estimates, access pricing data easily, create professional proposals
- **Pain Points:** Excel file locking, formula errors, time-consuming manual calculations, can't work from the field
- **Technical Proficiency:** Moderate
- **Key Needs:** Quick data entry, room-specific templates, auto-calculations, searchable item library

### 2.2 Secondary Persona: Mike - Project Manager
- **Role:** Oversees multiple renovation projects simultaneously
- **Goals:** Track project budgets, monitor expenses, coordinate teams, approve POs and change orders
- **Pain Points:** Lack of real-time visibility, difficulty consolidating data from multiple sources, version control issues
- **Technical Proficiency:** Moderate to High
- **Key Needs:** Collaboration tools, version history, dashboards, budget variance tracking

### 2.3 Tertiary Persona: Carlos - Field Supervisor
- **Role:** Manages on-site work and material purchases
- **Goals:** Update project status, record material expenses, verify quantities, order materials
- **Pain Points:** Need mobile access, can't edit files from field, delayed information updates
- **Technical Proficiency:** Low to Moderate
- **Key Needs:** Mobile-responsive interface, simple expense entry, photo upload capability

### 2.4 Supporting Persona: Jennifer - Accounting Manager
- **Role:** Manages project financials and invoicing
- **Goals:** Generate invoices, track payments, reconcile expenses, produce financial reports
- **Pain Points:** Manual data entry from spreadsheets, reconciliation difficulties, lack of audit trail
- **Technical Proficiency:** High
- **Key Needs:** Automated billing, expense tracking, financial reports, export capabilities

### 2.5 Executive Persona: David - Company Executive
- **Role:** Reviews portfolio health and strategic decision-making
- **Goals:** Monitor profit margins, analyze regional performance, identify trends
- **Pain Points:** Limited visibility into portfolio metrics, time-consuming data aggregation
- **Technical Proficiency:** High
- **Key Needs:** High-level dashboards, regional analytics, profit tracking, scenario modeling

---

## 3. Functional Requirements

### 3.1 User Management & Authentication

#### 3.1.1 User Registration & Login
**Priority:** Must Have
**User Story:** As a user, I want to securely log into the system so that I can access my projects.

**Requirements:**
- FR-3.1.1.1: System shall support email/password authentication via Supabase Auth
- FR-3.1.1.2: System shall enforce password complexity requirements (min 8 characters, uppercase, lowercase, number, special character)
- FR-3.1.1.3: System shall support password reset via email
- FR-3.1.1.4: System shall implement session timeout after 8 hours of inactivity
- FR-3.1.1.5: System shall support multi-factor authentication (MFA) as optional setting
- FR-3.1.1.6: System shall lock account after 5 failed login attempts
- FR-3.1.1.7: System shall send verification email upon registration

**Acceptance Criteria:**
- User can register with valid email and password
- User receives verification email upon registration
- User can log in with verified credentials
- User can reset forgotten password
- Session expires after timeout period
- MFA can be enabled in user settings
- Account locks after failed attempts

#### 3.1.2 Role-Based Access Control
**Priority:** Must Have
**User Story:** As an admin, I want to assign roles to users so that they have appropriate permissions.

**Requirements:**
- FR-3.1.2.1: System shall support five role types: Admin, Manager, Estimator, Viewer, Client
- FR-3.1.2.2: System shall enforce role-based permissions at module and action levels using Supabase Row Level Security
- FR-3.1.2.3: System shall allow admins to create custom roles with granular permissions
- FR-3.1.2.4: System shall log all permission changes with timestamp and user

**Role Permissions Matrix:**

| Action            | Admin | Manager | Estimator | Viewer | Client |
|-------------------|-------|---------|-----------|--------|--------|
| Create Project    | ✓     | ✓       | ✓         | ✗      | ✗      |
| Edit Project      | ✓     | ✓       | ✓         | ✗      | ✗      |
| Delete Project    | ✓     | ✓       | ✗         | ✗      | ✗      |
| View Project      | ✓     | ✓       | ✓         | ✓      | ✓*     |
| Create Estimate   | ✓     | ✓       | ✓         | ✗      | ✗      |
| Edit Estimate     | ✓     | ✓       | ✓         | ✗      | ✗      |
| Approve Estimate  | ✓     | ✓       | ✗         | ✗      | ✗      |
| View Unit Costs   | ✓     | ✓       | ✓         | ✗      | ✗      |
| Edit Unit Costs   | ✓     | ✓       | ✗         | ✗      | ✗      |
| Manage Users      | ✓     | ✗       | ✗         | ✗      | ✗      |
| Create PO         | ✓     | ✓       | ✓         | ✗      | ✗      |
| Approve PO        | ✓     | ✓       | ✗         | ✗      | ✗      |
| View Reports      | ✓     | ✓       | ✓         | ✓      | ✗      |

*Client can only view approved estimates for their projects

### 3.2 Project Management

#### 3.2.1 Project Creation
**Priority:** Must Have
**User Story:** As an estimator, I want to create a new project so that I can begin estimating costs.

**Requirements:**
- FR-3.2.1.1: System shall provide project creation wizard with step-by-step guidance
- FR-3.2.1.2: System shall auto-generate unique project ID (UUID)
- FR-3.2.1.3: System shall require project name and property address as minimum fields
- FR-3.2.1.4: System shall support project templates for common renovation types
- FR-3.2.1.5: System shall allow cloning of existing projects
- FR-3.2.1.6: System shall timestamp project creation and record creating user
- FR-3.2.1.7: System shall support assignment of multiple team members to projects

**Acceptance Criteria:**
- User can create project with all required fields
- Project appears in project list immediately
- Project ID is unique and auto-generated
- User can select from template library
- Cloned projects copy structure but not property-specific data
- Audit trail captures creation event

#### 3.2.2 Project Dashboard
**Priority:** Must Have
**User Story:** As a project manager, I want to see an overview of all projects so that I can monitor status and prioritize work.

**Requirements:**
- FR-3.2.2.1: System shall display project list with key metrics: Name, Address, Status, Budget, Profit %, Created Date, Last Modified
- FR-3.2.2.2: System shall support filtering by status, date range, assigned user, region
- FR-3.2.2.3: System shall support sorting by any column
- FR-3.2.2.4: System shall provide search functionality by project name, address, or ID
- FR-3.2.2.5: System shall support both grid (Kanban) and table view modes
- FR-3.2.2.6: System shall show project status with color coding: Draft (gray), In Progress (blue), Complete (green), On Hold (yellow), Cancelled (red)
- FR-3.2.2.7: System shall provide quick action buttons: View, Edit, Clone, Archive, Delete
- FR-3.2.2.8: System shall display visual charts: Pie chart for cost breakdown, Bar chart for room totals

**Acceptance Criteria:**
- Dashboard loads within 2 seconds with up to 500 projects
- All filters work correctly and can be combined
- Search returns results in real-time (< 500ms)
- Status colors are clearly visible and consistent
- Visual charts render accurately

#### 3.2.3 Project Detail View
**Priority:** Must Have
**User Story:** As a user, I want to see all project information in one place so that I can quickly understand project status.

**Requirements:**
- FR-3.2.3.1: System shall display project header with: Name, Address, Status, Created Date, Last Modified, Assigned Users
- FR-3.2.3.2: System shall provide tab navigation to: Property Info, Estimate, Summary, Schedule, POs, Expenses, Billing
- FR-3.2.3.3: System shall show key metrics cards: Total Budget, Total Cost, Variance, Profit Margin, Days Remaining
- FR-3.2.3.4: System shall display recent activity feed showing real-time updates
- FR-3.2.3.5: System shall provide quick links to common actions
- FR-3.2.3.6: System shall use breadcrumbs for navigation (e.g., Projects > 123 Main St > Kitchen > Flooring)

### 3.3 Property Information

#### 3.3.1 Property Data Entry
**Priority:** Must Have
**User Story:** As an estimator, I want to enter property details so that I can calculate accurate estimates.

**Requirements:**
- FR-3.3.1.1: System shall provide stepper wizard interface (Step 1: Address/Utilities; Step 2: Rooms/Dimensions; Step 3: Ages/Notes)
- FR-3.3.1.2: System shall capture the following property fields:
  - **Basic Info:**
    - Region (dropdown)
    - Date
    - Street Address (text, required)
    - City, State, Zip (text, required)
    - Entity Number (text)
    - Rent Amount (currency)
  - **Property Metrics:**
    - Square Footage from BPO/MLS/Zillow (number)
    - Actual Measured Square Footage (number)
    - Number of Bedrooms (number)
    - Number of Bathrooms (number, supports 0.5 increments)
    - Façade Type (dropdown: Brick, Stucco, Hardy Plank, Masonry)
    - Garage Type (dropdown: Attached, Carport, N/A)
    - Garage Size SF (number)
    - Basement (boolean)
    - Number of Floors (number, excluding basement)
    - Foundation Area SF (number)
    - Roof Area SF (number)
  - **Component Ages:**
    - Roof Age (number, years) - Alert if <7 years life remaining
    - HVAC Age (number, years) - Alert if ≥13 years (replacement threshold)
    - Water Heater Age (number, years) - Alert if ≥7 years (replacement threshold)

- FR-3.3.1.3: System shall provide utility status checkboxes:
  - Gas Service ON (boolean)
  - Water Service ON (boolean)
  - Power Service ON (boolean)

- FR-3.3.1.4: System shall capture safety checklist:
  - All Electrical Breakers Off (boolean)
  - Water Main Off at Street & House (boolean)
  - Lockbox Code (text)

- FR-3.3.1.5: System shall support photo upload with the following specs:
  - Max 50 photos per property
  - Supported formats: JPG, PNG, HEIC
  - Max file size: 10MB per photo
  - Automatic thumbnail generation via Supabase Storage
  - Photo categorization: Initial, During Progress, Final
  - Drag-and-drop interface
  - Preview via signed URLs

- FR-3.3.1.6: System shall validate all numeric fields for positive values
- FR-3.3.1.7: System shall auto-save property information every 30 seconds
- FR-3.3.1.8: System shall highlight required fields that are incomplete
- FR-3.3.1.9: System shall display alerts for component replacement thresholds

**Acceptance Criteria:**
- All fields save correctly with appropriate data types
- Photos upload successfully to Supabase Storage and display thumbnails
- Validation errors display clearly
- Auto-save works without user intervention
- Form can be submitted with only required fields
- Component age alerts trigger correctly

#### 3.3.2 Room Dimensions
**Priority:** Must Have
**User Story:** As an estimator, I want to enter room dimensions so that square footage calculations are automated.

**Requirements:**
- FR-3.3.2.1: System shall provide dimension entry for the following rooms:
  - Foyer
  - Family Room
  - Dining Room
  - Breakfast Room
  - Kitchen
  - Laundry Room
  - Formal Living Room
  - Hallway
  - Master Bedroom
  - Master Bathroom
  - Guest Bedroom 1-4
  - Guest Bathroom 1-2
  - Half Bath
  - Garage
  - Basement (with optional bedroom/bathroom sub-rooms)

- FR-3.3.2.2: For each room, system shall capture:
  - Length (LF, decimal)
  - Width (LF, decimal)
  - Miscellaneous SF (number, optional)
  - Note field for misc SF explanation

- FR-3.3.2.3: System shall auto-calculate:
  - Total SF = (Length × Width) + Miscellaneous SF

- FR-3.3.2.4: System shall calculate totals:
  - Total SF without Garage
  - Total SF with Garage

- FR-3.3.2.5: System shall display room dimensions in editable table format
- FR-3.3.2.6: System shall allow adding custom rooms dynamically
- FR-3.3.2.7: System shall carry room dimensions to estimate module automatically

**Acceptance Criteria:**
- All calculations are mathematically accurate
- Totals update in real-time as dimensions are entered
- Room dimensions auto-populate in estimate
- Custom rooms can be added and removed
- Table is sortable and filterable

#### 3.3.3 Regional Adjustments (RSMeans)
**Priority:** Must Have
**User Story:** As an estimator, I want to apply regional cost factors so that estimates reflect local market conditions.

**Requirements:**
- FR-3.3.3.1: System shall support regional multipliers by state/region:
  - Location Factor (e.g., IL: -0.039, CA: custom)
  - RSMeans Factor (e.g., 1.21)
  - Contingency (e.g., 0.21)
  - Traditional (optional custom multiplier)

- FR-3.3.3.2: System shall provide dropdown for region selection with preview of multipliers
- FR-3.3.3.3: System shall display modal with table view of all regional factors
- FR-3.3.3.4: System shall apply multipliers globally to estimates or per line item
- FR-3.3.3.5: System shall support Contingency/Traditional variants per region
- FR-3.3.3.6: System shall validate region selection and warn if not set
- FR-3.3.3.7: System shall default to "Extra" category for custom regions
- FR-3.3.3.8: System shall preview impact of regional factors on sample costs

**Acceptance Criteria:**
- Regional multipliers apply correctly to all calculations
- Preview shows accurate cost impact
- Multiple regional variants can coexist
- Default region can be set per user/company

### 3.4 Unit Cost Database

#### 3.4.1 Pricing Matrix Management
**Priority:** Must Have
**User Story:** As a manager, I want to maintain a pricing database so that estimates use current costs.

**Requirements:**
- FR-3.4.1.1: System shall organize unit costs hierarchically:
  - Level 1: Category (Kitchen, Bathroom, General, Exterior, HVAC, Electrical, Plumbing, Flooring, etc.)
  - Level 2: Subcategory (Cabinets, Countertops, Flooring Types, Fixtures, etc.)
  - Level 3: Action/Item (specific work description with SKU)

- FR-3.4.1.2: For each unit cost item, system shall store:
  - Action/Item name (text, required)
  - Description (text)
  - Cost unit (dropdown: SF, LF, EA, per unit, custom)
  - SKU number (text, optional) - e.g., "Shaw: Style 50-(S) / Color: Cachet"
  - Material cost (currency, required)
  - Tax rate (percentage, default from region)
  - Labor cost (currency, required)
  - Labor hours (decimal, optional)
  - OH & Profit percentage (decimal, default: 0.06)
  - Workman's Comp percentage (decimal, default: 0.01)
  - Insurance percentage (decimal, default: 0.01)
  - GC Fee (currency, default: 0)
  - Active/Inactive status (boolean)
  - Effective date (date)
  - Notes (text, optional)
  - Asset Manager Notes (text, optional)

- FR-3.4.1.3: System shall calculate total cost per unit:
  ```
  Material with Tax = Material Cost × (1 + Tax Rate)
  Total Labor = Labor Cost × (1 + OH & Profit + Workman's Comp + Insurance)
  Total Cost = Material with Tax + Total Labor + GC Fee
  ```

- FR-3.4.1.4: System shall support multiple regional pricing sets
- FR-3.4.1.5: System shall allow switching active pricing region per project
- FR-3.4.1.6: System shall maintain price history with effective dates
- FR-3.4.1.7: System shall support bulk import via CSV/Excel template
- FR-3.4.1.8: System shall support bulk export to CSV/Excel
- FR-3.4.1.9: System shall allow cloning pricing sets for new regions
- FR-3.4.1.10: System shall use Big.js or similar library for decimal precision

**Acceptance Criteria:**
- Unit cost records save with all fields
- Calculations are mathematically accurate to 2 decimal places
- Import/export works without data loss
- Price history is maintained correctly
- Multiple regions can coexist without conflict

#### 3.4.2 Unit Cost Search & Selection
**Priority:** Must Have
**User Story:** As an estimator, I want to quickly find pricing items so that I can add them to estimates efficiently.

**Requirements:**
- FR-3.4.2.1: System shall provide search with real-time results (< 500ms)
- FR-3.4.2.2: System shall support search by:
  - Item name (partial match, e.g., "Door Hardware" → Knob Satin Nickel)
  - Category
  - SKU number
  - Cost range

- FR-3.4.2.3: System shall display search results in table format showing:
  - Item name
  - Unit
  - Material cost
  - Labor cost
  - Total cost

- FR-3.4.2.4: System shall allow inline editing of costs
- FR-3.4.2.5: System shall provide "Add to Estimate" button from search results
- FR-3.4.2.6: System shall show recently used items
- FR-3.4.2.7: System shall allow favoriting commonly used items
- FR-3.4.2.8: System shall support filtering by category hierarchy

**Acceptance Criteria:**
- Search returns results within 500ms
- All search filters work correctly
- Items can be added directly to estimate from search
- Recently used and favorites lists update correctly
- Search is intuitive and forgiving (partial matches)

### 3.5 Estimation Module

#### 3.5.1 Room-Based Estimate Creation
**Priority:** Must Have
**User Story:** As an estimator, I want to build estimates room-by-room so that I can organize work logically.

**Requirements:**
- FR-3.5.1.1: System shall provide estimate interface for each room type:
  - General
  - Exterior
  - Garage
  - Foyer
  - Family Room
  - Dining Room
  - Breakfast Room
  - Kitchen
  - Laundry Room
  - Formal Living Room
  - Hallway
  - Bathrooms (multiple instances: Master, Guest 1-2, Half)
  - Bedrooms (multiple instances: Master, Guest 1-4)
  - Basement (with optional bedroom/bathroom sub-sections)

- FR-3.5.1.2: System shall auto-populate room dimensions from Property Info
- FR-3.5.1.3: System shall organize items by category (collapsible accordion sections):
  - Painting
  - Flooring (subdivided: Carpet, Hardwood, Refinish, Tile, Vinyl)
  - Wall Tile
  - Trim
  - Blinds
  - Windows
  - Smoke/CO Detectors
  - Doors
  - Electrical
  - Plumbing
  - HVAC
  - Appliances
  - Cabinets/Countertops
  - Drywall
  - Miscellaneous

- FR-3.5.1.4: For each line item, system shall capture:
  - Required checkbox (1 = Yes, 0 = No) - controls visibility in final estimate
  - Scope item (from Unit Cost Database via searchable dropdown)
  - Action description (auto-populated from unit cost, editable)
  - SKU/Material specification (e.g., "Shaw: Style 50-(S)")
  - Quantity/SF (number, decimal)
  - Unit type (auto-populated from unit cost)
  - Unit cost (auto-populated, editable for custom items)
  - Total expense (auto-calculated)
  - Notes (text, optional)

- FR-3.5.1.5: System shall calculate line item total:
  ```
  Line Item Total = Quantity × Unit Total Cost
  ```

- FR-3.5.1.6: System shall calculate room subtotal:
  ```
  Room Subtotal = SUM(All Line Items where Required = 1)
  ```

- FR-3.5.1.7: System shall show/hide items in final estimate based on Required checkbox
- FR-3.5.1.8: System shall support adding custom line items with manual cost entry
- FR-3.5.1.9: System shall allow reordering line items within categories via drag-and-drop
- FR-3.5.1.10: System shall support copying items from other rooms or templates
- FR-3.5.1.11: System shall support notes at line item, category, and room levels
- FR-3.5.1.12: System shall validate required items (e.g., smoke detectors in bedrooms)
- FR-3.5.1.13: System shall provide bulk quantity updates (e.g., update all flooring quantities)
- FR-3.5.1.14: System shall display visual room builder (future: floorplan upload with clickable rooms)

**Acceptance Criteria:**
- Room dimensions populate automatically
- All calculations update in real-time
- Required checkbox filters display correctly
- Custom items can be added with manual pricing
- Room subtotals are accurate
- Copy between rooms works without errors
- Drag-and-drop reordering functions properly
- Validation alerts trigger for mandatory items

#### 3.5.2 Estimate Compilation
**Priority:** Must Have
**User Story:** As an estimator, I want to see all rooms compiled into one estimate so that I can review total project cost.

**Requirements:**
- FR-3.5.2.1: System shall create master estimate by aggregating all room estimates
- FR-3.5.2.2: System shall display estimate with following structure:
  - Estimate header with project info
  - Grouped by room or by category (user selectable via toggle)
  - Line item details: Description, Quantity, Unit, Unit Cost, Total
  - Room/Category subtotals
  - Grand total with cost breakdown

- FR-3.5.2.3: Estimate header shall include:
  - Property address
  - City, State, Zip
  - Spec package (Standard, Traditional, Custom)
  - Entity ID
  - Estimate date
  - Valid until date (default: 30 days from creation)
  - Estimate version number (auto-incremented)
  - Regional multipliers applied

- FR-3.5.2.4: System shall support estimate display modes:
  - Detailed (all line items)
  - Summary (category totals only)
  - Custom (user selects what to show/hide)

- FR-3.5.2.5: System shall allow global markup adjustment (%, $)
- FR-3.5.2.6: System shall allow global discount (%, $)
- FR-3.5.2.7: System shall show cost breakdown:
  - Materials: $X
  - Labor: $X
  - Overhead: $X
  - Total: $X

- FR-3.5.2.8: System shall display visual heatmap for high-cost items
- FR-3.5.2.9: System shall show progress bar per room completion

**Acceptance Criteria:**
- Master estimate aggregates all rooms correctly
- Grouping options (by room/category) work properly
- Markup and discount apply correctly to all calculations
- Cost breakdown sums accurately
- Visual indicators display correctly

#### 3.5.3 Estimate Templates
**Priority:** Should Have
**User Story:** As an estimator, I want to use pre-built templates so that I can avoid re-entering common items.

**Requirements:**
- FR-3.5.3.1: System shall provide template library for common renovation types
- FR-3.5.3.2: System shall allow users to save custom templates from existing estimates
- FR-3.5.3.3: System shall support template categorization (Kitchen Remodel, Full Renovation, Bathroom Refresh, etc.)
- FR-3.5.3.4: System shall allow applying templates to new projects or specific rooms
- FR-3.5.3.5: System shall merge template items with existing estimates (no duplicates)

**Acceptance Criteria:**
- Templates load correctly with all line items
- Custom templates save and retrieve properly
- Template application doesn't overwrite existing data unexpectedly

#### 3.5.4 Estimate Export & Presentation
**Priority:** Must Have
**User Story:** As an estimator, I want to export estimates to PDF so that I can present professional documents to clients.

**Requirements:**
- FR-3.5.4.1: System shall export estimate to PDF with professional formatting
- FR-3.5.4.2: PDF shall include company branding (logo, colors, footer)
- FR-3.5.4.3: System shall support customizable PDF templates
- FR-3.5.4.4: System shall allow showing/hiding cost breakdowns in export (Material/Labor split)
- FR-3.5.4.5: System shall support export to Excel for further analysis
- FR-3.5.4.6: System shall provide print-optimized view
- FR-3.5.4.7: System shall allow email delivery of PDF directly from app
- FR-3.5.4.8: System shall maintain estimate version history with timestamps
- FR-3.5.4.9: PDF generation shall complete within 10 seconds

**Acceptance Criteria:**
- PDF generates within 10 seconds
- PDF formatting is professional and consistent
- Excel export maintains all data and calculations
- Email delivery works correctly with attachments
- Version history tracks all changes with user attribution

### 3.6 Summary & Budget Tracking

#### 3.6.1 Budget Overview
**Priority:** Must Have
**User Story:** As a project manager, I want to see budget summary so that I can monitor financial performance.

**Requirements:**
- FR-3.6.1.1: System shall display summary table with subcontractor categories:
  - Additional Items
  - Appliances
  - Bath Refinishing
  - Cabinets
  - Concrete
  - Countertops
  - Deck
  - Drywall
  - Dumpster
  - Electrical
  - Fencing
  - Final Clean
  - Flooring (subdivided: Carpet, Hardwood, Refinish, Tile)
  - Garage Door
  - General Labor
  - Gutters
  - HVAC
  - Landscaping
  - Mold
  - Painting
  - Pest Control
  - Plumbing
  - Pool
  - Retaining Wall
  - Roofing
  - Septic System
  - Shower Door
  - Siding
  - Windows

- FR-3.6.1.2: For each category, system shall calculate and display:
  - Material Cost (aggregated from estimate)
  - Tax (calculated based on regional tax rate)
  - Material with Tax Budget
  - Labor Budget
  - Overhead (OH & Profit + Workman's Comp + Insurance)
  - Total Cost
  - Total Budget
  - Buyout Goal % (target for cost savings, e.g., 10%)
  - Buyout Goal $ amount
  - Projected Material Cost (from actual purchases/POs)
  - Projected Labor Cost (from timesheets/actuals)
  - Projected Total Cost
  - Variance (Budget vs Projected, $ and %)

- FR-3.6.1.3: System shall aggregate costs from room estimates to categories automatically
- FR-3.6.1.4: System shall calculate project totals for all columns
- FR-3.6.1.5: System shall highlight variances exceeding threshold (default: 10%, configurable)
- FR-3.6.1.6: System shall show variance indicators (over budget = red, under budget = green, on track = gray)
- FR-3.6.1.7: System shall update projected costs in real-time as POs/expenses are entered

**Acceptance Criteria:**
- All costs aggregate correctly from estimates
- Calculations are accurate to 2 decimal places
- Variance highlighting works correctly
- Totals row calculates properly
- Real-time updates reflect immediately

#### 3.6.2 Profit Calculation
**Priority:** Must Have
**User Story:** As an executive, I want to see profit margins so that I can assess project viability.

**Requirements:**
- FR-3.6.2.1: System shall calculate project profit/overhead:
  ```
  Profit/Overhead = Project Budget - Total Cost
  Profit % = (Profit / Budget) × 100
  ```

- FR-3.6.2.2: System shall display profit calculation in dashboard widget with formula breakdown
- FR-3.6.2.3: System shall allow editing Budget for scenario modeling ("what-if" analysis)
- FR-3.6.2.4: System shall alert when profit margin falls below threshold (configurable, default: 5%)
- FR-3.6.2.5: System shall track profit margin trend over project lifecycle
- FR-3.6.2.6: System shall support comparison of budgeted vs actual profit

**Acceptance Criteria:**
- Profit calculations are accurate
- Alerts trigger correctly for low margins
- Scenario modeling updates all dependent values
- Historical tracking displays correctly

#### 3.6.3 Change Order Management
**Priority:** Must Have
**User Story:** As a project manager, I want to track change orders so that I can manage scope changes.

**Requirements:**
- FR-3.6.3.1: System shall support unlimited change orders per project (minimum 4)
- FR-3.6.3.2: For each change order, system shall capture:
  - Change Order number (auto-generated, format: CO-[ProjectID]-###)
  - Date
  - Description
  - Reason for change
  - Material cost impact
  - Labor cost impact
  - Total cost impact
  - Approval status (Pending, Approved, Rejected)
  - Approved by (user)
  - Approval date
  - Client signature (electronic via signature pad)

- FR-3.6.3.3: System shall add approved change order costs to project totals
- FR-3.6.3.4: System shall show original budget vs budget with change orders
- FR-3.6.3.5: System shall support change order PDF generation
- FR-3.6.3.6: System shall require approval before adding to budget
- FR-3.6.3.7: System shall maintain change order history with audit trail
- FR-3.6.3.8: System shall send notifications to stakeholders when change orders are created/approved

**Acceptance Criteria:**
- Change orders create successfully
- Cost impacts calculate correctly
- Approval workflow functions properly
- Change orders affect budget only when approved
- PDF generation works correctly
- Notifications send to correct users

### 3.7 Purchase Order Module

#### 3.7.1 PO Creation
**Priority:** Must Have
**User Story:** As a project manager, I want to create purchase orders so that I can order materials systematically.

**Requirements:**
- FR-3.7.1.1: System shall provide PO creation form with:
  - PO number (auto-generated, format: PO-YYYYMMDD-###)
  - Date (auto-populated, editable)
  - Project reference (auto-populated)
  - Vendor (dropdown + add new)
  - Delivery address (default: project address, editable)
  - Requested delivery date
  - Special instructions (text area)
  - Status (Draft, Submitted, Confirmed, Received, Cancelled)
  - HD Pro Account ID (e.g., 4044674208)
  - Vendor email (e.g., Business_Services@homedepot.com)
  - Store location
  - MAV Contact

- FR-3.7.1.2: System shall support line items with:
  - Item number (auto-increment, 1-300+)
  - Description
  - Quantity
  - Unit
  - Unit cost
  - SKU/Product code
  - Total cost (auto-calculated: Quantity × Unit Cost)
  - Scope category (e.g., Kitchen, Exterior, Bathroom)
  - Notes

- FR-3.7.1.3: System shall allow adding items from:
  - Unit cost database (search and select)
  - Estimate line items (one-click add with "Add to PO" button)
  - Manual entry

- FR-3.7.1.4: System shall calculate PO totals:
  - Subtotal
  - Tax (based on vendor tax rate or project region)
  - Shipping/Delivery fee
  - Grand Total

- FR-3.7.1.5: System shall organize PO by sections matching estimate structure:
  - General
  - Exterior
  - Garage
  - Rooms (Foyer, Family, Dining, etc.)

- FR-3.7.1.6: System shall allow saving PO as draft
- FR-3.7.1.7: System shall support PO templates for common orders
- FR-3.7.1.8: System shall support bulk import from suppliers

**Acceptance Criteria:**
- PO creates with all required fields
- Line items calculate correctly
- Items add from multiple sources without errors
- PO saves as draft and can be edited later
- Vendor information persists for future POs
- Sections organize logically

#### 3.7.2 PO Management
**Priority:** Must Have
**User Story:** As a project manager, I want to manage purchase orders so that I can track material procurement.

**Requirements:**
- FR-3.7.2.1: System shall display PO list with:
  - PO number
  - Date
  - Vendor
  - Project
  - Total amount
  - Status
  - Actions (View, Edit, Email, Mark Received, Cancel)

- FR-3.7.2.2: System shall support status transitions:
  - Draft → Submitted
  - Submitted → Confirmed
  - Confirmed → Received (full or partial)
  - Any → Cancelled

- FR-3.7.2.3: System shall send email to vendor when PO is submitted (if email provided)
- FR-3.7.2.4: System shall generate PDF of PO for printing/emailing (one-click export)
- FR-3.7.2.5: System shall support partial receipt of PO (receive specific line items or quantities)
- FR-3.7.2.6: System shall link PO costs to Material Expense Tracker automatically
- FR-3.7.2.7: System shall show PO history and status changes with timestamps
- FR-3.7.2.8: System shall support multi-PO per project with version control

**Acceptance Criteria:**
- PO list displays all POs correctly
- Status transitions work as defined
- Email sends successfully to vendor with PDF attachment
- PDF generates correctly with all line items
- Partial receiving updates quantities and status correctly
- Expenses link to POs automatically
- History log is complete and accurate

### 3.8 Material Expense Tracker

#### 3.8.1 Expense Entry
**Priority:** Must Have
**User Story:** As a field supervisor, I want to record material expenses so that we track actual spending.

**Requirements:**
- FR-3.8.1.1: System shall provide expense entry form with:
  - Date (default: today)
  - Vendor (dropdown + add new)
  - PO number (optional, dropdown of project POs)
  - Category (dropdown from summary categories)
  - Item description
  - Quantity
  - Unit cost
  - Total amount
  - Payment method (dropdown: Company Card, Check, Cash, Invoice)
  - Receipt upload (photo/PDF via Supabase Storage)
  - Notes

- FR-3.8.1.2: System shall support receipt photo upload from mobile devices
- FR-3.8.1.3: System shall auto-categorize expenses if linked to PO
- FR-3.8.1.4: System shall support bulk expense entry via CSV import
- FR-3.8.1.5: System shall require approval for expenses over threshold (configurable, default: $1000)
- FR-3.8.1.6: System shall validate expense against budget and alert for overages

**Acceptance Criteria:**
- Expense form submits successfully from mobile and desktop
- Receipt uploads and displays correctly
- PO linking works automatically and populates fields
- Approval workflow triggers when needed
- Budget alerts display appropriately

#### 3.8.2 Expense Tracking & Reporting
**Priority:** Must Have
**User Story:** As an accounting manager, I want to see material expense reports so that I can reconcile spending.

**Requirements:**
- FR-3.8.2.1: System shall display expense list with filters:
  - Date range
  - Vendor
  - Category
  - Payment method
  - Approval status

- FR-3.8.2.2: System shall show expense summary by category
- FR-3.8.2.3: System shall calculate total expenses vs budget per category
- FR-3.8.2.4: System shall highlight budget variances
- FR-3.8.2.5: System shall support export to CSV/Excel for accounting systems
- FR-3.8.2.6: System shall provide receipt image gallery view
- FR-3.8.2.7: System shall track payment status (Paid, Pending, Overdue)

**Acceptance Criteria:**
- Filters work correctly and can be combined
- Summary calculations are accurate
- Export includes all relevant data
- Receipt images are accessible and downloadable
- Payment tracking updates correctly

### 3.9 Billing and Invoicing

#### 3.9.1 Invoice Generation
**Priority:** Must Have
**User Story:** As an accounting manager, I want to generate invoices so that I can bill clients.

**Requirements:**
- FR-3.9.1.1: System shall provide invoice creation interface with:
  - Invoice number (auto-generated)
  - Date
  - Project reference
  - Client information (from project)
  - Invoice type (Initial, Progress, Final)

- FR-3.9.1.2: System shall organize invoice by categories:
  - General Improvements
  - Flooring - Carpet, Hardwood, Tile
  - Appliances
  - Other categories from estimate

- FR-3.9.1.3: System shall auto-populate from estimate totals
- FR-3.9.1.4: System shall support split invoicing (Initial vs Final)
- FR-3.9.1.5: System shall allow drag-and-drop categories to Initial/Final
- FR-3.9.1.6: System shall calculate invoice totals with tax
- FR-3.9.1.7: System shall generate professional PDF invoices
- FR-3.9.1.8: System shall support custom line items for add-ons

**Acceptance Criteria:**
- Invoices generate with all required fields
- Category organization is flexible
- PDF formatting is professional
- Totals calculate correctly with tax
- Custom items can be added

#### 3.9.2 Payment Tracking
**Priority:** Should Have
**User Story:** As an accounting manager, I want to track invoice payments so that I can manage receivables.

**Requirements:**
- FR-3.9.2.1: System shall track payment status (Unpaid, Partial, Paid, Overdue)
- FR-3.9.2.2: System shall record payment date and amount
- FR-3.9.2.3: System shall support partial payments
- FR-3.9.2.4: System shall calculate outstanding balance
- FR-3.9.2.5: System shall send payment reminders (email notifications)
- FR-3.9.2.6: System shall generate payment receipts

**Acceptance Criteria:**
- Payment status updates correctly
- Partial payments track accurately
- Reminders send on schedule
- Receipts generate properly

### 3.10 Reporting and Analytics

#### 3.10.1 Project Reports
**Priority:** Must Have
**User Story:** As a project manager, I want to generate reports so that I can review project performance.

**Requirements:**
- FR-3.10.1.1: System shall provide project overview reports showing:
  - Budget vs Actual
  - Cost breakdown by category
  - Profit margin
  - Change order summary
  - Timeline/schedule adherence

- FR-3.10.1.2: System shall support export to PDF and Excel
- FR-3.10.1.3: System shall allow filtering by date range, region, status
- FR-3.10.1.4: System shall provide visual charts (pie, bar, line graphs)

**Acceptance Criteria:**
- Reports generate accurately
- Exports work correctly
- Filters apply properly
- Charts render correctly

#### 3.10.2 Portfolio Analytics
**Priority:** Should Have
**User Story:** As an executive, I want to see portfolio analytics so that I can make strategic decisions.

**Requirements:**
- FR-3.10.2.1: System shall provide executive dashboard with:
  - Total portfolio value
  - Average profit margin
  - Regional performance comparison
  - Trends over time (cost inflation, profit trends)

- FR-3.10.2.2: System shall support regional cost trend analysis
- FR-3.10.2.3: System shall provide scenario modeling tools
- FR-3.10.2.4: System shall display performance metrics (KPIs)

**Acceptance Criteria:**
- Dashboard loads quickly with accurate data
- Regional comparisons are meaningful
- Trends display clearly
- KPIs update in real-time

---

## 4. Non-Functional Requirements

### 4.1 Performance
- NFR-4.1.1: System shall load initial page within 2 seconds
- NFR-4.1.2: System shall handle 100 concurrent users without degradation
- NFR-4.1.3: Search results shall return within 500ms
- NFR-4.1.4: PDF generation shall complete within 10 seconds
- NFR-4.1.5: Auto-save shall occur within 30 seconds without user disruption
- NFR-4.1.6: Dashboard shall load with up to 500 projects within 2 seconds

### 4.2 Security
- NFR-4.2.1: System shall use JWT-based authentication via Supabase Auth
- NFR-4.2.2: System shall encrypt data in transit (HTTPS/TLS)
- NFR-4.2.3: System shall encrypt sensitive data at rest in Supabase
- NFR-4.2.4: System shall implement role-based access control via Supabase Row Level Security (RLS)
- NFR-4.2.5: System shall log all user actions for audit trail
- NFR-4.2.6: System shall comply with data privacy regulations (GDPR, CCPA)
- NFR-4.2.7: System shall implement account lockout after failed login attempts
- NFR-4.2.8: System shall support MFA for enhanced security

### 4.3 Scalability
- NFR-4.3.1: System shall be cloud-hosted on Vercel for auto-scaling
- NFR-4.3.2: System shall support horizontal scaling during peak seasons
- NFR-4.3.3: Database (Supabase) shall scale to handle growing data volume
- NFR-4.3.4: System shall support up to 10,000 projects without performance degradation

### 4.4 Reliability
- NFR-4.4.1: System shall maintain 99.9% uptime
- NFR-4.4.2: System shall perform automatic backups daily via Supabase
- NFR-4.4.3: System shall support point-in-time recovery
- NFR-4.4.4: System shall have disaster recovery plan with <4 hour RTO
- NFR-4.4.5: System shall gracefully handle errors with user-friendly messages

### 4.5 Usability
- NFR-4.5.1: System shall be WCAG 2.1 AA compliant for accessibility
- NFR-4.5.2: System shall be responsive (mobile, tablet, desktop)
- NFR-4.5.3: System shall provide contextual help and tooltips
- NFR-4.5.4: System shall support onboarding tour for new users
- NFR-4.5.5: System shall mirror spreadsheet layout for familiar UX
- NFR-4.5.6: System shall support light/dark theme modes
- NFR-4.5.7: System shall provide clear error messages and validation feedback

### 4.6 Maintainability
- NFR-4.6.1: System shall use modular architecture for easy updates
- NFR-4.6.2: System shall have comprehensive API documentation
- NFR-4.6.3: System shall support versioned API endpoints
- NFR-4.6.4: System shall include automated testing (unit, integration)
- NFR-4.6.5: System shall use TypeScript for type safety

### 4.7 Data Migration
- NFR-4.7.1: System shall support Excel import via upload with field mapping
- NFR-4.7.2: System shall validate imported data and report errors
- NFR-4.7.3: System shall provide import preview before committing
- NFR-4.7.4: System shall support incremental data migration

---

## 5. Technical Architecture

### 5.1 Technology Stack

**Frontend:**
- Next.js 14+ (React 18+) - Server-side rendering, API routes
- Material-UI (MUI) - Component library for intuitive UI
- Redux or Zustand - State management for complex forms
- TypeScript - Type safety
- Tailwind CSS - Utility-first styling

**Backend:**
- Next.js API Routes (Serverless functions on Vercel)
- Supabase Edge Functions - For complex business logic

**Database:**
- Supabase (PostgreSQL) - Relational database with real-time subscriptions
- Supabase Storage - File storage for photos, PDFs, receipts

**Authentication:**
- Supabase Auth - Email/password, SSO, MFA
- Row Level Security (RLS) - Role-based permissions

**Deployment:**
- Vercel - Hosting and CI/CD
- GitHub - Version control and automated deployments

**Libraries:**
- Big.js - Decimal precision for financial calculations
- jsPDF or similar - PDF generation
- react-dropzone - File upload
- react-beautiful-dnd - Drag-and-drop
- recharts or Chart.js - Data visualization

### 5.2 Data Model (Supabase Tables)

**Core Tables:**

```sql
-- Users (managed by Supabase Auth)
auth.users (id, email, created_at)

-- Custom user profiles
profiles (
  id UUID PK (FK to auth.users),
  role TEXT (Admin, Manager, Estimator, Viewer, Client),
  custom_permissions JSONB,
  created_at TIMESTAMP
)

-- Projects
projects (
  id UUID PK,
  name TEXT,
  address JSONB {street, city, state, zip},
  entity_num TEXT,
  budget NUMERIC,
  status TEXT (Draft, In Progress, Complete, On Hold, Cancelled),
  created_by UUID FK,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Property Information
property_infos (
  id UUID PK,
  project_id UUID FK,
  region_id UUID FK,
  rent_amount NUMERIC,
  sq_ft_bpo NUMERIC,
  sq_ft_actual NUMERIC,
  bedrooms INT,
  bathrooms NUMERIC,
  facade_type TEXT,
  garage_type TEXT,
  garage_size NUMERIC,
  has_basement BOOLEAN,
  floors INT,
  foundation_area NUMERIC,
  roof_area NUMERIC,
  roof_age INT,
  hvac_age INT,
  water_heater_age INT,
  utilities JSONB {gas_on, water_on, power_on},
  safety_checklist JSONB {breakers_off, water_main_off, lockbox_code},
  notes TEXT
)

-- Room Dimensions
rooms (
  id UUID PK,
  property_info_id UUID FK,
  name TEXT,
  length NUMERIC,
  width NUMERIC,
  misc_sf NUMERIC,
  misc_note TEXT,
  total_sf NUMERIC (GENERATED: length * width + misc_sf)
)

-- Regions
regions (
  id UUID PK,
  name TEXT,
  state TEXT,
  location_factor NUMERIC,
  rsmeans_factor NUMERIC,
  contingency NUMERIC,
  traditional NUMERIC,
  tax_rate NUMERIC
)

-- Unit Costs
unit_costs (
  id UUID PK,
  category TEXT,
  subcategory TEXT,
  action_item TEXT,
  description TEXT,
  unit TEXT (SF, LF, EA, etc.),
  sku TEXT,
  material_cost NUMERIC,
  labor_cost NUMERIC,
  labor_hours NUMERIC,
  oh_profit NUMERIC DEFAULT 0.06,
  workmans_comp NUMERIC DEFAULT 0.01,
  insurance NUMERIC DEFAULT 0.01,
  gc_fee NUMERIC DEFAULT 0,
  is_active BOOLEAN,
  effective_date DATE,
  notes TEXT,
  region_id UUID FK (nullable for global items)
)

-- Estimates
estimates (
  id UUID PK,
  project_id UUID FK,
  version INT,
  spec_package TEXT (Standard, Traditional, Custom),
  valid_until DATE,
  created_at TIMESTAMP,
  created_by UUID FK
)

-- Estimate Line Items
estimate_line_items (
  id UUID PK,
  estimate_id UUID FK,
  room_name TEXT,
  category TEXT,
  is_required BOOLEAN,
  unit_cost_id UUID FK (nullable for custom items),
  action_description TEXT,
  sku TEXT,
  quantity NUMERIC,
  unit TEXT,
  unit_cost NUMERIC,
  total_cost NUMERIC (GENERATED: quantity * unit_cost),
  notes TEXT,
  sort_order INT
)

-- Purchase Orders
purchase_orders (
  id UUID PK,
  po_number TEXT UNIQUE,
  project_id UUID FK,
  vendor_id UUID FK,
  date DATE,
  delivery_address TEXT,
  delivery_date DATE,
  special_instructions TEXT,
  status TEXT (Draft, Submitted, Confirmed, Received, Cancelled),
  subtotal NUMERIC,
  tax NUMERIC,
  shipping NUMERIC,
  grand_total NUMERIC,
  hd_pro_account TEXT,
  vendor_email TEXT,
  store_location TEXT,
  mav_contact TEXT,
  created_by UUID FK,
  created_at TIMESTAMP
)

-- PO Line Items
po_line_items (
  id UUID PK,
  po_id UUID FK,
  line_number INT,
  description TEXT,
  quantity NUMERIC,
  unit TEXT,
  unit_cost NUMERIC,
  sku TEXT,
  total_cost NUMERIC (GENERATED: quantity * unit_cost),
  scope_category TEXT,
  notes TEXT,
  quantity_received NUMERIC DEFAULT 0
)

-- Vendors
vendors (
  id UUID PK,
  name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  tax_rate NUMERIC,
  notes TEXT
)

-- Material Expenses
material_expenses (
  id UUID PK,
  project_id UUID FK,
  po_id UUID FK (nullable),
  date DATE,
  vendor_id UUID FK,
  category TEXT,
  description TEXT,
  quantity NUMERIC,
  unit_cost NUMERIC,
  total_amount NUMERIC,
  payment_method TEXT (Company Card, Check, Cash, Invoice),
  receipt_url TEXT,
  notes TEXT,
  approval_status TEXT (Pending, Approved, Rejected),
  approved_by UUID FK,
  approved_at TIMESTAMP
)

-- Change Orders
change_orders (
  id UUID PK,
  co_number TEXT,
  project_id UUID FK,
  date DATE,
  description TEXT,
  reason TEXT,
  material_cost_impact NUMERIC,
  labor_cost_impact NUMERIC,
  total_cost_impact NUMERIC,
  approval_status TEXT (Pending, Approved, Rejected),
  approved_by UUID FK,
  approval_date DATE,
  client_signature TEXT (base64 image),
  created_by UUID FK
)

-- Invoices
invoices (
  id UUID PK,
  invoice_number TEXT UNIQUE,
  project_id UUID FK,
  date DATE,
  type TEXT (Initial, Progress, Final),
  subtotal NUMERIC,
  tax NUMERIC,
  grand_total NUMERIC,
  payment_status TEXT (Unpaid, Partial, Paid, Overdue),
  amount_paid NUMERIC,
  created_by UUID FK,
  created_at TIMESTAMP
)

-- Invoice Line Items
invoice_line_items (
  id UUID PK,
  invoice_id UUID FK,
  category TEXT,
  description TEXT,
  amount NUMERIC
)

-- Activity Log (Audit Trail)
activity_log (
  id UUID PK,
  project_id UUID FK,
  user_id UUID FK,
  action TEXT,
  entity_type TEXT (Project, Estimate, PO, etc.),
  entity_id UUID,
  changes JSONB,
  timestamp TIMESTAMP
)

-- Photos
photos (
  id UUID PK,
  property_info_id UUID FK,
  url TEXT,
  category TEXT (Initial, During Progress, Final),
  uploaded_by UUID FK,
  uploaded_at TIMESTAMP
)
```

**Relationships:**
- Foreign keys enforce referential integrity
- Cascade deletes configured where appropriate
- Row Level Security (RLS) policies enforce role-based access

### 5.3 API Design (Next.js Routes)

**Projects:**
- POST /api/projects - Create project
- GET /api/projects - List projects (with filters)
- GET /api/projects/[id] - Get project details
- PUT /api/projects/[id] - Update project
- DELETE /api/projects/[id] - Delete project
- POST /api/projects/[id]/clone - Clone project

**Property Info:**
- POST /api/projects/[id]/property - Create/update property info
- GET /api/projects/[id]/property - Get property info
- POST /api/projects/[id]/property/photos - Upload photos
- DELETE /api/photos/[id] - Delete photo

**Estimates:**
- POST /api/projects/[id]/estimates - Create estimate
- GET /api/projects/[id]/estimates - List estimates
- GET /api/estimates/[id] - Get estimate details
- PUT /api/estimates/[id] - Update estimate
- POST /api/estimates/[id]/line-items - Add line items
- PUT /api/estimate-line-items/[id] - Update line item
- DELETE /api/estimate-line-items/[id] - Delete line item
- GET /api/estimates/[id]/export/pdf - Export to PDF
- GET /api/estimates/[id]/export/excel - Export to Excel

**Unit Costs:**
- GET /api/unit-costs - List unit costs (with search/filter)
- POST /api/unit-costs - Create unit cost
- PUT /api/unit-costs/[id] - Update unit cost
- DELETE /api/unit-costs/[id] - Delete unit cost
- POST /api/unit-costs/import - Bulk import
- GET /api/unit-costs/export - Bulk export

**Purchase Orders:**
- POST /api/projects/[id]/pos - Create PO
- GET /api/projects/[id]/pos - List POs
- GET /api/pos/[id] - Get PO details
- PUT /api/pos/[id] - Update PO
- DELETE /api/pos/[id] - Delete PO
- POST /api/pos/[id]/submit - Submit PO (sends email)
- POST /api/pos/[id]/receive - Mark received (full/partial)
- GET /api/pos/[id]/export/pdf - Export to PDF

**Expenses:**
- POST /api/projects/[id]/expenses - Create expense
- GET /api/projects/[id]/expenses - List expenses
- PUT /api/expenses/[id] - Update expense
- DELETE /api/expenses/[id] - Delete expense
- POST /api/expenses/[id]/approve - Approve expense

**Change Orders:**
- POST /api/projects/[id]/change-orders - Create change order
- GET /api/projects/[id]/change-orders - List change orders
- PUT /api/change-orders/[id] - Update change order
- POST /api/change-orders/[id]/approve - Approve change order
- GET /api/change-orders/[id]/export/pdf - Export to PDF

**Invoices:**
- POST /api/projects/[id]/invoices - Create invoice
- GET /api/projects/[id]/invoices - List invoices
- PUT /api/invoices/[id] - Update invoice
- POST /api/invoices/[id]/payment - Record payment
- GET /api/invoices/[id]/export/pdf - Export to PDF

**Reports:**
- GET /api/projects/[id]/reports/summary - Project summary report
- GET /api/reports/portfolio - Portfolio analytics
- GET /api/reports/regional-trends - Regional cost trends

### 5.4 Real-Time Collaboration

**Supabase Realtime Features:**
- Enable real-time subscriptions on key tables (estimates, estimate_line_items, projects)
- Broadcast user presence (who's viewing/editing)
- Show live cursor positions for collaborative editing
- Display real-time notifications for updates

**Implementation:**
```javascript
// Subscribe to estimate updates
const subscription = supabase
  .channel('estimate_changes')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'estimate_line_items', filter: `estimate_id=eq.${estimateId}` },
    (payload) => {
      // Update UI with changes
    }
  )
  .subscribe()
```

### 5.5 File Handling

**Supabase Storage:**
- Bucket: `photos` - Property images
- Bucket: `receipts` - Expense receipts
- Bucket: `documents` - Generated PDFs

**Upload Process:**
1. Client uploads file to Supabase Storage
2. Get signed URL for preview/download
3. Store URL reference in database
4. Implement automatic thumbnail generation for images

### 5.6 Calculations Engine

**Serverless Functions:**
- Implement complex calculations in Next.js API routes or Supabase Edge Functions
- Use Big.js for decimal precision in financial calculations
- Cache frequently used calculations
- Validate all inputs before calculations

**Example Calculation Flow:**
```javascript
// Unit Cost Total
const materialWithTax = materialCost * (1 + taxRate)
const totalLabor = laborCost * (1 + ohProfit + workmansComp + insurance)
const totalCost = materialWithTax + totalLabor + gcFee

// Apply regional multipliers
const adjustedCost = totalCost * locationFactor * rsmeansFactor * (1 + contingency)
```

---

## 6. User Interface Design

### 6.1 Navigation Structure

**Primary Navigation (Sidebar):**
- Dashboard
- Projects
- Estimates
- Purchase Orders
- Expenses
- Invoices
- Reports
- Unit Costs (Manager/Admin only)
- Users (Admin only)
- Settings

**Breadcrumbs:**
- Projects > 123 Main St > Kitchen > Flooring

### 6.2 Key Screens

#### 6.2.1 Dashboard
**Layout:**
- Header with user info, notifications
- KPI cards: Active Projects, Total Budget, Total Profit %, Pending POs
- Kanban board: Projects grouped by status (New, In Progress, Complete)
- Visual charts: Pie chart (cost breakdown), Bar chart (room totals)
- Recent activity feed

**Interactions:**
- Drag projects between status columns
- Click card to navigate to project
- Filter by region, date, user

#### 6.2.2 Project Detail
**Layout:**
- Project header: Name, Address, Status badge, Assigned users
- Tab navigation: Property Info | Estimate | Summary | POs | Expenses | Billing
- Metrics cards: Budget, Cost, Variance, Profit %
- Action buttons: Edit, Clone, Export, Archive

#### 6.2.3 Property Info Form
**Layout:**
- Stepper wizard:
  - Step 1: Address & Basic Info
  - Step 2: Room Dimensions
  - Step 3: Utilities & Ages
  - Step 4: Photos & Notes

**Features:**
- Auto-save every 30 seconds
- Validation highlighting
- Regional dropdown with multiplier preview
- Photo drag-and-drop upload
- Progress indicator

#### 6.2.4 Estimate Builder
**Layout:**
- Room tabs (horizontal scrolling)
- Category accordions (collapsible)
- Line item table (editable inline)
- Sidebar: Summary totals, Search items, Recently used

**Features:**
- Search bar with auto-suggest
- Required checkbox filters
- Quantity slider or input
- Drag-and-drop reordering
- Progress bar per room
- Heatmap for high-cost items
- "Add to Estimate" quick button

**Table Columns:**
- [Checkbox] Required
- Category (dropdown)
- Description (text, editable)
- SKU (text)
- Qty (number input)
- Unit (auto)
- Unit Cost (currency, editable for custom)
- Total (auto-calculated)
- Notes (text area)
- [Button] Delete

#### 6.2.5 PO Generator
**Layout:**
- PO header form (vendor, date, delivery)
- Line items table (mirror estimate structure)
- Filter by scope/category
- Totals footer

**Features:**
- One-click "Add from Estimate"
- Bulk select items
- PDF export button
- Email to vendor button
- Status workflow buttons

#### 6.2.6 Summary/Budget View
**Layout:**
- Table with subcontractor categories
- Columns: Material, Tax, Material w/Tax, Labor, Overhead, Total Budget, Buyout Goal %, Projected Cost, Variance
- Color-coded variance indicators (red/green/gray)
- Totals row
- Visual charts

#### 6.2.7 Billing View
**Layout:**
- Invoice template editor
- Category list with drag-to-initial/final
- Invoice preview panel
- PDF generation

### 6.3 Design System

**Color Palette:**
- Primary: Blue (#1976d2)
- Success: Green (#4caf50) - Under budget
- Warning: Yellow (#ff9800) - At threshold
- Error: Red (#f44336) - Over budget
- Neutral: Gray (#9e9e9e)

**Typography:**
- Headings: Roboto, sans-serif
- Body: Roboto, sans-serif
- Monospace (for numbers): Roboto Mono

**Components (Material-UI):**
- Buttons: Contained, Outlined, Text
- Forms: TextField, Select, Checkbox, Radio, DatePicker
- Tables: DataGrid with sorting, filtering
- Cards: Elevated, Outlined
- Modals: Dialog, Drawer
- Feedback: Snackbar, Alert, Progress

**Responsive Breakpoints:**
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

**Accessibility:**
- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Color contrast ratios

---

## 7. User Stories Summary

| ID | As a... | I want... | So that... | Priority |
|----|---------|-----------|------------|----------|
| US-1 | Estimator | To create projects via wizard | I can quickly onboard new projects | Must Have |
| US-2 | Estimator | To enter property info with auto-save | I don't lose data | Must Have |
| US-3 | Estimator | To search unit costs quickly | I can add items to estimates efficiently | Must Have |
| US-4 | Estimator | To build room-by-room estimates | Work is organized logically | Must Have |
| US-5 | Estimator | To use pre-built templates | I avoid re-entering common items | Should Have |
| US-6 | Estimator | To export estimates to PDF | I can present to clients professionally | Must Have |
| US-7 | Project Manager | To view project dashboard | I can monitor all projects at a glance | Must Have |
| US-8 | Project Manager | To collaborate in real-time | Multiple team members can work simultaneously | Must Have |
| US-9 | Project Manager | To create purchase orders from estimates | Material ordering is streamlined | Must Have |
| US-10 | Project Manager | To track change orders | I can manage scope changes | Must Have |
| US-11 | Project Manager | To see budget variance | I can identify overruns early | Must Have |
| US-12 | Field Supervisor | To access app from mobile | I can work from the field | Must Have |
| US-13 | Field Supervisor | To record expenses with photo receipts | Spending is tracked accurately | Must Have |
| US-14 | Accounting Manager | To generate invoices | I can bill clients efficiently | Must Have |
| US-15 | Accounting Manager | To track payments | I can manage receivables | Should Have |
| US-16 | Accounting Manager | To export financial data | I can integrate with accounting systems | Must Have |
| US-17 | Executive | To view profit dashboards | I can monitor portfolio health | Must Have |
| US-18 | Executive | To analyze regional trends | I can make strategic decisions | Should Have |
| US-19 | Admin | To manage users and roles | Access control is enforced | Must Have |
| US-20 | Admin | To manage unit cost database | Pricing stays current | Must Have |

---

## 8. Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Data migration errors from Excel | High | Medium | Provide import validator, beta test with sample files, manual review process |
| User adoption resistance | High | Medium | Onboarding tour, mirror spreadsheet layout, provide training, phased rollout |
| Cost overruns in development | Medium | Low | Phased development (MVP first), regular budget reviews, prioritize must-haves |
| Performance issues with large datasets | Medium | Low | Implement pagination, caching, database indexing, load testing |
| Security vulnerabilities | High | Low | Use established security frameworks (Supabase Auth), regular security audits, penetration testing |
| Third-party service downtime (Vercel, Supabase) | Medium | Low | Choose providers with 99.9% SLA, implement graceful degradation, have backup plan |
| Calculation errors | High | Low | Comprehensive unit testing, use Big.js for precision, manual QA, user validation period |
| Scope creep | Medium | Medium | Strict change control process, prioritize features, defer to future phases |

---

## 9. Timeline and Milestones

### Phase 1: MVP (8 weeks)
**Weeks 1-2: Foundation**
- Project setup (Next.js, Supabase, Vercel)
- Authentication and user management
- Database schema implementation
- Basic UI framework (Material-UI)

**Weeks 3-4: Core Features - Part 1**
- Project creation and management
- Property info entry with stepper wizard
- Room dimensions with auto-calculations
- Regional adjustments

**Weeks 5-6: Core Features - Part 2**
- Unit cost database
- Basic estimate builder (room-based)
- Line item CRUD operations
- Simple calculations engine

**Weeks 7-8: Polish & Testing**
- PDF export for estimates
- Basic dashboard
- User testing and bug fixes
- MVP launch to pilot users

### Phase 2: Full Feature Set (12 weeks)
**Weeks 9-12:**
- Purchase order module
- PO to estimate integration
- Material expense tracker
- Receipt upload

**Weeks 13-16:**
- Budget summary and variance tracking
- Change order management
- Billing and invoice generation
- Payment tracking

**Weeks 17-20:**
- Real-time collaboration (Supabase Realtime)
- Advanced reporting
- Portfolio analytics
- Performance optimization
- User training and documentation

### Phase 3: Refinement & Launch (4 weeks)
**Weeks 21-22:**
- Final polish and UX improvements
- Comprehensive testing (security, performance, UAT)
- Data migration tools
- Marketing materials

**Weeks 23-24:**
- Full production launch
- User onboarding
- Post-launch support
- Feedback collection and iteration planning

**Total Timeline: 24 weeks (6 months)**

---

## 10. Success Metrics and KPIs

### 10.1 Adoption Metrics
- 90% user adoption within 3 months of launch
- Average daily active users (DAU) > 80% of licensed users
- User satisfaction rating of 4.5/5 or higher (via in-app surveys)
- Support ticket volume reduction of 60% vs Excel system

### 10.2 Performance Metrics
- 99.9% system uptime
- Page load time < 2 seconds
- Search results < 500ms
- PDF generation < 10 seconds
- Zero data loss incidents

### 10.3 Business Metrics
- 50% reduction in estimate creation time (baseline vs post-implementation)
- 25% reduction in budget overruns
- Zero manual calculation errors
- Positive ROI within 12 months
- 30% increase in estimate volume capacity per estimator

### 10.4 User Engagement Metrics
- Average estimates created per user per week
- Average time spent in application per session
- Feature adoption rate (% of users using each major feature)
- Mobile vs desktop usage ratio
- Real-time collaboration sessions per week

---

## 11. Appendices

### 11.1 Glossary
- **BPO/MLS/Zillow SF:** Square footage from Broker Price Opinion, Multiple Listing Service, or Zillow
- **RSMeans:** Construction cost data standard
- **OH & Profit:** Overhead and Profit margin
- **GC Fee:** General Contractor fee
- **MAV:** Materials and Vendor (contact person)
- **HD Pro:** Home Depot Pro Account
- **CO:** Change Order
- **PO:** Purchase Order
- **LF:** Linear Feet
- **SF:** Square Feet
- **EA:** Each (unit)

### 11.2 References
- Original Excel file: "Andrew Cost Estimator.xlsx"
- Material-UI documentation: https://mui.com
- Next.js documentation: https://nextjs.org
- Supabase documentation: https://supabase.com/docs

### 11.3 Future Enhancements (Post-Launch)
- AI-driven cost suggestions based on historical data
- Mobile native apps (iOS, Android)
- Real-time supplier inventory integration via APIs
- Automated material ordering (Home Depot API)
- Payment processing integration (Stripe)
- Advanced scheduling/Gantt charts
- Integration with accounting systems (QuickBooks, Xero)
- Voice-to-text for field notes
- Augmented reality for room visualization
- Predictive analytics for profit forecasting

---

## 12. Approval and Sign-Off

**Prepared By:** Product Management Team
**Review Required By:**
- [ ] Product Owner
- [ ] Engineering Lead
- [ ] UX/UI Designer
- [ ] Business Stakeholders

**Approval Date:** _________________

**Next Steps:**
1. Stakeholder review and approval
2. Wireframe and prototype development
3. User interviews and validation
4. Engineering sprint planning
5. Kickoff Phase 1 development

---

**Document Version Control:**
- v1.0 - Initial comprehensive PRD (October 2025)
- Future versions will track changes and approvals
