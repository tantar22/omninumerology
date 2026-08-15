'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useT } from '@/lib/i18n-client';

interface PdfReportButtonProps {
  /** DOM id of the element to snapshot into the PDF. */
  targetId?: string;
  disabled?: boolean;
}

/**
 * One-click PDF download. Renders a DOM node to a canvas (via html2canvas) so
 * that Devanagari text is captured exactly as displayed, then slices the image
 * across A4 pages with jsPDF.
 */
export function PdfReportButton({ targetId = 'omni-report', disabled }: PdfReportButtonProps) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setError(null);
    setBusy(true);
    try {
      const el = document.getElementById(targetId);
      if (!el) {
        throw new Error(`Report node #${targetId} not found`);
      }

      const { default: html2canvas } = await import('html2canvas');
      const jsPdfModule = await import('jspdf');
      const jsPDF = (jsPdfModule.jsPDF ?? jsPdfModule.default) as typeof import('jspdf').jsPDF;

      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: '#0A0B10',
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('omninumerology-report.pdf');
    } catch (err) {
      setError((err as Error).message || t('pdf.error'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <Button type="button" variant="outline" size="sm" onClick={generate} disabled={disabled || busy}>
        {busy ? t('pdf.generating') : t('pdf.download')}
      </Button>
      {error && <span className="text-xs text-celestial-rose">{error}</span>}
    </div>
  );
}
