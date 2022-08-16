const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({include: [{model: Product}]
  }).then(tagData =>{
    res.json(tagData)
  }).catch(err =>{
    res.status(500).json({msg: "Not good, not good at all", err})
  });
  
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try { 
    const tagData = await Tag.findByPk(req.params.id, {include: [{model: Product}]
    });
  if(!tagData) {
    res.status(404).json({msg: "Not a single id by that name"});
    return
  }
  res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({msg: "This is a very serious problem", err});
  }
});

router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create({tag_name: req.body.tag_name});
    res.status(200).json(tagData)
  }catch(err){
    res.status(500).json({ msg: "bad thing happened!", err})
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({tag_name: req.body.tag_name},
  {where: { id: req.params.id}
  }).then (tagData=> {
    if(!tagData[0]){
      return res.status(404).json({msg: "sorry no tag"})
    }
    res.json(tagData)
  }).catch(err=> {
    res.status(500).json({msg: "Bad news for you", err})
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where: {id:req.params.id}
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({msg: "No go Bro!", err})
  })
});

module.exports = router;
