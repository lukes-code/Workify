import React from 'react';

class Searchbar extends React.Component {
    keyHandler = (e) => {
        if(e.keyCode === 13){
            this.props.search();
            e.placeholder = 'Search artists'; 
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
                placeholder="Search artists"
                autoComplete="off"
              />
          </div>
        );
    }
}

export default Searchbar;