const SearchOrder = ({ setSearchTerm, handleSearch, children }) => {
    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-between items-center mb-4">
                {/* Search Input and Button */}
                <form className="flex w-full max-w-lg space-x-2">
                    <input
                        type="search"
                        id="searchBar"
                        placeholder="Search Here"
                        aria-label="Search"
                        className="flex-grow border border-gray-300 rounded-l-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="button"
                        id="searchButton"
                        className="bg-indigo-500 text-white px-4 py-2 rounded-r-md shadow-sm hover:bg-indigo-600 focus:outline-none"
                        onClick={handleSearch}
                    >
                        {children || "Search"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchOrder;
