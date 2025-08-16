export async function getAppointments({ token, filter, sort, page }) {
  const baseUrl = `${import.meta.env.VITE_API_URL}/appointments`;

  const params = new URLSearchParams();

  if (filter?.field === "status") {
    params.set("status", filter.value);
  }

  if (sort) {
    params.set("sort", sort.value);
  }

  if (page) {
    params.set("page", page);
  }

  const res = await fetch(`${baseUrl}?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
}

export async function deleteAppointmentApi({ token, id }) {
  await fetch(`${import.meta.env.VITE_API_URL}/appointments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateAppointmentApi(token, updatedData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/appointments/${updatedData.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    }
  );

  const data = await res.json();

  return data;
}

export async function createAppointmentApi(token, newData) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newData),
  });

  const data = await res.json();

  console.log(data);

  return data;
}

export async function downloadReport(token, duration) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/appointments/report?duration=${duration}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to download report");

  return await res.blob();
}
