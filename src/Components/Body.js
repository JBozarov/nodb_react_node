import React, { Component } from 'react'; 
import Search from './Search'; 
import Welcome from './Welcome'


//Body is child of App, parent of Search Component
export class Body extends Component {
  constructor(){
    super(); 

    this.state = {
        toggle: false,
        sellToggle: false,
        editToggle: false, 
        editHouseIndex: '',

        image: '',
        address: '', 
        city: '',
        country: '',
        zip_code: '',
        seller: '',
        seller_number: '', 
        price: ''
    }
  }

  handleClick = () => this.setState ({toggle: !this.state.toggle })

  handleChange = e => this.setState({ [e.target.name]: e.target.value })
  
  publish = () => {
      const {image, address, city, country, zip_code, seller, seller_number, price} = this.state
      this.props.publish({image, address, city, country, zip_code, seller, seller_number, price}); 

      this.setState({
        image: '',
        address: '', 
        city: '',
        country: '',
        zip_code: '',
        seller: '',
        seller_number: '', 
        price: ''
      })
  }


// Shows Sold houdes 
showSoldHouses = () => {
    this.props.showSoldHouses(); 
    this.setState({
        toggle: false,
        sellToggle: false
    })
}

//showe favorite houses 
showFavHouses = () => {
    this.props.showFavHouses(); 
    this.setState({
        toggle: false,
        sellToggle: false
    })
}

  sellHouse = () =>{
      this.setState({ toggle: false, sellToggle: true, editToggle: false })
      this.props.sellHouse(); 
  }

  showAll = () => {
      this.setState ({ toggle: false, sellToggle: false });
      this.props.showAll()
  }

  editHouse = index => {
      this.props.editHouse(); 
      this.setState({
        toggle: false,
        editToggle: true, 
        editHouseIndex: parseInt(index)
      })
  }

  submitEdit = () => {
    const {address, city, country, zip_code, seller, seller_number, price, editHouseIndex} = this.state
      this.props.submitEdit(editHouseIndex, {address, city, country, zip_code, seller, seller_number, price})

      this.setState({
        image: '',
        address: '', 
        city: '',
        country: '',
        zip_code: '',
        seller: '',
        seller_number: '', 
        price: '', 
        editToggle: false,
      })
  }


