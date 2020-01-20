import React, { Component } from 'react'; 
//import logo from './search.png'; 

export class Search extends Component {
    constructor (){
        super(); 

        this.state = {
            searchInput: '',
            selected: 'city'
        }
    }

    handleSelect = e => {
        this.setState({
            selected: e.target.value
        })
    }

    handleSearchInput = inp => {this.setState({searchInput: inp.target.value})}

    searchBy = () => {
        const {searchInput, selected} = this.state; 
        this.props.searchBy(searchInput, selected);
        this.setState({searchInput: '', selected: ''}); 
    }

  render() {
    const {handleClick, showSoldHouses, showFavHouses, showAll, sellHouse, agentToggle} = this.props
    return (
      <div className='search'>
            <div>
                <button onClick={handleClick} > MENU </button>
                <button onClick={showAll} > All Houses </button>
                { agentToggle ? 
                    <span>  
                    <button onClick={showSoldHouses} > Sold Houses </button>
                    <button onClick={sellHouse}> Sell new house </button>
                    </span> :
                    <button onClick={showFavHouses} > My Favorite Houses </button>
                }
            </div>

            <div>
                <input placeholder='Filter by' onChange={e=>this.handleSearchInput(e)} value={this.state.searchInput} />
                <select onChange={e=>this.handleSelect(e)} >
                        <option id='option' >  City </option>
                        <option id='option' name='selected' value='state'  > State  </option>
                        <option id='option' name='selected' value='max'  > Max price </option>
                        <option id='option' name='selected' value='min'  > Min price </option>
                </select>
                <button onClick={this.searchBy}  >Search</button>
            </div>

      </div>
    )
  }
}

export default Search
