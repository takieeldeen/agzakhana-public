import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const outputFile = path.resolve("medicines.csv");

// UTF-8 BOM + header
const BOM = "\uFEFF";
fs.writeFileSync(
  outputFile,
  BOM + "nameAr,nameEn,price,imageUrl,link\n",
  "utf8"  
);

// Escape for CSV
const escapeCsv = (v) =>
  `"${(v || "").replace(/"/g, '""').replace(/\r?\n/g, " ").trim()}"`;

const appendToCSV = (rows) => {
  const lines = rows
    .map(({ name_ar, name_en, price, image, link }) =>
      [name_ar, name_en, price, image, link].map(escapeCsv).join(",")
    )
    .join("\n");
  fs.appendFileSync(outputFile, lines + "\n", "utf8");
};

const browser = await puppeteer.launch({ headless: true });
const pageAr = await browser.newPage();
const pageEn = await browser.newPage();

// Force correct languages
await pageAr.setExtraHTTPHeaders({
  "Accept-Language": "ar-EG,ar;q=0.9,en;q=0.8",
});
await pageEn.setExtraHTTPHeaders({
  "Accept-Language": "en-US,en;q=0.9,ar;q=0.8",
});

for (let pageNum = 1; pageNum <= 15; pageNum++) {
  const urlAr = `https://chefaa.com/eg-ar/now/category/medications?page=${pageNum}`;
  const urlEn = `https://chefaa.com/eg-en/now/category/medications?page=${pageNum}`;

  console.log(`🧭 Scraping page ${pageNum}...`);

  // Scrape Arabic
  await pageAr.goto(urlAr, { waitUntil: "networkidle2" });
  await pageAr.waitForSelector(".row.products-col", { timeout: 15000 });

  const medicinesAr = await pageAr.$$eval(".item_content", (products) =>
    products.map((product) => ({
      name_ar:
        product.querySelector("[itemprop=name]")?.textContent?.trim() || "",
      price:
        product.querySelector("[itemprop=price]")?.textContent?.trim() || "",
      image:
        product.querySelector("img")?.getAttribute("data-src") ||
        product.querySelector("img")?.src ||
        "",
      link: product.querySelector("[itemprop=url]")?.href || "",
    }))
  );

  // Scrape English (same page number)
  await pageEn.goto(urlEn, { waitUntil: "networkidle2" });
  await pageEn.waitForSelector(".row.products-col", { timeout: 15000 });

  const medicinesEn = await pageEn.$$eval(".item_content", (products) =>
    products.map((product) => ({
      name_en:
        product.querySelector("[itemprop=name]")?.textContent?.trim() || "",
    }))
  );

  // Combine Arabic + English by index
  const combined = medicinesAr.map((item, i) => ({
    ...item,
    name_en: medicinesEn[i]?.name_en || "",
  }));

  appendToCSV(combined);
  console.log(`✅ Page ${pageNum}: ${combined.length} items`);
}

await browser.close();
console.log(`🎉 Done! Saved to ${outputFile}`);
