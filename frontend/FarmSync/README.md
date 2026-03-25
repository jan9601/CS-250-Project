# FarmSync Frontend

## Overview

This frontend is the Farmer-side implementation of **FarmSync**, a web application designed to help local farmers manage crops, view marketplace listings, and monitor harvest-related insights through a dashboard.

The current frontend was built with a **feature-based architecture** and uses **mock/localStorage data** while the backend integration is still pending. The goal of this implementation was to complete the core **Farmer view** first, so that the next team can continue from a stable and reusable frontend foundation.

At the moment, the frontend includes:

- A **Dashboard** with summary cards, charts, and upcoming harvest information
- A full **Crops** management page with CRUD flow
- A **Marketplace** page with card-based listing UI and listing detail modal
- Reusable UI primitives such as **Button**, **Modal**, **Filter**, **Sort**, **Pagination**, and form components
- Local mock prediction behavior while the real AI/backend pipeline is not yet connected

---

## Current Scope

### Implemented
- Farmer dashboard
- Crops CRUD
- Marketplace UI
- Dashboard statistics and charts
- Sorting and filtering
- Pagination
- Modal system
- Mock prediction flow using frontend helpers
- Local storage persistence
- Reusable UI component structure

### Not yet implemented
- Full backend API integration
- Authentication and route protection in the frontend
- Buyer/customer-specific UI flow
- Cart / checkout flow
- Full responsive design for smaller screens
- Automated frontend tests

---

## Tech Stack

This frontend uses:

- **React**
- **Vite**
- **React Router**
- **@tanstack/react-query**
- **react-hook-form**
- **react-hot-toast**
- **react-icons**
- **Recharts**
- **Tailwind CSS**
- Native browser APIs such as:
  - `localStorage`
  - `Date`
  - `Intl.DateTimeFormat`

> Exact dependency versions should be checked in `package.json`.

---

## Project Structure

```txt
src/
  assets/
  features/
    crops/
    dashboard/
    marketplace/
  hooks/
    useOutsideClick.js
  pages/
    Crops.jsx
    Dashboard.jsx
    Marketplace.jsx
    PageNotFound.jsx
  services/
    cropsApi.js
    seedCrops.js
    storage.js
  ui/
    AppLayout.jsx
    Button.jsx
    ConfirmDelete.jsx
    Filter.jsx
    FormRow.jsx
    Header.jsx
    Heading.jsx
    Input.jsx
    Logo.jsx
    MainNav.jsx
    Modal.jsx
    NavItem.jsx
    Pagination.jsx
    Row.jsx
    Select.jsx
    Sidebar.jsx
    SortBy.jsx
  utils/
    formatStatus.js
    helpers.js
    mockPrediction.js
  App.jsx
  index.css
  main.jsx
```
---
## FrontEnd Architecture
The frontend follows a feature-based organization, inspired by the structure used in the Wild Oasis project.

**Main idea**

The codebase is split into clear layers:

- pages/
  Route-level pages such as Dashboard, Crops, and Marketplace.
- features/
  Domain-specific logic and UI grouped by feature:
  - crops
  - dashboard
  - marketplace

- ui/
Reusable, shared components used across the application.

- services/
Local mock API and persistence layer.

- utils/
Pure helper functions for formatting, prediction mocks, and data transformation.

- hooks/
Reusable custom hooks.

This structure is important because it makes the app easier to scale and easier for the next team to continue without rewriting everything.

---

## Entry Files
`main.jsx`
Bootstraps the React app and renders <App /> inside StrictMode.

`App.jsx`
Sets up:
- `QueryClientProvider`
- `ReactQueryDevtools`
- `BrowserRouter`
- Application routes
- `Toaster` for notifications

Routes currently available:
- `/dashboard`
- `/crops`
- `/marketplace`

The root path redirects to `/dashboard`.

---

## Global Styling
`index.css`
This file contains the global design tokens and shared CSS utilities.

**Theme tokens**
The project uses Tailwind with custom theme variables such as:
- Brand colors
- Action colors
- Accent colors
- Status colors
- Background/surface/border/text colors

Examples:
```
--color-brand-primary
--color-action-primary
--color-accent-harvest
--color-success
--color-info
--color-surface
--color-border
```
These are used throughout the app to keep the visual language consistent.

