const express = require("express");
const router = express.Router();

router.get("/health", (req, res, next) => {
    res.send("healthly route!");
});

router.use(express.json());
router.use("/customer", require("./customer"));
router.use('/vendor', require('./vendor'));
router.use('/favorite', require('./favorite'));


module.exports = router;