/**
 * Downloads a file from a given URL in the browser.
 * @param {string} url - The file URL.
 * @param {string} [filename] - Optional filename for the downloaded file.
 */
export function downloadFile(url: string, filename: string) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || url.split("/").pop() || "download";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error("Download failed:", error);
    });
}