**Shared layout helpers**
This file also defines:
```
.layout-grid
.loader
.crops-row-header
.crops-row
.form-row
```
Those classes are intentionally kept in CSS because they represent repeated layout patterns that were easier to stabilize outside of utility-only styling.

---

## Routing and Layout
`ui/AppLayout.jsx`
This component defines the main application shell.
It is expected to contain:
- Sidebar
- Header
- Main content area using `<Outlet />`

`ui/Sidebar.jsx`
Main navigation sidebar for the Farmer view.

`ui/Header.jsx`
Top-level page header area.

`ui/MainNav.jsx` / `ui/NavItem.jsx`
Navigation structure and items.

`ui/Logo.jsx`
Displays the FarmSync branding.

---

## Feature: Crops

The **Crops** feature is the main management interface for farmers.

**Goal**
Allow the farmer to:
- view all crops
- create new crops
- edit crops
- delete crops
- sort crops
- filter crops
- paginate through crops

**Important files**
`features/crops/CropsTable.jsx`
Displays the crop list in a table-like layout.

Responsibilities:
- gets crop data through `useCrops`
- applies filter
- applies sort
- applies pagination
- renders `CropsRow`

`features/crops/CropsRow.jsx`
Represents one crop row in the table.

Typically displays:
- crop name
- predicted harvest date
- confidence score
- price
- quantity
- status
- actions

`features/crops/AddCrop.jsx`
Responsible for opening the crop creation form inside the shared modal system.

`features/crops/CreateCropForm.jsx`
Create/edit crop form.

This form is built with:
- `react-hook-form`
- shared `Input`
- shared `FormRow`
- shared `Button`

It supports:
- crop creation
- crop editing
- validation
- resetting on success

**Hooks**
- `useCrops.js`
- `useCreateCrop.js`
- `useUpdateCrop.js`
- `useDeleteCrop.js`

These hooks wrap React Query mutations and queries for crop operations.

`features/crops/CropsTableOperations.jsx`
Top controls for the Crops page, usually holding:
- `Filter`
- `SortBy`

---

## Feature: Marketplace
The **Marketplace** was intentionally designed as a catalog/listing experience, not as a management table.

**Design decision**
The Marketplace uses **cards**, not rows, because it should feel like a product-browsing interface.

**Goal**
Provide a listing view that can later support both:
- Farmer preview mode
- Buyer/customer browsing mode

**Current behavior**
At this stage:
- Marketplace listings can be viewed
- The user can open View Listing
- Listing details are shown in a modal

**Future intention**
The same marketplace structure was designed so that later:
- Farmer can preview listings
- Buyer can preview listings and add them to cart

**Important files**

`features/marketplace/MarketplaceLayout.jsx`
Main page-level layout for the marketplace.

`features/marketplace/MarketplaceGrid.jsx`
Displays crop cards in a responsive grid.

`features/marketplace/CropsCard.jsx`
Single crop listing card used in the Marketplace.

Shows core commercial information:
- crop type / name
- location
- predicted harvest date
- quantity
- status
- price

`features/marketplace/ListingDetails.jsx`
Modal content shown when opening `View Listing`.

Used to display more complete information about a crop listing.

---

## Feature: Dashboard
The dashboard was designed to answer the question:

> What does the farmer need to know immediately when opening the app?

**Current dashboard sections**
- Summary stat cards
- Harvest timeline chart
- Crop status pie chart
- Upcoming harvest list

**Important files**
`features/dashboard/DashboardLayout.jsx`
Main dashboard assembly component.

**Uses:**
- `useDashboardData`
- `Stats`
- `HarvestTimelineChart`
- `CropsStatusChart`
- `UpcomingHarvests`

`features/dashboard/useDashboardData.js`
Custom hook that prepares all dashboard data.

Combines:
- data fetching from `useCrops`
- transformations from `dashboardData.js`
This keeps the dashboard components cleaner.

`features/dashboard/dashboardData.js`
Pure helper functions used to transform crop arrays into dashboard-specific data.

Includes:
- `getDashboardStats(crops)`
- `getHarvestTimelineData(crops)`
- `getCropsByStatusData(crops)`
- `getUpcomingCrops(crops)`

`features/dashboard/Stats.jsx`
Wrapper or layout component for all stat cards.

`features/dashboard/Stat.jsx`
Single stat card component.

Used for:
- total crops
- total quantity
- inventory value
- harvest soon count

`features/dashboard/HarvestTimelineChart.jsx`
Displays crop harvest data over time using Recharts.

