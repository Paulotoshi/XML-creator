const clientes = [];

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function adicionarCliente() {
  const form = document.getElementById('clienteForm');
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const telefone = form.telefone.value.trim();
  const endereco = form.endereco.value.trim();

  if (!nome || !email || !telefone || !endereco) {
    alert('Preencha todos os campos!');
    return;
  }

  clientes.push({ nome, email, telefone, endereco });

  form.reset(); // Limpa o formulário
  document.getElementById('mensagem').textContent = `Cliente adicionado! Total: ${clientes.length}`;
}

function gerarXML() {
  if (clientes.length === 0) {
    alert('Adicione pelo menos um cliente antes de gerar o XML.');
    return;
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<clientes>\n`;

  clientes.forEach(cliente => {
    xml += `  <cliente>\n`;
    xml += `    <nome>${escapeXml(cliente.nome)}</nome>\n`;
    xml += `    <email>${escapeXml(cliente.email)}</email>\n`;
    xml += `    <telefone>${escapeXml(cliente.telefone)}</telefone>\n`;
    xml += `    <endereco>${escapeXml(cliente.endereco)}</endereco>\n`;
    xml += `  </cliente>\n`;
  });

  xml += `</clientes>`;

  const blob = new Blob([xml], { type: 'text/xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'clientes.xml';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
