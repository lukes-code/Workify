import React from 'react';

class Search extends React.Component {
    keyHandler = (e) => {
        if(e.keyCode === 13){
            this.props.search();
        }
    }
    render() {
        return (
            <div className="input-group">
              <input 
                type="text" 
                name="name"
                onChange={this.props.updateQuery}
                onKeyDown={this.keyHandler}
                className="form-control" 
                placeholder="Search for..." />
          </div>
        );
    }
}

export default Search;