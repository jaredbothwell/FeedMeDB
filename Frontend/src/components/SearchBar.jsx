import './css_files/SearchBar.scss'
import React from 'react'

// probably gonna convert this to a functional component
class Search extends React.Component {
  state = {
    data: [
        {"recipeID":1, "name":"eggs on toast"},
        {"recipeID":2, "name":"bacon"},
        {"recipeID":3, "name":"torbens appeaaatizers"},
        {"recipeID":4, "name":"bigmac"},
        {"recipeID":5, "name":"omlete"},
        {"recipeID":6, "name":"poptart"},
    ],
    search: "",
    recipe: ""
  }
  // Search input   
  onInput = e => this.setState({ [e.target.id]: e.target.value });
  // Select the wrapper and toggle class 'focus'
  onFocus = e => e.target.parentNode.parentNode.classList.add('focus');
  onBlur = e => e.target.parentNode.parentNode.classList.remove('focus');
  // Select item
  onClickItem = item => this.setState({
    search: "",
    recipe: item
  });

  render() {
    let { data, search, recipe } = this.state;
    if (!data) {
      return <p>Loading</p>
    }
    let filtered = data.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    return (
      <div>
        <div className="wrapper">
          <div className="search">
            <input
              id="search"
              type="search"
              value={this.state.search}
              placeholder="Search by name"
              onChange={this.onInput}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              autocomplete="off"
            />
            <i class="fas fa-search"></i>
          </div>
          {search.length > 1 && filtered.length > 0 && (
            <ul className="list">
              {filtered.map(item => (
                <li onClick={() => this.onClickItem(item)}>{item.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
};

export default Search

