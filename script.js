document.addEventListener('DOMContentLoaded', function () {
    carregarEstudantes();
});

function abrirFormulario() {
    document.getElementById('formPopup').style.display = 'block';
}

function fecharFormulario() {
    document.getElementById('formPopup').style.display = 'none';
    limparCamposFormulario();
}

function limparCamposFormulario() {
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('bilhete').value = '';
    document.getElementById('curso').value = '';
}

function salvarEstudante() {
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const bilhete = document.getElementById('bilhete').value;
    const curso = document.getElementById('curso').value;

    if (nome && idade && bilhete && curso) {
        const estudante = { nome, idade, bilhete, curso };
        let estudantes = JSON.parse(localStorage.getItem('estudantes')) || [];
        estudantes.push(estudante);
        localStorage.setItem('estudantes', JSON.stringify(estudantes));
        carregarEstudantes();
        fecharFormulario();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}


function carregarEstudantes() {
    const estudantesContainer = document.getElementById('registros');
    const estudantes = JSON.parse(localStorage.getItem('estudantes')) || [];

    estudantesContainer.innerHTML = '';

    estudantes.forEach((estudante, index) => {
        const estudanteDiv = document.createElement('div');
        estudanteDiv.classList.add('registro');
        estudanteDiv.innerHTML = `
            <p><strong>Nome:</strong> ${estudante.nome}</p>
            <p><strong>Idade:</strong> ${estudante.idade}</p>
            <p><strong>Número do Bilhete:</strong> ${estudante.bilhete}</p>
            <p><strong>Curso:</strong> ${estudante.curso}</p>
            <button onclick="editarEstudante(${index})">Editar</button>
            <button onclick="excluirEstudante(${index})">Excluir</button>
        `;
        estudantesContainer.appendChild(estudanteDiv);
    });
}

function editarEstudante(index) {
    const estudantes = JSON.parse(localStorage.getItem('estudantes')) || [];
    const estudanteParaEditar = estudantes[index];

    document.getElementById('nome').value = estudanteParaEditar.nome;
    document.getElementById('idade').value = estudanteParaEditar.idade;
    document.getElementById('bilhete').value = estudanteParaEditar.bilhete;
    document.getElementById('curso').value = estudanteParaEditar.curso;

    excluirEstudante(index);
    abrirFormulario();
}

function excluirEstudante(index) {
    const estudantes = JSON.parse(localStorage.getItem('estudantes')) || [];
    estudantes.splice(index, 1);
    localStorage.setItem('estudantes', JSON.stringify(estudantes));
    carregarEstudantes();
}


