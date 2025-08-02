export async function getAppointments(token) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
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

export async function updateAppointmentApi(token, id, updatedData) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/appointments/${id}`,
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

export async function createAppointmentApi(token, updatedData) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments/`, {
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
