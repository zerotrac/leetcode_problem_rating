new gridjs.Grid({
    columns: [{
        name: "ID",
        width: "8%",
    }, {
        name: "题目名称",
        formatter: (_, row) => gridjs.html(`<a href="https://leetcode.cn/problems/${row.cells[2].data}" target="_blank">${row.cells[1].data}</a>`),
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
        name: "竞赛名称",
        formatter: (_, row) => gridjs.html(`<a href="https://leetcode.cn/contest/${row.cells[3].data}" target="_blank">${row.cells[4].data}</a>`),
        sort: {
            compare: (a, b) => {
                // BiC or WC
                const contest_type = (x) => x.split(" ")[0];
                const contest_idx = (x) => parseInt(x.split(" ")[1]);
                if (contest_type(a) > contest_type(b)) {
                    return 1;
                } else if (contest_type(a) < contest_type(b)) {
                    return -1;
                } else {
                    if (contest_idx(a) > contest_idx(b)) {
                        return 1;
                    }
                    else if (contest_idx(a) < contest_idx(b)) {
                        return -1;
                    }
                    return 0;
                }
            }
        }
    }, {
        name: "#",
        width: "5%",
        sort: {
            enabled: false
        }
    }, {
        name: "分数",
        width: "10%",
        formatter: (cell) => Math.round(cell)
    }],
    server: {
        url: "../data.json",
        then: data => data.map(entry => [entry.ID, entry.Title, entry.TitleSlug, entry.ContestSlug, entry.ContestID_zh, entry.ProblemIndex, entry.Rating])
    },
    sort: true,
    autoWidth: false,
    search: {
        selector: (cell, rowIndex, cellIndex) => (cellIndex === 2 || cellIndex == 3 || cellIndex == 6) ? "" : cell
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
