export async function submitLead(type: string, data: Record<string, unknown>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, ...data }),
  });
  if (!res.ok) throw new Error("submit_failed");
  return res.json();
}
