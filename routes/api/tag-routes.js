const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({include: [{model: Product}]
  }).then(data =>{
    res.json(data)
  }).catch(err =>{
    res.status(500).json({msg: "Not good, not good at all", err})
  });
  
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findByPk(reg.params.id, {
    include: [{
      model: Product
    }]
  }).then(data => {
    res.json(data)
  }).catch(err=> {
    res.status(500).json({msg: "Not a single id by that name", err})
  })
  
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(data => {
    res.json(data)
  }).catch(err=>{
    res.status(500).json({ msg: "bad thing happened!", err})
  })
  // create a new tag

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: { id: req.params.id}
  }).then (tag=> {
    if(!tag[0]){
      return res.status(404).json({msg: "sorry no tag"})
    }
    res.json(tag)
  }).catch(err=> {
    res.status(500).json({msg: "Bad news for you", err})
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id:req.params.id
    }
  }).then(data=>{
    res.json(data)
  }).catch(err=>{
    res.status(500).json({msg: "No go Bro!", err})
  })
});

module.exports = router;
