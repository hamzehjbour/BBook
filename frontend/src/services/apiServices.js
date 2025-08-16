export async function getServices({ token, sortService, search, page }) {
  const baseUrl = `${import.meta.env.VITE_API_URL}/services`;

  const params = new URLSearchParams();

  if (sortService) {
    params.set("sort", sortService.value);
  }

  if (search) {
    params.set("category", search.value);
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

export async function updateServiceApi(token, updatedData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/services/${updatedData.id}`,
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

export async function deleteServiceApi({ token, id }) {
  await fetch(`${import.meta.env.VITE_API_URL}/services/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createServiceApi(token, updatedData) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/services/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();

  return data;
}