`features/dashboard/CropsStatusChart.jsx`
Displays crop distribution by status using Recharts pie chart.

`features/dashboard/UpcomingHarvests.jsx`
Shows the next crops approaching harvest.

---

## Reusable UI Components
`ui/Button.jsx`
Reusable button component.

Supports:
- size variations
- style variations
- shared interaction patterns

Used throughout the app for:
- forms
- modals
- actions
- controls

`ui/Modal.jsx`
Reusable modal system built using:
- React Context
- compound component pattern
- React Portal
- outside click behavior

Main API:
```
<Modal>
  <Modal.Open opens="window-name">
    <Button>Open modal</Button>
  </Modal.Open>

  <Modal.Window name="window-name">
    <SomeComponent />
  </Modal.Window>
</Modal>
```

Important notes:
- `Modal.Open` and `Modal.Window` must share the same name key
- `Modal.Window` injects `onCloseModal` into its child component
- modal content is rendered using `createPortal(document.body)`

`ui/ConfirmDelete.jsx`
Reusable confirmation dialog.

Used before destructive actions such as crop deletion.

`ui/Filter.jsx`
Reusable filter control using useSearchParams.

`ui/SortBy.jsx`
Reusable sort control using useSearchParams.

`ui/Select.jsx`
Shared select input wrapper.

`ui/Pagination.jsx`
Reusable pagination component.

Used to paginate lists in:
- Crops table
- Marketplace

`ui/FormRow.jsx`
Shared layout row for forms.

`ui/Input.jsx`
Shared input styling wrapper.

`ui/Heading.jsx`
Reusable heading component used across pages and cards.

---

## Data Layer and Mock API
Because the real backend integration is not complete yet, the frontend currently uses a local mock API built on top of `localStorage`.

`services/storage.js`
Handles reading and writing from local storage.

`services/seedCrops.js`
Provides the initial crops dataset when local storage is empty.

`services/cropsApi.js`
Main mock service layer for crop operations.

Includes:
- `initCrops()`
- `getCrops()`
- `deleteCrop(id)`
- `createCrop(crop)`
- `updateExistingCrop(updatedCrop, id)`

### How it works
When the app starts and no crop data is found:
- `initCrops()` seeds the local storage with seedCrops

After that:
- all changes are persisted in localStorage
- data survives refreshes unless storage is manually cleared

---

## Prediction Mocking While Backend Is Pending
### Why this exists
The backend prediction service is not fully integrated into the frontend yet.

To allow the UI to behave realistically in the meantime, crop prediction fields are generated locally.

### Related file
`utils/mockPrediction.js`

### Fields generated locally
When a crop is created or edited, the following fields are derived:
- predictedHarvestDate
- confidenceScore
- status

### Where this happens
Inside `services/cropsApi.js`:
- on `createCrop`
- on `updateExistingCrop` 

This ensures the UI stays synchronized even when the user edits prediction-related fields such as planting date.

### Why this matters
This mock layer lets the frontend:
- display realistic crop cards
- populate dashboard stats
- feed the marketplace
- show chart data
without waiting for backend integration.

---

## Date Handling
Date handling is an important part of this frontend.

### Raw storage format

Dates are stored as strings, usually in ISO-like format such as:
`2026-04-10`

This applies to:
- plantingDate
- predictedHarvestDate

### Why strings are used
They are:
- easy to store in `localStorage`
- easy to compare after conversion
- easy to format for display

### Where dates are used
Dates are heavily used in:
- crop prediction mock logic
- sorting crops by harvest
- filtering upcoming crops
- dashboard timeline chart
- upcoming harvest list

### How they are processed
The frontend uses native JavaScript date handling:
- `new Date(...)`
- `Intl.DateTimeFormat(...)`

### Example uses
- sorting by harvest date
- checking whether a crop is future or harvest soon
- formatting chart dates like `Apr 10`
- formatting upcoming harvest dates in dashboard cards

### Important note for next team
The project currently uses native date utilities instead of an external date library such as `date-fns`. This keeps the frontend lighter and is sufficient for the current scope.

If the next team expands date-heavy workflows significantly, adding a dedicated date library may become useful.

--- 

## Formatting Helpers
`utils/formatStatus.js`
Used to convert raw status strings into UI-friendly labels.

### Example:
- `HARVEST_SOON` → `Harvest soon`

This helper is used in:
- cards
- dashboard pie chart
- upcoming harvest list
- crop rows

