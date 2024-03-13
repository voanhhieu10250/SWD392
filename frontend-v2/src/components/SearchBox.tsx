import SearchIcon from "@mui/icons-material/Search";

const SearchBox = () => {
  return (
    <form className="max-w-sm md:w-[400px] mx-auto">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-2 ps-10 text-sm border border-input rounded-full bg-background shadow-inner"
          placeholder="Search Mockups, Logos..."
          required
        />
      </div>
    </form>
  );
};

export default SearchBox;
