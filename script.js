function getInitialData({rows, header}) {
  const data = [
    header
  ];
  const columns = data[0].length;

  for (let i = 0; i <= rows; i++) {
    data.push(new Array(data[0].length));
  }

  return data;
}

function addRow (e) {
  e.preventDefault()
  
}

function createDOMTable(elem, tableData) {
  for (let i = 0; i < tableData.length; i++) {
    let row = elem.insertRow();

    for (let j = 0; j < tableData[0].length; j++) {
      row.insertCell().innerHTML = `<input data-row="${i}" data-column="${j}" value="${tableData[i][j] || ''}"/>`;
    }
  }
}

window.contentfulExtension.init(extension => {
  let value = extension.field.getValue()

  if (!value) {
    value = {
      tableData : getInitialData({
        rows: 2,
        header: ['FOO', 'BAR', 'BAZ']
      })
    };
  }

 createDOMTable(document.querySelector('table'), value.tableData);

  window.addEventListener('blur', e => {
    value.tableData[e.target.dataset.row][e.target.dataset.column] = e.target.value;
    extension.field.setValue(value);
  }, true);
});