import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaChartLine, FaFire, FaMapMarkerAlt } from "react-icons/fa";
import L from "leaflet";
import { safeInvalidateSize } from "@/leafletClientFix";
// react-leaflet typings mismatch causes TS errors for props in this repo.
// @ts-ignore keeps runtime behavior (live map) without blocking compilation.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";


type PostPoint = {
  _id?: string;
  city?: string;
  area?: string;
  count?: number;
  theme?: string;
  lat?: number;
  lng?: number;
};

const DHAKA = {
  lat: 23.8103,
  lng: 90.4125,
};

const DreamMap = () => {
  const [points, setPoints] = useState<PostPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalSignals = useMemo(() => {
    return (points.length ? points : []).reduce(
      (sum, p) => sum + (typeof p.count === "number" ? p.count : 1),
      0,
    );
  }, [points]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsLoading(true);

      try {
        const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";

        const res = await fetch(`${API_BASE_URL}/analytics/locations`);
        if (!res.ok) {
          throw new Error(`Failed to load locations: ${res.status}`);
        }

        const data = await res.json();

        // analytics/locations returns: { locationStats: [...] }
        // but keep fallback parsing in case backend changes.
        const locationStats: unknown[] =
          data?.locationStats ??
          (Array.isArray(data)
            ? data
            : Array.isArray(data?.locations)
              ? data.locations
              : Array.isArray(data?.data)
                ? data.data
                : []);

        const nextPoints: PostPoint[] = (locationStats as unknown[])
          .map((loc) => {
            const raw = loc as Record<string, unknown>;

            const lat =
              typeof raw.lat === "number" ? raw.lat : (raw.latitude as number);
            const lng =
              typeof raw.lng === "number" ? raw.lng : (raw.longitude as number);

            if (typeof lat !== "number" || typeof lng !== "number") return null;

            const count =
              typeof raw.count === "number" ? raw.count : Number(raw.count);
            if (typeof count !== "number" || Number.isNaN(count)) return null;

            return {
              _id: raw._id as string | undefined,
              city: raw.city as string | undefined,
              area: raw.area as string | undefined,
              theme: raw.theme as string | undefined,
              count,
              lat,
              lng,
            };
          })
          .filter(Boolean) as PostPoint[];

        if (cancelled) return;
        setPoints(nextPoints);
      } catch (e) {
        console.error("DreamMap fetch failed, using Dhaka fallback:", e);
        if (cancelled) return;

        setPoints([
          {
            lat: DHAKA.lat,
            lng: DHAKA.lng,
            city: "Dhaka",
            area: "Bangladesh",
            theme: "Dream activity",
            count: 0,
          },
        ]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  const center = useMemo(() => {
    if (!points.length) return [DHAKA.lat, DHAKA.lng] as [number, number];
    const p = points[0];
    return [p.lat ?? DHAKA.lat, p.lng ?? DHAKA.lng] as [number, number];
  }, [points]);

  // DivIcon (prevents leaflet default-marker bundler path issues)
  const markerIcon = useMemo(() => {
    const html = `
      <div style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;">
        <div style="width:28px;height:28px;border-radius:9999px;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.45);display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 576 512" width="14" height="14" fill="rgba(99,102,241,.85)">
            <path d="M288 32c-70.7 0-128 57.3-128 128 0 89.2 128 320 128 320s128-230.8 128-320c0-70.7-57.3-128-128-128zm0 180.3c-28 0-50.7-22.7-50.7-50.7s22.7-50.7 50.7-50.7 50.7 22.7 50.7 50.7-22.7 50.7-50.7 50.7z"/>
          </svg>
        </div>
      </div>
    `;

    return L.divIcon({
      html,
      className: "dreammap-divicon",
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  }, []);

  const displayedPoints = useMemo(() => {
    const fallback: PostPoint = {
      lat: DHAKA.lat,
      lng: DHAKA.lng,
      city: "Dhaka",
      area: "Bangladesh",
      theme: "Dream activity",
      count: 0,
    };

    const base = points.length ? points : [fallback];
    return base.slice(0, 6);
  }, [points]);

  return (
    <div className="min-h-screen bg-starfield pt-14">
      <main className="container mx-auto max-w-4xl px-4 py-8 page-enter">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-heading font-semibold mb-1">Dream Map</h1>
          <p className="text-sm text-muted-foreground">Dream locations</p>
        </motion.div>

        <div className="noctis-card p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div>
              <p className="text-sm font-heading font-medium text-foreground">
                Dream hotspots
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Based on post locations
              </p>
            </div>
            <div className="text-xs text-muted-foreground">
              {isLoading ? "Loading…" : `${totalSignals} signals`}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <FaFire className="h-3.5 w-3.5 text-primary/60" /> Most active
            </span>
            <span className="inline-flex items-center gap-2">
              <FaChartLine className="h-3.5 w-3.5 text-primary/60" /> Trending
            </span>
          </div>
        </div>

        <div className="noctis-card min-h-[420px] mb-8 overflow-hidden">
          <div className="relative">
            {/* explicit zoom buttons */}
            <div className="absolute z-[1000] right-3 top-3 flex flex-col gap-2">
              <button
                type="button"
                className="noctis-card h-9 w-9 flex items-center justify-center bg-background/70 backdrop-blur"
                aria-label="Zoom in"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).__dreammap_zoom_in?.();
                }}
              >
                +
              </button>
              <button
                type="button"
                className="noctis-card h-9 w-9 flex items-center justify-center bg-background/70 backdrop-blur"
                aria-label="Zoom out"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (window as any).__dreammap_zoom_out?.();
                }}
              >
                −
              </button>
            </div>

            <MapContainer
              {...({
                center,
                zoom: 7,
                scrollWheelZoom: false,
                style: { height: "420px", width: "100%" },
                whenCreated: (map: any) => {
                  (window as any).__dreammap_map = map;
                  safeInvalidateSize(map);
                },

                zoomControl: false,
              } as any)}
            >
              <TileLayer
                {...({
                  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                  attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                } as any)}
              />


              {!isLoading &&
                (points.length ? points : displayedPoints).map((p, i) => {
                  const label = `${p.city ?? ""}${
                    p.area
                      ? `${p.city ? ", " : ""}${p.area}`
                      : ""
                  }`.trim();

                  return (
                    // @ts-ignore
                    <Marker
                      key={`${p._id ?? ""}-${p.lat ?? ""}-${p.lng ?? ""}-${i}`}
                      position={[p.lat ?? DHAKA.lat, p.lng ?? DHAKA.lng]}
                      icon={markerIcon as any}
                    >
                      <Popup>
                        <div style={{ fontSize: 13, maxWidth: 240 }}>
                          <div style={{ fontWeight: 700, marginBottom: 4 }}>
                            {label || "Dream location"}
                          </div>
                          {p.theme ? (
                            <div style={{ opacity: 0.9, marginBottom: 6 }}>
                              {p.theme}
                            </div>
                          ) : null}
                          <div>
                            <b>{typeof p.count === "number" ? p.count : 0}</b>{" "}
                            signals
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
            </MapContainer>
          </div>
        </div>

        {/* Hotspot cards */}
        <div className="grid gap-3 sm:grid-cols-2">
          {displayedPoints.map((p, i) => {
            const label = `${p.city ?? ""}${
              p.area ? `${p.city ? ", " : ""}${p.area}` : ""
            }`.trim();

            return (
              <motion.div
                key={`${p._id ?? ""}-${p.city ?? ""}-${p.area ?? ""}-${p.lat ?? ""}-${p.lng ?? ""}-${i}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
                className="noctis-card p-4 flex items-start gap-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/8">
                  <FaMapMarkerAlt className="h-4 w-4 text-primary/60" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {label || "Dream location"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {p.theme || "Dream activity"}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs font-semibold text-foreground">
                    {typeof p.count === "number" ? p.count : 1}
                  </p>
                  <p className="text-[10px] text-muted-foreground">signals</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DreamMap;

