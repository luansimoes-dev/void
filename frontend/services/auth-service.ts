async function saveCookie(jwt: string) {
  await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jwt }),
  });
}
export async function login(data: { email: string; password: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.status === 401 || response.status === 403) {
    throw {
      message: "email ou senha incorretos",
      status: response.status,
    };
  }

  if (response.status === 400 && "errors" in result) {
    throw {
      message: result.errors,
      status: response.status,
    };
  }

  if (!response.ok) {
    throw {
      message: "erro ao fazer login",
      status: response.status,
    };
  }

  await saveCookie(result.jwt);
  return result;
}
export async function logout() {
  await fetch("/api/auth/logout", {
    method: "DELETE",
  });
  window.location.href = "/login";
}
