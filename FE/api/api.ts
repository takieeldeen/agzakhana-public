export async function dummyPromise() {
  const test = new Promise((res) => {
    setTimeout(() => res({ myData: "s" }), 3000);
  });
  return test;
}
