import './SearchBar.css'

const SearchBar = () => {
    return ( 
    <div className="search-bar--container">
        <input
            type="text"
            className="search-bar"
            placeholder="Enter a city"/>
        <button
            type="submit"
            className="add-city-button">
            Add City
        </button>
            
    </div> 
);
}
 
export default SearchBar;