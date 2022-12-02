const express = require('express');
const   ParentController = require('../controllers/ParentController');
const router = express.Router();

router.route('/:id').get(ParentController.getParent).put(ParentController.editParent)
router.route('/').post(ParentController.creatParent);
router.route('/child/:id').get(ParentController.getChild).post(ParentController.createChild);

// .put(ParentController.editParent).delete(ParentController.deleteParent)

  router.get('*', (req, res) => {
    res.status(404).json({
      message: `${req.originalUrl} not found`,
    });
  
    const err = new Error(`${req.originalUrl} not found`);
    err.statusCode = 404;
  });

module.exports = router;
