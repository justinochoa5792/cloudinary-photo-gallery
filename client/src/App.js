import { useState, useEffect } from "react";
import "./App.css";
import { getImages } from "./api";

function App() {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getImages();
      setImageList(response.resources);
    };
    fetchData();
  }, []);

  return (
    <div className="image-grid">
      {imageList.map((img) => {
        return <img src={img.url} alt={img.public_id} />;
      })}
    </div>
  );
}

export default App;
