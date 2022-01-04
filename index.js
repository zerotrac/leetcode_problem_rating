new gridjs.Grid({
    columns: [{
        name: "ID",
        width: "7%",
    }, {
        name: "Title",
        formatter: (_, row) => gridjs.html(`<a href="https://leetcode.com/problems/${row.cells[2].data}" target="_blank">${row.cells[1].data}</a>`),
        sort: {
            enabled: false
        }
    }, {
        name: "TitleSlug",
        hidden: true
    }, {
        name: "ContestSlug",
        hidden: true
    }, {
        name: "Contest",
        formatter: (_, row) => gridjs.html(`<a href="https://leetcode.com/contest/${row.cells[3].data}" target="_blank">${row.cells[4].data}</a>`),
        sort: {
            compare: (a, b) => {
                const idx = (x) => parseInt(x.split(" ").slice(-1)[0]);
                if (idx(a) > idx(b)) {
                    return 1;
                } else if (idx(b) > idx(a)) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    }, {
        name: "Rating",
        width: "11%",
        formatter: (cell) => Math.round(cell)
    }],
    server: {
        url: "./data.json",
        then: data => data.map(entry => [entry.ID, entry.Title, entry.TitleSlug, entry.ContestSlug, entry.ContestID, entry.Rating])
    },
    sort: true,
    autoWidth: false,
    search: {
        selector: (cell, rowIndex, cellIndex) => (cellIndex === 2 || cellIndex == 3 || cellIndex == 5) ? "" : cell
    },
    pagination: {
        limit: 20,
        buttonsCount: 7
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