  render() {
    const {toggle, sellToggle } = this.state; 
    const {image, address, city, country, zip_code, seller, seller_number, price, editToggle, editHouseIndex} = this.state
    const {houses, houseSold, saveToFavorite, toggleSold, soldHouses, toggleAll, searchBy, searchToggle, discover, welcomeToggle, agentToggle } = this.props; 
    return (
      <div id="body"> {searchToggle &&
        <Search 
            handleClick={this.handleClick}
            showSoldHouses={this.showSoldHouses}
            showFavHouses={this.showFavHouses}
            showAll={this.showAll}
            sellHouse={this.sellHouse}
            searchBy={searchBy}
            agentToggle={agentToggle} />}
        
        {welcomeToggle && <Welcome discover={discover} />}


        {toggle ? 
          <div id='dropdown' >
             <span>SERVICES</span>
             <span>dsdlfksdkf slkfsd</span>
             <span><button></button> SELL MY HOUSE </span>
             <span>PORTFOLIO</span>
             <span>ABOUT</span>
             <span>TEAM</span>
             <span>CONTACT</span>
          </div> : null}


          <div id='container-all-houses' > {
            toggleAll && houses.map((house, index)=>(
                <div id='render' key={index}>
                   <img src={house.image} alt='Image is coming soon' style={{height: '100px', width: '140px', borderRadius: '15px'}} />
                   <h5> Price: ${house.price} </h5>
                   <p> House ID: {house.house_id} </p>
                   <p> Address: {house.address}, {house.city}, {house.country} {house.zip_code} </p>
                   <p> <span style={{fontWeight: 'bold'}} >Seller:</span>  {house.seller}, Number: {house.seller_number} </p>

                   {agentToggle ?
                    <div style={{float: 'right'}} > 
                    <button onClick={()=>houseSold(index)} > SOLD </button>
                    <button onClick={()=>this.editHouse(index)} > EDIT  </button>
                    </div> : 
                    <div style={{float: 'right'}} > 
                    <button onClick={()=>saveToFavorite(index)} > Save to Fevirite </button>
                    </div>
                   }

                </div> ))}
           </div>
 

           <div id='container-3' > {
            toggleSold && soldHouses.map((house, index) =>(
                    <div id='render-fav' key={index}>
                    <img src={house.image} alt='Image is coming soon' style={{height: '100px', width: '140px'}} />
                    <h5> Price: ${house.price} </h5>
                    <p> House ID: {house.house_id} </p>
                    <p> Address: {house.address}, {house.city}, {house.country} {house.zip_code} </p>
                    <p> <span style={{fontWeight: 'bold'}} >Seller:</span>  {house.seller}, Number: {house.seller_number} </p>
                 </div>))}  
           </div>

           <div id='container_sell_house' >
                 {sellToggle &&
                 <div id='sell-input' >
                    <p> <label> Upload photo </label> <input 
                                name='image' 
                                value={image}
                                onChange={e=>this.handleChange(e)}
                                type='file'  /> </p>      

                    <p> <label> Address </label> <input 
                                name='address' 
                                value={address}
                                onChange={e=>this.handleChange(e)}
                                type='text'
                                placeholder='Enter valid address' /> </p> 

                    <p> <label> City </label> <input 
                                name='city' 
                                value={city}
                                onChange={e=>this.handleChange(e)}
                                type='text'
                                placeholder='Enter city' /> </p> 

                    <p> <label> Country </label> <input 
                                name='country' 
                                value={country} 
                                onChange={e=>this.handleChange(e)}
                                type='text'
                                placeholder='Enter country' /> </p> 

                    <p> <label> Zip code </label> <input 
                                name='zip_code' 
                                value={zip_code}
                                onChange={e=>this.handleChange(e)}
                                type='number'
                                placeholder='Enter zip code' /> </p> 

                    <p> <label> Seller </label> <input 
                                name='seller'
                                value={seller}
                                onChange={e=>this.handleChange(e)}
                                type='text'
                                placeholder='Enter seller"s name' /> </p> 

                    <p> <label> Phone </label> <input 
                                name='seller_number' 
                                value={seller_number}
                                onChange={e=>this.handleChange(e)}
                                type='number'
                                placeholder='Enter seller"s number' /> </p> 

                    <p> <label> Price </label> <input 
                                name='price' 
                                value={price}
                                onChange={e=>this.handleChange(e)}
                                type='number'
                                placeholder='Enter price of house $$$$$' /> </p> 
                                
                    <p><button onClick={this.publish} >Click to Publish </button> </p> 
                 </div>}
           </div>


           <div id='container_edit' >
                 {editToggle &&
                 <div id='edit-input' > 
                    <p> <label> Edit Address </label> <input 
                                name='address' 
                                value={address}
                                placeholder={houses[editHouseIndex].address}
                                onChange={e=>this.handleChange(e)}
                                type='text' /> </p> 

                    <p> <label> Edit City </label> <input 
                                name='city' 
                                value={city}
                                placeholder={houses[editHouseIndex].city}
                                onChange={e=>this.handleChange(e)}
                                type='text' /> </p> 

                    <p> <label> Edit Country </label> <input 
                                name='country' 
                                value={country}
                                placeholder={houses[editHouseIndex].country} 
                                onChange={e=>this.handleChange(e)}
                                type='text'/> </p> 

                    <p> <label> Edit Zip code </label> <input 
                                name='zip_code' 
                                value={zip_code}
                                placeholder={houses[editHouseIndex].zip_code}
                                onChange={e=>this.handleChange(e)}
                                type='number'/> </p> 

                    <p> <label> Edit Seller </label> <input 
                                name='seller'
                                value={seller}
                                placeholder={houses[editHouseIndex].seller}
                                onChange={e=>this.handleChange(e)}
                                type='text' /> </p> 

                    <p> <label> Edit Phone </label> <input 
                                name='seller_number'
                                value={seller_number} 
                                placeholder={houses[editHouseIndex].seller_number}
                                onChange={e=>this.handleChange(e)}
                                type='number' /> </p> 

                    <p> <label> Edit Price </label> <input 
                                name='price' 
                                value={price}
                                placeholder={houses[editHouseIndex].price}
                                onChange={e=>this.handleChange(e)}
                                type='number' /> </p> 
                                
                    <p><button onClick={this.submitEdit} > SUBMIT </button> </p> 
                 </div>}
           </div>
                   




      </div>
    )
  }
}

export default Body
