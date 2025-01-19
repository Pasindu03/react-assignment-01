const SearchBar = ({ handleSearch, setSearchTerm, handleModal1 }) => {
    return (
        <div className="container mx-auto mt-5">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                {/* Search Form */}
                <div className="w-full md:w-2/3 mb-3 md:mb-0">
                    <form className="flex">
                        <input
                            type="search"
                            placeholder="Search customer"
                            aria-label="Search"
                            className="flex-grow border border-gray-300 rounded-l-md p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="bg-indigo-500 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Add Button */}
                <div className="w-full md:w-1/3 text-right">
                    <button
                        className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none shadow-md"
                        onClick={handleModal1}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
