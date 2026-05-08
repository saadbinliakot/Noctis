# TODO — DreamMap rewrite (Leaflet → Font Awesome + card layout)

- [ ] Inspect and confirm current `src/pages/DreamMap.tsx` dependencies/types (missing imports like `useRef`, `useMemo`, `PostPoint`, `DHAKA`, `L`, etc.).
- [ ] Implement complete `src/pages/DreamMap.tsx` rewrite:
  - [ ] Remove Leaflet usage and all Leaflet helpers.
  - [ ] Use Font Awesome icons (via `react-icons/fa`) and a card/grid layout.
  - [ ] Fetch analytics locations (`/analytics/locations`) and normalize points.
  - [ ] Render:
    - [ ] Header + subtitle
    - [ ] Stats card (total signals)
    - [ ] Hotspot cards (top N)
  - [ ] Provide graceful fallback (Dhaka) if API fails or coordinates missing.
  - [ ] Ensure TypeScript correctness (define `PostPoint`, import hooks).
- [ ] Verify build/lint via `npm run lint` and `npm run build` (or `npm run dev` sanity check).

