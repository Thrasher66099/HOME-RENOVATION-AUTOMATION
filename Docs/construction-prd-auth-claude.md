# Construction Cost Estimator - Product Requirements Document (PRD)

## Document Control

**Version:** 1.0  
**Last Updated:** October 2025  
**Document Owner:** Product Management  
**Status:** Draft for Review

---

## 1. Product Overview

### 1.1 Product Name
Construction Cost Estimator Web Application

### 1.2 Product Description
A cloud-based construction estimation and project management platform that replaces spreadsheet-based workflows with an intuitive, collaborative, multi-user web application for home renovation companies.

### 1.3 Business Objectives
- Reduce estimate creation time by 50%
- Enable real-time collaboration among team members
- Improve estimate accuracy and reduce budget overruns by 25%
- Provide mobile accessibility for field teams
- Generate professional client-facing documents
- Track project financials in real-time
- Maintain comprehensive audit trail

### 1.4 Success Criteria
- 90% user adoption within 3 months of launch
- 99.9% system uptime
- Reduce support tickets by 60% compared to Excel-based system
- Positive ROI within 12 months
- User satisfaction rating of 4.5/5 or higher

---

## 2. User Personas

### 2.1 Primary Persona: Sarah - Project Estimator
- **Role:** Creates detailed cost estimates for renovation projects
- **Goals:** Quickly generate accurate estimates, access pricing data easily, create professional proposals
- **Pain Points:** Excel file locking, formula errors, time-consuming manual calculations
- **Technical Proficiency:** Moderate

### 2.2 Secondary Persona: Mike - Project Manager
- **Role:** Oversees multiple renovation projects simultaneously
- **Goals:** Track project budgets, monitor expenses, coordinate teams
- **Pain Points:** Lack of real-time visibility, difficulty consolidating data from multiple sources
- **Technical Proficiency:** Moderate to High

### 2.3 Tertiary Persona: Carlos - Field Supervisor
- **Role:** Manages on-site work and material purchases
- **Goals:** Update project status, record material expenses, verify quantities
- **Pain Points:** Need mobile access, can't edit files from field, delayed information
- **Technical Proficiency:** Low to Moderate

### 2.4 Supporting Persona: Jennifer - Accounting Manager
- **Role:** Manages project financials and invoicing
- **Goals:** Generate invoices, track payments, reconcile expenses, produce financial reports
- **Pain Points:** Manual data entry from spreadsheets, reconciliation difficulties
- **Technical Proficiency:** High

---

## 3. Functional Requirements

### 3.1 User Management & Authentication

#### 3.1.1 User Registration & Login
**Priority:** Must Have  
**User Story:** As a user, I want to securely log into the system so that I can access my projects.

**Requirements:**
- FR-3.1.1.1: System shall support email/password authentication
- FR-3.1.1.2: System shall enforce password complexity requirements (min 8 characters, uppercase, lowercase, number, special character)
- FR-3.1.1.3: System shall support password reset via email
- FR-3.1.1.4: System shall implement session timeout after 8 hours of inactivity
- FR-3.1.1.5: System shall support multi-factor authentication (MFA) as optional setting
- FR-3.1.1.6: System shall lock account after 5 failed login attempts

**Acceptance Criteria:**
- User can register with valid email and password
- User receives verification email upon registration
- User can log in with verified credentials
- User can reset forgotten password
- Session expires after timeout period
- MFA can be enabled in user settings

#### 3.1.2 Role-Based Access Control
**Priority:** Must Have  
**User Story:** As an admin, I want to assign roles to users so that they have appropriate permissions.

**Requirements:**
- FR-3.1.2.1: System shall support five role types: Admin, Manager, Estimator, Viewer, Client
- FR-3.1.2.2: System shall enforce role-based permissions at module and action levels
- FR-3.1.2.3: System shall allow admins to create custom roles with granular permissions
- FR-3.1.2.4: System shall log all permission changes with timestamp and user

