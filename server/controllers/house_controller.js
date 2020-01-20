const houses = require('../houses/houses.json'); 
const soldList = []; 
const favList = []; 
let id = 21; 
let house_id = 7857; 

module.exports = {
  read: (req, res)=> {
    res.status(200).send(houses); 
  },
  delete: (req, res) =>{
      const {id} = req.params
      soldList.push(houses[id]); 
      houses.splice(id, 1); 
      res.status(200).send(houses); 
  }, 
  create: (req, res) => {
      const {image, address, city, state, zip_code, seller, seller_number, price} = req.body; 
      let newHouse = {
          id, 
          image, 
          house_id,
          address, 
          city, 
          state, 
          zip_code, 
          seller, 
          seller_number, 
          price
      }
      houses.unshift(newHouse); 
      id++; 
      house_id+=11; 
      res.status(200).send(houses); 
  },
  update: (req, res) => {
    console.log('update, put: ', req.body, req.params.id)
    const {address, city, state, zip_code, seller, seller_number, price} = req.body; 
    const ind = houses.findIndex(val=>val.id===parseInt(req.params.id));
    
        houses[ind].address = address || houses[ind].address; 
        houses[ind].city = city || houses[ind].city; 
        houses[ind].state = state || houses[ind].state; 
        houses[ind].zip_code = zip_code || houses[ind].zip_code; 
        houses[ind].seller = seller || houses[ind].seller; 
        houses[ind].seller_number = seller_number || houses[ind].seller_number; 
        houses[ind].price = price || houses[ind].price; 
        res.status(200).send(houses)

  },
    saveToFav: (req, res) => {
        const {id} = req.params; 
        favList.push(houses[id]); 
        res.status(200).send(favList); 
    },

      soldHouses: (req, res) => {
      res.status(200).send(soldList); 
      console.log(soldList)
  }, 

   favHouse: (req, res) => {
      res.status(200).send(favList); 
    },

}