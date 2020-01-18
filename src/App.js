import React, { Component } from 'react';
import axios from 'axios'; 
import './App.css';
import Header from './Components/Header';
import Body from './Components/Body';
import Footer from './Components/Footer'



//Component tree: App is parent of Header, Body Footer
class App extends Component {
  constructor() {
    super(); 

    this.state = {
        houses: [], 
        soldHouses: [],
        favoriteHouses: [],
        toggleAll: false,
        toggleSold: false, 
        searchToggle: false,
        welcomeToggle: true, 
        agentToggle: false,
    }
}

//get all houses, as soon as page loaded
componentDidMount () {
    this.setState({toggleAll: false})
    this.showAll();
}

//show all houses, get request outside of componentDidMount after changing 
showAll = () => {
    axios.get('/api/houses')
    .then(res=>this.setState({houses: res.data}))
    .catch(err=>console.log(err)) 
    this.setState({toggleAll: true, toggleSold: false})
}

//delete one house, delete request 
houseSold = id => {
    axios.delete(`/api/houses/${id}`)
    .then(res => this.setState({houses: res.data}))
    .catch(err=>console.log(err))
}

//adding new house, post request 
publish = body => {
    axios.post('/api/houses', body)
    .then(res=> this.setState({houses: res.data}))
    .catch(err => console.log(`Not published: ${err}`))
}
    
//update existing house, put request
submitEdit = (id, body) => {
    axios.put(`/api/houses/${id}`, body)
    .then(res=>this.setState ({houses: res.data }))
    .catch(err => console.log(err))
}

//add to favorite list, post
saveToFavorite = id => {
    axios.post(`/api/favorite/${id}`)
    .then(res => this.setState({favoriteHouses: res.data}))
    .catch(err=>console.log(err))
}

//show deleted houses(sold) get request 
showSoldHouses = () => {
    this.setState({ toggleAll: false, toggleSold: true }); 
    axios.get('/api/deleted')
    .then(res=>this.setState({ soldHouses: res.data }))
}

//show favorite list, get request 
showFavHouses = () => {
    this.setState({ toggleAll: false, toggleSold: true }); 
    axios.get('/api/favorite')
    .then(res=>this.setState({ soldHouses: res.data }))
}


//welcome page fn, toggles
discover = () => this.setState({toggleAll: true, searchToggle: true, welcomeToggle: false})

//sellhouse opens sellhouse page 
sellHouse = () =>this.setState({toggleAll: false, toggleSold: false})

//edit page opens
editHouse = () =>this.setState({toggleAll: false, toggleSold: false})

//login, logout toggle
loginAgent = () => this.setState({agentToggle: !this.state.agentToggle, searchToggle: true, welcomeToggle: false, toggleAll: true })

 
//Searches based on input data, by city, country, max and min price 
//Input and search button is on Search Component
searchBy = (searchInput, selected) => {
      let {houses} = this.state; 
      let sorted; 
      if (selected==='city') sorted = houses.filter(val=>val.city.toLowerCase().includes(searchInput.toLowerCase())); 
      else if (selected==='country') sorted = houses.filter(val=>val.country.toLowerCase().includes(searchInput.toLowerCase())); 
      else if (selected==='max') sorted = houses.filter(val=>parseInt(val.price)<parseInt(searchInput)); 
      else if (selected==='min') sorted = houses.filter(val=>parseInt(val.price)>parseInt(searchInput)); 
      this.setState({ houses: sorted, showAll: false }); 
}



render() {
    const {houses, toggleSold, soldHouses, toggleAll, searchToggle, welcomeToggle, agentToggle} = this.state; 
    return (
      <div className="App">
         <Header agentToggle={agentToggle} loginAgent={this.loginAgent} />
         <Body 
            //Passed state properties 
            houses={houses}
            toggleAll={toggleAll}
            toggleSold={toggleSold}
            searchToggle={searchToggle}
            soldHouses={soldHouses}
            welcomeToggle={welcomeToggle}
            agentToggle={agentToggle}

            //Passed methods 
            houseSold={this.houseSold}
            showSoldHouses={this.showSoldHouses}
            showFavHouses={this.showFavHouses}
            showAll={this.showAll}
            sellHouse={this.sellHouse}
            publish={this.publish}
            searchBy={this.searchBy}
            editHouse={this.editHouse}
            submitEdit={this.submitEdit}
            discover={this.discover}
            saveToFavorite={this.saveToFavorite}
         /> 
         {searchToggle &&  <Footer/>  }
      </div>
      );
    }
  }

export default App;
