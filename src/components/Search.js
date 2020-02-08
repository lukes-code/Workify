import React from 'react';

class Search extends React.Component {
    keyHandler = (e) => {
        if(e.keyCode === 13){
            this.props.search();
        }
    }
    render() {
        return (
            <div className="searchBox">
              <input 
                type="text" 
                name="name"
                onChange={this.props.updateQuery}
                onKeyDown={this.keyHandler}
                className="searchInput" 
                placeholder="Search"
                autocomplete="off"
              />
          </div>
        );
    }
}

export default Search;