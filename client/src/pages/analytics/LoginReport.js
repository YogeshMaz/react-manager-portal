import React, { useEffect, useState } from "react";
import axios from "axios";

const LoginReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getUsers");
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch data. Network error.");
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {data.length === 0 ? (
        <h2>No data available</h2>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Login Pin</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Emp ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date of Birth</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date of Joining</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Phone</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Address</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Depatment</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Vertical</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Active status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((eachRec) => (
              <tr key={eachRec._id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec.Name}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec['Login Pin']}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec['Emp ID']}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec['Date of Birth']}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec['Date of Joining']}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec.Email}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec.Phone}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec.Address}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec.Department}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec.Vertical}</td> 
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{eachRec.Active}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoginReport;
