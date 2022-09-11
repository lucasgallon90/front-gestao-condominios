import { format } from "date-fns";
import jsPDF from "jspdf";
import "jspdf-autotable";
export function exportPDF({ title, head = [], data = [], filename="export" }) {
  const doc = new jsPDF();
  // Header
  doc.setFontSize(20);
  doc.setTextColor(40);
  doc.text(title, 5, 22);

  // Dados
  doc.autoTable({
    showHead: "everyPage",
    startY: doc.pageCount > 1 ? doc.autoTableEndPosY() + 5 : 30,
    head: [head.map((h) => h.label)],
    body: data.map((row) => {
      return head.map((h) =>
        h.key.split(".").reduce((a, v) => {
          return !h.format ? a[v] : h.format(a[v]);
        }, row)
      );
    }),
  });
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const pages = doc.internal.getNumberOfPages();
  for (let j = 1; j < pages + 1; j++) {
    let horizontalPos = pageWidth - 10;
    let verticalPos = pageHeight - 5;
    doc.setPage(j);
    doc.setFontSize(8);
    doc.text(format(new Date(),"dd/MM/yy HH:mm"), horizontalPos, 5, { align: "right" });
    doc.setFontSize(12);
    doc.text(`${j} de ${pages}`, horizontalPos, verticalPos, { align: "right" });
  }
  doc.save(`${filename}.pdf`);
}
