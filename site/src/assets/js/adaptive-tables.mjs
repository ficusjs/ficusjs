const tables = Array.from(document.querySelectorAll('.fd-doc-article table'))

tables.forEach(table => {
  const headCols = Array.from(table.querySelectorAll('thead > tr > th'))
  const bodyRows = Array.from(table.querySelectorAll('tbody > tr'))
  if (headCols.length > 0 && bodyRows.length > 0) {
    bodyRows.forEach(bodyRow => {
      const cols = Array.from(bodyRow.querySelectorAll('td'))
      if (cols.length === headCols.length) {
        cols.forEach((col, idx) => {
          col.dataset.label = headCols[idx].textContent
        })
      }
    })
  }
})
