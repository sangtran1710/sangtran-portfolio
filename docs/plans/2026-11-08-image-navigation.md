# Image loading and navigation plan

Approved scope: use a 6px entrance with a short fade on route changes. Keep current study content until all images for the requested study have decoded. Latest request wins when switching quickly. Preserve reduced motion and current credits.

1. Add slow-image regression tests for study switches and static thumbnail previews.
2. Generate reproducible responsive WebP thumbnails and tiny previews from local source assets using existing sharp.
3. Use the generated variants on project cards. Keep original media as fallback.
4. Gate study and pass updates on image decode, retaining current content on load failure. Warm images on focus or hover.
5. Verify slow loading, rapid switching, responsive screenshots, E2E, lint and clean build. Restart localhost.
