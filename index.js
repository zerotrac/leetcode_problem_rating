new gridjs.Grid({
    columns: [{
        name: "ID",
        width: "7%",
    }, {
        name: "Title",
        // width: "60%",
        formatter: (_, row) => gridjs.html(`<a href="https://leetcode.com/problems/${row.cells[2].data}" target="_blank">${row.cells[1].data}</a>`),
        sort: {
            enabled: false
        }
    }, {
        name: "TitleSlug",
        hidden: true
    }, {
        name: "Rating",
        width: "11%",
        formatter: (cell) => Math.round(cell)
    }],
    server: {
        url: "./data.json",
        then: data => data.map(entry => [entry.ID, entry.Title, entry.TitleSlug, entry.Rating])
    },
    sort: true,
    autoWidth: false,
    search: {
        selector: (cell, rowIndex, cellIndex) => cellIndex === 2 ? "" : cell
    },
    pagination: {
        limit: 20
    },
    style: {
        table: {
            border: '3px solid #ccc'
        },
        th: {
            'background-color': 'rgba(0, 0, 0, 0.1)',
            color: '#000',
            'border-bottom': '3px solid #ccc'
        }
    }
}).render(document.getElementById("wrapper"));