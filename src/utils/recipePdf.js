import { jsPDF } from 'jspdf';

const GREEN = [61, 92, 58];
const LIGHT_GREEN = [184, 206, 174];
const INK = [60, 56, 52];
const MUTED = [150, 145, 140];

const ROLE_LABELS = { focal: 'Focal', secondary: 'Secondary', foliage: 'Foliage', filler: 'Filler' };

/**
 * Generate and download an A4 recipe sheet.
 * Loaded via dynamic import so jsPDF stays out of the main bundle.
 */
export function generateRecipePdf({ title, subtitle, recipe, cost, warnings, shareLink, filename }) {
  const doc = new jsPDF(); // A4 portrait, mm
  const W = 210;
  const M = 18;
  const retail = cost * 2.8;

  /* header band */
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, W, 40, 'F');
  doc.setTextColor(...LIGHT_GREEN);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('MY FLORISTRY HELPER  ·  ARRANGEMENT RECIPE', M, 14);
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text(title, M, 26);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(225, 232, 220);
  doc.text(subtitle, M, 34);

  let y = 52;
  const pageBreak = () => {
    if (y > 268) {
      doc.addPage();
      y = 24;
    }
  };

  /* stems by role */
  for (const role of Object.keys(ROLE_LABELS)) {
    const items = recipe[role];
    if (!items?.length) continue;
    pageBreak();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...GREEN);
    doc.text(ROLE_LABELS[role].toUpperCase(), M, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    for (const { flower, stems } of items) {
      pageBreak();
      doc.setTextColor(...INK);
      doc.text(flower.latin ? `${flower.common}  (${flower.latin})` : flower.common, M, y);
      doc.setFont('helvetica', 'bold');
      doc.text(`${stems} stems`, W - M, y, { align: 'right' });
      doc.setFont('helvetica', 'normal');
      y += 6.5;
    }
    y += 4;
  }

  /* totals */
  pageBreak();
  doc.setDrawColor(225, 220, 214);
  doc.line(M, y, W - M, y);
  y += 8;
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  doc.text('Total stems', M, y);
  doc.setTextColor(...INK);
  doc.text(String(recipe.total), W - M, y, { align: 'right' });
  y += 7;
  doc.setTextColor(...MUTED);
  doc.text('Wholesale estimate', M, y);
  doc.setTextColor(...INK);
  doc.text(`£${cost.toFixed(2)}`, W - M, y, { align: 'right' });
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...GREEN);
  doc.text('Suggested retail (×2.8)', M, y);
  doc.text(`£${retail.toFixed(2)}`, W - M, y, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  y += 12;

  /* care notes */
  if (warnings?.length) {
    pageBreak();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...GREEN);
    doc.text('CARE NOTES', M, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    for (const note of warnings) {
      const lines = doc.splitTextToSize(`•  ${note}`, W - M * 2);
      pageBreak();
      doc.text(lines, M, y);
      y += lines.length * 4.5 + 2.5;
    }
  }

  /* footer */
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  const generated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  doc.text(`Generated ${generated} with My Floristry Helper`, M, 285);
  if (shareLink) {
    doc.textWithLink('Open this recipe in the Arrangement Builder', M, 290, { url: shareLink });
  }

  doc.save(filename);
}
