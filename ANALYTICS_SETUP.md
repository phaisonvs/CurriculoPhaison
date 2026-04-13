# GTM Analytics Setup for the Resume

## What you need

- A Google account
- A Google Analytics 4 property
- A Google Tag Manager web container

## What this site sends

- `resume_page_view`
- `resume_section_view`
- `resume_email_modal_open`
- `resume_contact_click`
- `resume_print_click`
- `resume_scroll_depth`
- `resume_time_on_page_30s`
- `resume_time_on_page_60s`
- `resume_time_on_page_120s`
- `resume_time_on_page_300s`
- `resume_time_on_page_600s`

## What to create in Google

1. Create a GA4 property for the resume.
2. Create a GTM Web container and connect it to the site.
3. In GTM, create these items:
   - 1 GA4 Configuration tag
   - 1 Custom Event trigger for `resume_event`
   - 1 GA4 Event tag that uses `event_name` as the event name
   - Data Layer variables for `event_name`, `section_name`, `contact_method`, `placement`, `scroll_depth`, and `scroll_bucket`
   - No extra Data Layer variables are required for the time-on-page events if you keep the minimal payload
4. In GA4, register custom dimensions for:
   - `section_name`
   - `contact_method`
   - `placement`
   - `scroll_bucket`
   - No extra custom dimensions are required for the time-on-page events

## What to put in the app

Add these environment variables:

- `VITE_GTM_ID`
- `VITE_GA4_MEASUREMENT_ID`

For local development, put them in `.env.local`.

## GitHub Pages / Actions

Add the same values in:

- `Settings > Secrets and variables > Actions`

The build workflow will read them during deploy.

## Important behavior

- If `VITE_GTM_ID` exists, the app loads GTM.
- If GTM is missing but `VITE_GA4_MEASUREMENT_ID` exists, the app falls back to direct GA4.
- If no env values exist, tracking stays off.
- PDF generation disables analytics automatically so CI builds do not pollute your data.
- For manual testing, you can append `?disable_tracking=1` to the URL to force analytics off.
- Time-on-page events count only while the tab is visible.
- Each time-on-page threshold fires at most once per page load.

## How to test

1. Open the site with GTM Preview / Tag Assistant.
2. Click:
   - email
   - WhatsApp
   - LinkedIn
   - print
3. Confirm the email flow splits into:
   - `resume_email_modal_open` when the modal opens
   - `resume_contact_click` with `contact_method=email` when Gmail or Outlook is chosen
4. Scroll through the page and confirm the section and scroll events fire once.
5. Keep the tab visible and confirm the time-on-page events fire once at:
   - 30 seconds
   - 60 seconds
   - 120 seconds
   - 300 seconds
   - 600 seconds
6. Switch to another tab and back to confirm the timer pauses while hidden.
7. Check GA4 DebugView for the event stream.

## Success criteria

- No duplicate `page_view`
- No PII in event parameters
- Events arrive in GA4 with the expected names and properties
- GitHub Pages still deploys normally
