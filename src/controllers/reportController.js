const controller = {};

var inv_id = 0;

controller.list_report = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM reports', (err, reports) => {
            if (err) {
                res.json(err);
            }
            res.render('reports', {
                reports_data: reports
            });
        });
    });
};

controller.save = (req, res) => {
    const reports = req.body;
    req.getConnection((err, conn) => {
        console.log(reports);
        conn.query('INSERT INTO reports set ?', [reports], (err, report) => {
            res.redirect('/');
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM reports WHERE id = ?', [id], (err, report) => {
            res.render('report_edit', {
                report_data: report[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newReport = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE reports set ? WHERE id = ?', [newReport, id], (err, rows) => {
            res.redirect('/');
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM reports WHERE id = ?', [id], (err, rows) => {
            res.redirect('/');
        });
    })
};

controller.inventory = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM products WHERE report_id = ?', [id], (err, products) => {
            if (err) {
                res.json(err);
            }
            res.render('report_inventory', {
                products_data: products,
                id : id
            });
        });
    });
};

controller.add_product = (req, res) => {
    const { id } = req.params;
    const products_params = req.body;
    var products = {
        product: products_params.product,
        value: products_params.value,
        quantity: products_params.quantity,
        report_id: id
    };
    req.getConnection((err, conn) => {
        console.log(products);
        conn.query('INSERT INTO products set ?', [products], (err, product) => {
            res.redirect('/inventory/' + id);
        });
    });
};

controller.edit_product = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
            res.render('product_edit', {
                product_data: product[0],
            });
            inv_id = product[0].report_id;
        });
    });
};

controller.update_product = (req, res) => {
    const { id } = req.params;
    const newProduct = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE products set ? WHERE id = ?', [newProduct, id], (err, rows) => {
            res.redirect('/inventory/' + inv_id);
        });
    });
};

controller.delete_product = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
            inv_id = product[0].report_id;
        }),
        conn.query('DELETE FROM products WHERE id = ?', [id], (err, rows) => {
            res.redirect('/inventory/' + inv_id);
        });
    });
};

module.exports = controller;