**Role Permissions Matrix:**

| Action            | Admin | Manager | Estimator | Viewer | Client |
|--------           |-------|---------|-----------|--------|--------|
| Create Project    | ✓     | ✓      | ✓         | ✗     | ✗      |
| Edit Project      | ✓     | ✓      | ✓         | ✗     | ✗      |
| Delete Project    | ✓     | ✓      | ✗         | ✗     | ✗      |
| View Project      | ✓     | ✓      | ✓         | ✓     | ✓*     |
| Create Estimate   | ✓     | ✓      | ✓         | ✗     | ✗      |
| Edit Estimate     | ✓     | ✓      | ✓         | ✗     | ✗      |
| Approve Estimate  | ✓     | ✓      | ✗         | ✗     | ✗      |
| View Unit Costs   | ✓     | ✓      | ✓         | ✗     | ✗      |
| Edit Unit Costs   | ✓     | ✓      | ✗         | ✗     | ✗      |
| Manage Users      | ✓     | ✗      | ✗         | ✗     | ✗      |

*Client can only view approved estimates for their projects

### 3.2 Project Management

#### 3.2.1 Project Creation
**Priority:** Must Have  
**User Story:** As an estimator, I want to create a new project so that I can begin estimating costs.

**Requirements:**
- FR-3.2.1.1: System shall provide project creation wizard with step-by-step guidance
- FR-3.2.1.2: System shall auto-generate unique project ID
- FR-3.2.1.3: System shall require project name and property address as minimum fields
- FR-3.2.1.4: System shall support project templates for common renovation types
- FR-3.2.1.5: System shall allow cloning of existing projects
- FR-3.2.1.6: System shall timestamp project creation and record creating user

**Acceptance Criteria:**
- User can create project with all required fields
- Project appears in project list immediately
- Project ID is unique and auto-generated
- User can select from template library
- Cloned projects copy all structure but not specific property data

#### 3.2.2 Project Dashboard
**Priority:** Must Have  
**User Story:** As a project manager, I want to see an overview of all projects so that I can monitor status and prioritize work.

**Requirements:**
- FR-3.2.2.1: System shall display project list with key metrics: Name, Address, Status, Budget, Created Date, Last Modified
- FR-3.2.2.2: System shall support filtering by status, date range, assigned user, region
- FR-3.2.2.3: System shall support sorting by any column
- FR-3.2.2.4: System shall provide search functionality by project name, address, or ID
- FR-3.2.2.5: System shall support both grid and table view modes
- FR-3.2.2.6: System shall show project status with color coding: Draft (gray), In Progress (blue), Complete (green), On Hold (yellow), Cancelled (red)
- FR-3.2.2.7: System shall provide quick action buttons: View, Edit, Clone, Archive, Delete

**Acceptance Criteria:**
- Dashboard loads within 2 seconds with up to 500 projects
- All filters work correctly and can be combined
- Search returns results in real-time (< 500ms)
- Status colors are clearly visible and consistent

#### 3.2.3 Project Detail View
**Priority:** Must Have  
**User Story:** As a user, I want to see all project information in one place so that I can quickly understand project status.

**Requirements:**
- FR-3.2.3.1: System shall display project header with: Name, Address, Status, Created Date, Last Modified, Assigned Users
- FR-3.2.3.2: System shall provide tab navigation to: Property Info, Estimate, Summary, Schedule, POs, Expenses, Billing
- FR-3.2.3.3: System shall show key metrics cards: Total Budget, Total Cost, Variance, Profit Margin, Days Remaining
- FR-3.2.3.4: System shall display recent activity feed
- FR-3.2.3.5: System shall provide quick links to common actions

### 3.3 Property Information

#### 3.3.1 Property Data Entry
**Priority:** Must Have  
**User Story:** As an estimator, I want to enter property details so that I can calculate accurate estimates.