`utils/helpers.js`
General helper file.

### Currency formatting
The frontend also uses a currency formatting helper for inventory value and similar metrics.

--- 

### React Query Usage

The app uses **React Query** for crop data fetching and mutations.

### Query client
Configured in `App.jsx`.

### Current behavior
- `staleTime: 0`
- this means data becomes stale immediately and can be refetched

### Why React Query is useful here
Even though the app still uses localStorage:
- it keeps the data flow similar to real API usage
- makes backend integration easier later
- centralizes mutation success/error behavior

### Devtools
`ReactQueryDevtools` is enabled for debugging.

--- 

## Toast Notifications

The app uses `react-hot-toast` for success and error feedback.

Configured globally in `App.jsx`.

Used for:
- create success
- update success
- delete success
- mutation errors

---

## Filtering, Sorting, and Pagination
These controls are implemented on the frontend side.

### Current strategy
The frontend loads the crop data first, then applies transformations in this order:
1. Filter
2. Sort
3. Paginate

This order is important.

### Why this order matters
If pagination were applied before filter/sort, users would get inconsistent or confusing results.

### Filter
Currently used to filter crops by status.

### Sort
Currently used for fields such as:
- harvest date
-price
- quantity
- confidence score

### Pagination
Implemented as a reusable UI component using URL search params.
This avoids long scrolling lists in:
- Crops table
- Marketplace

### Current note
Pagination is currently frontend-side, not API-side. This was intentional because the data source is still localStorage/mock-based.

--- 

## Charts
The dashboard uses **Recharts**.

### Harvest timeline chart
Displays crop data over time.
Uses transformed data from:

- `getHarvestTimelineData(crops)`

### Crop status pie chart
Displays distribution of crops by status.
Uses transformed data from:
- `getCropsByStatusData(crops)`

### Why charts were chosen
Charts help the farmer immediately understand:
- what is coming next
- how crop states are distributed
- how inventory evolves over time

---

## Current Design Decisions

### Marketplace uses cards, not table
This was intentional.

- Crops page = management
- Marketplace page = browsing/catalog
Using cards makes the marketplace feel more like a product view and less like internal admin data.

### Dashboard balances overview and action

The dashboard was designed to include:
- high-level stats
- time-based chart
- status-based chart
- actionable upcoming harvest list

### Modal system is reusable
The modal was built as a shared UI primitive so the next team can reuse it for:
- crop forms
- delete confirmation
- marketplace detail view
- future buyer flows

### Desktop-first implementation
The frontend was primarily built for desktop use first.
Responsive behavior has not been fully completed yet.

---

## Known Frontend Limitations
The next team should be aware of the following:

### 1. Backend integration is not finished
The frontend still relies heavily on:
- localStorage
- seed data
- mock prediction helpers

### 2. Buyer/customer flow is not implemented
The marketplace structure supports future buyer behavior, but customer-side actions are not completed yet.

### 3. Role-based rendering is not finished
The app is currently strongest on the Farmer side.

### 4. Responsiveness is incomplete
The UI is mainly optimized for desktop.
Smaller screen support should be improved.

### 5. No automated frontend test suite yet
Testing has mostly been manual so far.

---

## How to Run the Frontend
### Install dependencies
`npm install`

### Start development server
`npm run dev`
Then open the local Vite URL in the browser.

---

### Manual Testing Suggestions
Recommended manual test flow:

### Dashboard
- Check stat card values
- Check line chart rendering
- Check pie chart rendering
- Check upcoming harvest list

### Crops
- Create a crop
- Edit a crop
- Delete a crop
- Validate sorting
- Validate filtering
- Validate pagination

### Marketplace
- Open crop cards
- Open listing modal
- Validate pagination
- Check status display

### LocalStorage
- Refresh page to confirm persistence

---

## Handoff Guide for the Next Team
This section is intentionally detailed because the next team may not be deeply familiar with the existing frontend structure.

---

## Where to Start
### Step 1 — Understand the existing data flow
Before changing components, understand this chain:
- `services/cropsApi.js`
local data source

- `features/crops/useCrops.js`
crop query hook

- `features/dashboard/useDashboardData.js`
dashboard data orchestration

- `features/dashboard/dashboardData.js`
pure transformation helpers

This is the core of how the current frontend works.

---

## Step 2 — Do not rewrite the UI structure first
The project already has a reusable component structure.

