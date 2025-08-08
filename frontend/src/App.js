import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemsTable from "./components/ItemsTable";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItemName, setNewItemName] = useState("");

  const API_URL = "http://localhost:8000/items";

  const fetchItems = () => {
    setLoading(true);
    axios.get(API_URL)
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch items");
        setLoading(false);
      });
  };

  const createItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    axios.post(API_URL, { name: newItemName })
      .then(() => {
        setNewItemName("");
        fetchItems();
      })
      .catch(() => {
        alert("Failed to create item");
      });
  };

  const deleteItem = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        fetchItems();
      })
      .catch(() => {
        alert("Failed to delete item");
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Create Item Form */}
      <form onSubmit={createItem} className="flex gap-2 mb-6">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </form>

      {/* Items Table */}
      <ItemsTable items={items} onDelete={deleteItem} />
    </div>
  );
}

export default App;
