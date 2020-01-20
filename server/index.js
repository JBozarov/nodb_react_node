const express = require('express'); 
const app = express(); 
app.use(express.json()); 
const cont = require('./controllers/house_controller'); 


//ENDPOINTS
app.get('/api/houses', cont.read); 
app.delete('/api/houses/:id', cont.delete); 
app.post('/api/houses', cont.create); 
app.put('/api/houses/:id', cont.update); 
app.post('/api/favorite/:id', cont.saveToFav); 
app.get('/api/sold', cont.soldHouses); 
app.get('/api/favorite', cont.favHouse); 





const SERVER_PORT = 6767
app.listen(SERVER_PORT, ()=>console.log(`Server is running on ${SERVER_PORT} port`))