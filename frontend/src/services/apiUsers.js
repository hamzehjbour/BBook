export async function getUsers({ token, search, page }) {
  const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

  const params = new URLSearchParams();

  if (search) {
    params.set("name", search.value);
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

export async function getStaff(token) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users?role=staff`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  return data;
}

export async function deleteUserApi({ token, id }) {
  await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createUserApi(token, newUser) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newUser),
  });

  const data = await res.json();

  return data;
}