**Requirements:**
- FR-3.3.1.1: System shall capture the following property fields:
  - Region (dropdown)
  - Date
  - Street Address (text, required)
  - City, State, Zip (text, required)
  - Entity Number (text)
  - Rent Amount (currency)
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
  - Roof Age (number, years)
  - HVAC Age (number, years)
  - Water Heater Age (number, years)
  
- FR-3.3.1.2: System shall provide utility status checkboxes:
  - Gas Service ON (boolean)
  - Water Service ON (boolean)
  - Power Service ON (boolean)
  
- FR-3.3.1.3: System shall capture safety checklist:
  - All Electrical Breakers Off (boolean)
  - Water Main Off at Street & House (boolean)
  - Lockbox Code (text)
  
- FR-3.3.1.4: System shall support photo upload with the following specs:
  - Max 50 photos per property
  - Supported formats: JPG, PNG, HEIC
  - Max file size: 10MB per photo
  - Automatic thumbnail generation
  - Photo categorization: Initial, During Progress, Final
  - Drag-and-drop interface

- FR-3.3.1.5: System shall validate all numeric fields for positive values
- FR-3.3.1.6: System shall auto-save property information every 30 seconds
- FR-3.3.1.7: System shall highlight required fields that are incomplete

**Acceptance Criteria:**
- All fields save correctly with appropriate data types
- Photos upload successfully and display thumbnails
- Validation errors display clearly
- Auto-save works without user intervention
- Form can be submitted with only required fields

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
  - Basement

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
  
- FR-3.3.2.5: System shall display room dimensions in a table format
- FR-3.3.2.6: System shall allow adding custom rooms
- FR-3.3.2.7: System shall carry room dimensions to estimate module automatically

**Acceptance Criteria:**
- All calculations are mathematically accurate
- Totals update in real-time as dimensions are entered
- Room dimensions auto-populate in estimate
- Custom rooms can be added and removed

### 3.4 Unit Cost Database

#### 3.4.1 Pricing Matrix Management
**Priority:** Must Have  
**User Story:** As a manager, I want to maintain a pricing database so that estimates use current costs.

**Requirements:**
- FR-3.4.1.1: System shall organize unit costs hierarchically:
  - Level 1: Category (Kitchen, Bathroom, General, Exterior, etc.)
  - Level 2: Subcategory (Cabinets, Countertops, Flooring, etc.)
  - Level 3: Action/Item (specific work description)

- FR-3.4.1.2: For each unit cost item, system shall store:
  - Action/Item name (text, required)
  - Cost unit (dropdown: SF, LF, EA, per unit, custom)
  - SKU number (text, optional)
  - Material cost (currency, required)
  - Tax rate (percentage, default from region)
  - Labor cost (currency, required)
  - OH & Profit percentage (decimal, default: 0.06)
  - Workman's Comp percentage (decimal, default: 0.01)
  - Insurance percentage (decimal, default: 0.01)
  - GC Fee (currency, default: 0)
  - Active/Inactive status (boolean)
  - Effective date (date)
  - Notes (text, optional)

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
- FR-3.4.2.1: System shall provide search with real-time results
- FR-3.4.2.2: System shall support search by:
  - Item name (partial match)
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

**Acceptance Criteria:**
- Search returns results within 500ms
- All search filters work correctly
- Items can be added directly to estimate from search
- Recently used and favorites lists update correctly

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
  - Bathrooms (multiple instances)
  - Bedrooms (multiple instances)
  - Basement

- FR-3.5.1.2: System shall auto-populate room dimensions from Property Info
- FR-3.5.1.3: System shall organize items by category (collapsible sections):
  - Painting
  - Flooring
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
  - Miscellaneous

- FR-3.5.1.4: For each line item, system shall capture:
  - Required checkbox (1 = Yes, 0 = No)
  - Scope item (from Unit Cost Database)
  - Action description (auto-populated from unit cost)
  - Quantity/SF (number, decimal)
  - Unit type (auto-populated)
  - Total expense (auto-calculated)

