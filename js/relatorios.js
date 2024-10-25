document.getElementById('excelBtn').addEventListener('click', function () {
    const table = document.getElementById('transactionTable').closest('table');
    const wb = XLSX.utils.table_to_book(table);
    XLSX.writeFile(wb, 'relatorio.xlsx');
});


document.getElementById('pdfBtn').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();


    const table = document.getElementById('transactionTable').closest('table');
    const headers = [...table.querySelectorAll('thead th')].map(th => th.innerText);
    const rows = [...table.querySelectorAll('tbody tr')].map(tr => {
        return [...tr.querySelectorAll('td')].map(td => td.innerText);
    });


    doc.autoTable({
        head: [headers],
        body: rows,
    });

    doc.save('relatorio.pdf');
});