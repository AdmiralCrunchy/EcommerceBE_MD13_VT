const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
      include: [{ model: Product}]
    }).then(categoryData => {
      res.json(categoryData)
    }).catch( err => {
      res.status(500).json({msg: "AHHHHHHHHHHHHHH", err})
    })
});

router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if(!categoryData) {
      res.status(404).json({msg: "Not a single category with that ID!"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json({msg: "More issues to chew on", err});
  }
});

router.post('/', async (req, res) => {

  try {
    const categoryData = await Category.create({category_name: req.body.category_name});
    res.status(200).json(categoryData);
  }catch (err) {
    res.status(500).json({msg: "This is all driving me insane", err});
  }
});

router.put('/:id', (req, res) => {
  Category.update({category_name: req.body.category_name},
    {where: { id: req.params.id}
  }).then(categoryData =>{
    if(!categoryData[0]) {
      res.status(404).json({message: 'No catagory with this Id and no changes!'});
      return;
    }
    res.json(category)
  }).catch (err => {
    res.status(500).json({msg: "I'm losing my mind with this stupid assignment", err});
  })
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {id: req.params.id}
    }).then(categoryData =>{
      if(!categoryData) {
        res.status(404).json({ message: "There isn't a category at that Id!"})
        return;
      }
      res.status(200).json(categoryData);
    }).catch (err => {
    res.status(500).json({msg: "Really hope that this is working",err});
  })
  res.json(200).json({msg:"Category was destroyed!"})
});

module.exports = router;