- FR-3.5.1.5: System shall calculate line item total:
  ```
  Line Item Total = Quantity × Unit Total Cost
  ```

- FR-3.5.1.6: System shall calculate room subtotal:
  ```
  Room Subtotal = SUM(All Line Items where Required = 1)
  ```

- FR-3.5.1.7: System shall show/hide items based on Required checkbox
- FR-3.5.1.8: System shall support adding custom line items with manual cost entry
- FR-3.5.1.9: System shall allow reordering line items within categories
- FR-3.5.1.10: System shall support copying items from other rooms
- FR-3.5.1.11: System shall support notes at line item, category, and room levels

**Acceptance Criteria:**
- Room dimensions populate automatically
- All calculations update in real-time
- Required checkbox filters display correctly
- Custom items can be added with manual pricing
- Room subtotals are accurate
- Copy between rooms works without errors

#### 3.5.2 Estimate Compilation
**Priority:** Must Have  
**User Story:** As an estimator, I want to see all rooms compiled into one estimate so that I can review total project cost.

**Requirements:**
- FR-3.5.2.1: System shall create master estimate by aggregating all room estimates
- FR-3.5.2.2: System shall display estimate with following structure:
  - Estimate header with project info
  - Grouped by room or by category (user selectable)
  - Line item details: Description, Quantity, Unit, Unit Cost, Total
  - Room/Category subtotals
  - Grand total

- FR-3.5.2.3: Estimate header shall include:
  - Property address
  - City, State, Zip
  - Spec package (Standard, Traditional, Custom)
  - Entity ID
  - Estimate date
  - Valid until date (default: 30 days)
  - Estimate version number

- FR-3.5.2.4: System shall support estimate display modes:
  - Detailed (all line items)
  - Summary (category totals only)
  - Custom (user selects what to show)

- FR-3.5.2.5: System shall allow global markup adjustment (%, $)
- FR-3.5.2.6: System shall allow global discount (%, $)
- FR-3.5.2.7: System shall show cost breakdown:
  - Materials: $X
  - Labor: $X
  - Overhead: $X
  - Total: $X

**Acceptance Criteria:**
- Master estimate aggregates all rooms correctly
- Grouping options work properly
- Markup and discount apply correctly
- Cost breakdown sums accurately

#### 3.5.3 Estimate Export & Presentation
**Priority:** Must Have  
**User Story:** As an estimator, I want to export estimates to PDF so that I can present professional documents to clients.

**Requirements:**
- FR-3.5.3.1: System shall export estimate to PDF with professional formatting
- FR-3.5.3.2: PDF shall include company branding (logo, colors, footer)
- FR-3.5.3.3: System shall support customizable PDF templates
- FR-3.5.3.4: System shall allow showing/hiding cost breakdowns in export
- FR-3.5.3.5: System shall support export to Excel for further analysis
- FR-3.5.3.6: System shall provide print-optimized view
- FR-3.5.3.7: System shall allow email delivery of PDF directly from app
- FR-3.5.3.8: System shall maintain estimate version history

**Acceptance Criteria:**
- PDF generates within 10 seconds
- PDF formatting is professional and consistent
- Excel export maintains all data and calculations
- Email delivery works correctly
- Version history tracks all changes

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
  - Material Cost (from estimate)
  - Tax (calculated)
  - Material with Tax Budget
  - Labor Budget
  - Overhead
  - Total Cost
  - Total Budget
  - Buyout Goal % (target for cost savings)
  - Buyout Goal $ amount
  - Projected Material Cost (from actual purchases)
  - Projected Labor Cost (from timesheet/actuals)
  - Projected Total Cost
  - Variance (Budget vs Projected)

