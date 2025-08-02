export async function getServices(token) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/services`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
}

export async function updateServiceApi(token, id, updatedData) {
  console.log(updatedData);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/services/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  const data = await res.json();

  console.log(data);

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

  console.log(data);

  return data;
}