Before building anything new:
- check whether a shared component already exists in `ui/`
- reuse existing primitives whenever possible

Especially reuse:
- Button
- Modal
- ConfirmDelete
- Filter
- SortBy
- Pagination
- Input
- FormRow
- Heading

This will make the frontend much easier to scale.

---

## Step 3 — Integrate backend gradually
Do not try to replace everything at once.

Recommended order:

### 3.1 Replace crop data source first
Start by connecting:
- getCrops
- createCrop
- updateExistingCrop
- deleteCrop
to real backend endpoints.

Once that works, the rest of the UI will already benefit.

### 3.2 Replace mock prediction fields
After crop CRUD is connected, replace local prediction generation with backend prediction results.

Currently the frontend generates:
- `predictedHarvestDate`
- `confidenceScore`
- `status`

Those should eventually come from backend/AI integration instead.

### 3.3 Validate dashboard after backend integration
Because the dashboard depends entirely on crop data, once the crop API is real:
- stats
- timeline chart
- pie chart
- upcoming harvests

should all automatically reflect the backend data.

--- 

## Step 4 — Add role-based behavior
Once authentication and roles are available in the frontend:

### Farmer
Should continue to have:
- dashboard
- crop management
- listing preview

### Customer / Buyer
Should eventually have:
- marketplace browsing
- add to cart
- checkout / order flow
- contact / shipping workflow if required by the project scope
The marketplace was intentionally built so both roles can share the same base listing structure.

---

## Step 5 — Improve responsiveness
The current UI is primarily desktop-first.

Recommended areas to improve:
- sidebar Component
- dashboard grid
- marketplace card grid
- crop table behavior on smaller screens
- modal widths
- pagination layout
- chart responsiveness and label spacing

Start with:
- tablet
- then mobile

Do this after backend integration, not before.

--- 

## Step 6 — Add frontend tests if time allows
The current frontend can benefit from:
- form validation tests
- crop CRUD flow tests
- dashboard transformation tests
- modal behavior tests

If the next team has time, the best place to start is:
- pure helpers in `dashboardData.js`
- status formatting helpers
- crop prediction helper replacements

---

## Step 7 — Keep comments in important files

Some important files already have comments, especially:
- `Modal.jsx`
- `dashboardData.js`
- `cropsApi.js`

Continue this pattern.

Write comments for:
- file purpose
- important flow assumptions
- handoff notes

Avoid line-by-line comments unless truly necessary.

---

## Recommended Integration Plan
If the next team wants a clean plan, follow this sequence:

### Phase 1 — Understand and stabilize
**1.** Run the frontend\
**2.** Understand routes\
**3.** Understand crops data flow\
**4.** Test current Farmer flow

### Phase 2 — Integrate real data
**5.** Replace local crop API with backend endpoints\
**6.** Keep React Query hooks\
**7.** Remove or reduce localStorage dependency

### Phase 3 — Replace mock prediction
**8.** Connect real backend prediction results\
**9.** Remove frontend-only prediction assumptions where necessary

### Phase 4 — Add buyer functionality
**10.** Implement buyer/customer role rendering\
**11.** Add cart or order flow\
**12.** Extend marketplace actions

### Phase 5 — Polish
**13.** Improve responsive layout\
**14.** Add automated tests\
**15.** Refine accessibility and empty/loading states if needed

---

## Files the Next Team Should Read First
If the next team is unsure where to begin, read these files in this order:\
**1.** `App.jsx`\
**2.** `ui/AppLayout.jsx`\
**3.** `services/cropsApi.js`\
**4.** `features/crops/useCrops.js`\
**5.** `features/crops/CropsTable.jsx`\
**6.** `features/crops/CreateCropForm.jsx`\
**7.** `ui/Modal.jsx`\
**8.** `features/dashboard/useDashboardData.js`\
**9.** `features/dashboard/dashboardData.js`\
**10.** `features/marketplace/CropsCard.jsx`

This order helps understand the app from top-level structure down into the core data flow.

---

## Summary
This frontend was built to provide a strong Farmer-side foundation for FarmSync.

Its main strengths are:
- clean feature separation
- reusable UI system
- stable local mock data layer
- charts and dashboard summaries
- modal-based flows
- extensibility for the next team

The most important next step is **backend integration**, not redesign.

If the next team reuses the current structure instead of rebuilding it, they should be able to expand the project much faster and more safely.