- FR-3.6.1.3: System shall aggregate costs from room estimates to categories automatically
- FR-3.6.1.4: System shall calculate project totals for all columns
- FR-3.6.1.5: System shall highlight variances exceeding threshold (default: 10%)
- FR-3.6.1.6: System shall show variance indicators (over budget = red, under budget = green)

**Acceptance Criteria:**
- All costs aggregate correctly from estimates
- Calculations are accurate
- Variance highlighting works correctly
- Totals row calculates properly

#### 3.6.2 Change Order Management
**Priority:** Must Have  
**User Story:** As a project manager, I want to track change orders so that I can manage scope changes.

**Requirements:**
- FR-3.6.2.1: System shall support up to 4 change orders per project (expandable)
- FR-3.6.2.2: For each change order, system shall capture:
  - Change Order number (auto-generated)
  - Date
  - Description
  - Reason for change
  - Material cost impact
  - Labor cost impact
  - Total cost impact
  - Approval status
  - Approved by (user)
  - Approval date
  - Client signature (electronic)

- FR-3.6.2.3: System shall add change order costs to project totals
- FR-3.6.2.4: System shall show original budget vs budget with change orders
- FR-3.6.2.5: System shall support change order PDF generation
- FR-3.6.2.6: System shall require approval before adding to budget
- FR-3.6.2.7: System shall maintain change order history

**Acceptance Criteria:**
- Change orders create successfully
- Cost impacts calculate correctly
- Approval workflow functions properly
- Change orders affect budget only when approved
- PDF generation works correctly

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

- FR-3.7.1.2: System shall support line items with:
  - Item number (auto-increment)
  - Description
  - Quantity
  - Unit
  - Unit cost
  - Total cost (auto-calculated: Quantity × Unit Cost)
  - SKU/Product code
  - Notes

- FR-3.7.1.3: System shall allow adding items from:
  - Unit cost database (search and select)
  - Estimate line items (one-click add)
  - Manual entry

- FR-3.7.1.4: System shall calculate PO totals:
  - Subtotal
  - Tax (based on vendor tax rate or project region)
  - Shipping/Delivery fee
  - Grand Total

- FR-3.7.1.5: System shall support vendor integration fields:
  - Home Depot Pro Account ID
  - Vendor email for orders
  - Preferred store location

- FR-3.7.1.6: System shall allow saving PO as draft
- FR-3.7.1.7: System shall support PO templates for common orders

**Acceptance Criteria:**
- PO creates with all required fields
- Line items calculate correctly
- Items add from multiple sources
- PO saves as draft and can be edited
- Vendor information persists for future POs

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
  - Confirmed → Received
  - Any → Cancelled

- FR-3.7.2.3: System shall send email to vendor when PO is submitted (if email provided)
- FR-3.7.2.4: System shall generate PDF of PO for printing/emailing
- FR-3.7.2.5: System shall support partial receipt of PO (receive specific line items)
- FR-3.7.2.6: System shall link PO costs to Material Expense Tracker automatically
- FR-3.7.2.7: System shall show PO history and status changes

**Acceptance Criteria:**
- PO list displays all POs correctly
- Status transitions work as defined
- Email sends successfully to vendor
- PDF generates correctly
- Partial receiving updates quantities correctly
- Expenses link to POs automatically

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
  - Receipt upload (photo/PDF)
  - Notes

- FR-3.8.1.2: System shall support receipt photo upload from mobile
- FR-3.8.1.3: System shall auto-categorize expenses if linked to PO
- FR-3.8.1.4: System shall support bulk expense entry
- FR-3.8.1.5: System shall require approval for expenses over threshold (configurable)

**Acceptance Criteria:**
- Expense form submits successfully
- Receipt uploads and displays correctly
- PO linking works automatically
- Approval workflow triggers when needed

#### 3.8.2 Expense Tracking & Reporting
**Priority:** Must Have  
**User Story:** As an accounting manager, I want to see material expense reports so that I can reconcile spending.