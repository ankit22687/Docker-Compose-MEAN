const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');


router.post("", (req, res, next) => {

    const customer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        city: req.body.city,
        state: req.body.state,
    });
    customer.save().then(result => {
        res.status(201).json({
            message: 'Customer added successfully'
        });
    });
});


router.get('', (req, res, next) => {
    const customers = Customer.find().then(customers => {
        res.status(200).json({
            message: 'Customers fetched successfully',
            customers: customers
        });
    });
});

router.get('/:id', (req, res, next) => {
    Customer.findById(req.params.id).then(customer => {
        if (customer) {
            res.status(200).json(customer);
        } else {
            res.status(404).json({
                message: 'Customer not found'
            });
        }
    });
});

router.put('/:id', (req, res, next) => {
    const customer = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        city: req.body.city,
        state: req.body.state
    }
    Customer.findOneAndUpdate({ _id: req.params.id }, customer, { useFindAndModify: false }).then((result) => {
        res.status(200).json({ message: 'Customer Update successfully' })
    })

});

router.delete('/:id', (req, res, next) => {
    console.log(req.params.id);
    Customer.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Customer deleted successfully'
        });
    });
});

module.exports = router;