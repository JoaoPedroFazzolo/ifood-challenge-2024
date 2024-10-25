const formasDePagamento = ['Crédito', 'Débito', 'Pix', 'Vale Alimentação', 'Vale Refeição'];
const myModal = document.getElementById('addOrderModalLabel');
const myInput = document.getElementById('editOrderModalLabel');


document.getElementById('saveOrderBtn').addEventListener('click', function () {
    const pagamento = document.getElementById('paymentMethod').value;
    const itens = document.getElementById('items').value;
    const pago = parseFloat(document.getElementById('totalPaid').value) || 0;
    const despesas = parseFloat(document.getElementById('totalExpense').value) || 0;
    const totalReceber = pago - despesas;

    const dataHorario = document.getElementById('orderDateTime').value;
    const data = new Date(dataHorario);
    const formattedDate = data.toLocaleDateString('pt-BR', {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit'
    });
    const formattedTime = data.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    const dataNova = `${formattedDate}, ${formattedTime}`;


    if (isNaN(pagamento) || !pago || !despesas || !totalReceber || !dataHorario) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }


    const tableBody = document.getElementById('transactionTable');
    const id = Math.floor(Math.random() * 9000) + 1000;
    const clientId = tableBody.children.length + 1;
    const newRow = document.createElement('tr');


    newRow.innerHTML = `
        <td>${id}</td>
        <td>${clientId}</td>
        <td>${formasDePagamento[pagamento - 1]}</td>
        <td>${itens}</td>
        <td>R$${pago},00</td>
        <td>R$${despesas},00</td>
        <td>R$${totalReceber},00</td>
        <td>${dataNova}</td>
    `;


    tableBody.appendChild(newRow);


    const addOrderModal = new bootstrap.Modal(document.getElementById('addOrderModal'));
    addOrderModal.hide();


    document.getElementById('addOrderForm').reset();
});


myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus();
});


document.addEventListener('DOMContentLoaded', function () {
    const updateOrderBtn = document.getElementById('updateOrderBtn');

    updateOrderBtn.addEventListener('click', function () {

        const orderId = document.getElementById('editOrderId').value;
        const totalPaid = document.getElementById('editTotalPaid').value;
        const totalExpense = document.getElementById('editTotalExpense').value;


        if (!orderId) {
            alert('Por favor, insira o ID do Pedido.');
            return;
        }


        const tableBody = document.querySelector('#transactionTable');
        const rows = tableBody.querySelectorAll('tr');
        let rowToUpdate = null;

        rows.forEach(row => {
            if (row.cells[0].textContent === orderId) {
                rowToUpdate = row;
            }
        });

        if (rowToUpdate) {

            rowToUpdate.cells[4].textContent = `R$${parseFloat(totalPaid)},00`;
            rowToUpdate.cells[5].textContent = `R$${parseFloat(totalExpense)},00`;
            const difference = parseFloat(totalPaid) - parseFloat(totalExpense);
            rowToUpdate.cells[6].textContent = `R$${parseFloat(difference)},00`;

            document.getElementById('editOrderForm').reset();
        } else {
            alert('Pedido não encontrado.');

            document.getElementById('editOrderForm').reset();
        }
    });
});

function findOrderRowById(orderId) {
    const rows = document.querySelectorAll('tbody tr');
    return Array.from(rows).find(row => row.firstElementChild.textContent.trim() === orderId);
}


const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', function () {
    const filter = searchInput.value.trim().toLowerCase();
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(function (row) {
        let rowMatches = false;


        row.querySelectorAll('td').forEach(function (cell) {
            const cellText = cell.textContent.trim().toLowerCase();
            if (cellText.includes(filter)) {
                rowMatches = true;
            }
        });


        row.style.display = rowMatches ? '' : 'none';
    });
});