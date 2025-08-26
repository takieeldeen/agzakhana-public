export async function getAllProducts(
  page: string | undefined,
  limit: string | undefined,
  category: string | undefined
) {
  try {
    const endpoint = new URL("http://localhost:8080/api/v1/products");
    endpoint.searchParams.append("page", page ?? "1");
    endpoint.searchParams.append("limit", limit ?? "20");
    if (category) endpoint.searchParams.append("category", category);
    let res = await fetch(endpoint);
    res = await res.json();
    const { content, results, status } = res as any;
    return { content, results, status };
  } catch (err) {
    console.log(err);
    return { content: [], results: 0, status: "fail" };
  }
}
