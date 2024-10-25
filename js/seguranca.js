
const roles = ['Financeiro', 'Cardapio', 'Administrador', 'Atendimento'];
const myModal = document.getElementById('addEmployeeModalLabel')
const myInput = document.getElementById('editEmployeeModalLabel')


document.getElementById('saveEmployeeBtn').addEventListener('click', function () {
    const nome = document.getElementById('employeeName').value;
    const role = parseInt(document.getElementById('employeeRole').value);
    const dataEntrada = document.getElementById('employeeDate').value;
    const data = new Date(dataEntrada);
    const formattedDate = data.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const dataNova = `${formattedDate}`;


    if (!nome || isNaN(role) || !dataEntrada) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const tableBody = document.querySelector('.tabelaFuncionarios');
    const id = tableBody.children.length + 1;
    const newRow = document.createElement('tr');


    newRow.innerHTML = `
        <td>${id}</td>
        <td>${nome}</td>
        <td><p class="status ${roles[role - 1].toLowerCase()}">${roles[role - 1]}</p></td>
        <td>${dataNova}</td>
        <td>-</td>
    `;


    tableBody.appendChild(newRow);

    const addEmployeeModal = new bootstrap.Modal(document.getElementById('addEmployeeModal'));
    addEmployeeModal.hide();

    document.getElementById('addEmployeeForm').reset();
});


document.addEventListener('DOMContentLoaded', function () {
    const updateEmployeeBtn = document.getElementById('updateEmployeeBtn');
    const editEmployeeForm = document.getElementById('editEmployeeForm');

    updateEmployeeBtn.addEventListener('click', function () {

        const employeeId = document.getElementById('editEmployeeId').value;
        const employeeName = document.getElementById('editEmployeeName').value;
        const employeeRole = document.getElementById('editEmployeeRole').value;
        const exclusionDate = document.getElementById('editEmployeeExclusionDate').value;


        if (!employeeId) {
            alert('Por favor, insira o ID do Funcionário.');
            return;
        }


        const tableBody = document.querySelector('.tabelaFuncionarios');
        const rows = tableBody.querySelectorAll('tr');
        let rowToUpdate = null;

        rows.forEach(row => {
            if (row.cells[0].textContent === employeeId) {
                rowToUpdate = row;
            }
        });

        if (rowToUpdate) {

            rowToUpdate.cells[1].textContent = employeeName;
            rowToUpdate.cells[2].innerHTML = `
                    <p class="status ${getRoleClass(employeeRole)}">${getRoleName(employeeRole)}</p>
                `;
            rowToUpdate.cells[4].textContent = exclusionDate || '-';
        } else {
            alert('Funcionário não encontrado.');
        }
    });


    function getRoleName(roleId) {
        switch (roleId) {
            case '1': return 'Financeiro';
            case '2': return 'Cardapio';
            case '3': return 'Administrador';
            case '4': return 'Atendimento';
            default: return 'Desconhecido';
        }
    }

    function getRoleClass(roleId) {
        switch (roleId) {
            case '1': return 'financeiro';
            case '2': return 'cardapio';
            case '3': return 'administrador';
            case '4': return 'atendimento';
            default: return 'desconhecido';
        }
    }
});

function findEmployeeRowById(id) {
    const rows = document.querySelectorAll('tbody tr');
    return Array.from(rows).find(row => row.firstElementChild.textContent.trim() === id);
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

