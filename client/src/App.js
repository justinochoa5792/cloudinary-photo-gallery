import { useState, useEffect } from "react";
import "./App.css";
import { getImages, searchImages } from "./api";

function App() {
  const [imageList, setImageList] = useState([]);
  const [next, setNext] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getImages();
      setImageList(response.resources);
      setNext(response.next_cursor);
    };
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    const response = await getImages(next);
    setImageList((currentImageList) => [
      ...currentImageList,
      ...response.resources,
    ]);
    setNext(response.next_cursor);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await searchImages(searchValue, next);
    setImageList(response.resources);
    setNext(response.next_cursor);
  };

  const clearSearch = async () => {
    const response = await getImages();
    setImageList(response.resources);
    setNext(response.next_cursor);
    setSearchValue("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter Search Value"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={clearSearch}>
          Clear
        </button>
      </form>
      <div className="image-grid">
        {imageList.map((img) => {
          return <img src={img.url} alt={img.public_id} />;
        })}
      </div>
      <div className="footer">
        {next && <button onClick={handleLoadMore}>Load More</button>}
      </div>
    </>
  );
}

export default App;
