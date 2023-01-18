const fetcher = async (
  url: string,
  data: { email: string; password: string }
) => {
  const res = await fetch(`${window.location.origin}/api/${url}`, {
    method: data ? "POST" : "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.status > 299 || res.status < 200) {
    throw new Error();
  }

  return res.json();
};

export default fetcher;
