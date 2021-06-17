const express = require("express");
const router = express.Router();
const report = require("../controllers/report");

router.get('/', report.getHTML)
router.get('/cetak_laporan', report.report)
router.post('/generate_laporan', report.genReport)


router.get('/generate_laporan2/:id', report.genReport2)

module.exports = router;