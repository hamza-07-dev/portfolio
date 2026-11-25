const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Erreur API (${res.status})`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  getProjects: () => request("/projects"),
  getSkills: () => request("/skills"),
  sendContact: (data) =>
    request("/contact", { method: "POST", body: JSON.stringify(data) }),
  track: (type, path, meta) =>
    request("/analytics/track", {
      method: "POST",
      body: JSON.stringify({ type, path, meta }),
    }).catch(() => {}), // tracking never blocks the UI
};
