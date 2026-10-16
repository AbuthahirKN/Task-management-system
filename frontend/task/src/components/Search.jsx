
import React, { useEffect, useState } from "react";
import { searchdetail } from "../services/apicall";
import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation();

  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const queryParams = new URLSearchParams(location.search);

  const title = queryParams.get("title") || "";
  const status = queryParams.get("status") || "";
  const priority = queryParams.get("priority") || "";

  useEffect(() => {
    async function searchtask() {
      try {
        setLoading(true);
        setMessage("");

        const res = await searchdetail({
          title,
          status,
          priority,
        });
        console.log(res.data)
        if (Array.isArray(res.data)) {
          setTask(res.data);
          
          if (res.data.length === 0) {
            setMessage("No search results found");
          }
        } else {
          setTask([]);
          setMessage(
            res.data.msg || "No search results found"
          );
        }
      } catch (error) {
        console.log(error);
        setTask([]);
        setMessage("Unable to fetch tasks");
      } finally {
        setLoading(false);
      }
    }

    searchtask();
  }, [location.search]);

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center">Search Results</h2>

        {loading ? (
          <p>Loading...</p>
        ) : task.length > 0 ? (
          task.map((item) => (
            <div className="card p-3 mb-3" key={item.id}>
              <h3>{item.title}</h3>
              <p>Description: {item.description}</p>
              <p>Status: {item.status}</p>
              <p>Priority: {item.priority}</p>
              <p>Created at: {item.created_at}</p>
              <p>Due at: {item.due_at}</p>
            </div>
          ))
        ) : (
          <p className="text-center">{message}</p>
        )}
      </div>
    </>
  );
}

export default Search;
