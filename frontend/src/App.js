import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/countries");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error loading countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchCountries = async (value) => {
    try {
      setLoading(true);

      if (value.trim() === "") {
        await loadCountries();
        return;
      }

      const response = await fetch(
        `http://localhost:8080/countries/search?name=${encodeURIComponent(value)}`
      );
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error searching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    await searchCountries(value);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Countries App</h1>
        <p className="subtitle">Search and view country details</p>

        <input
          type="text"
          placeholder="Search by country name..."
          value={search}
          onChange={handleSearch}
          className="search-box"
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="countries-table">
            <thead>
              <tr>
                <th>Flag</th>
                <th>Name</th>
                <th>Capital</th>
                <th>Region</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              {countries.length > 0 ? (
                countries.map((country, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedCountry(country)}
                    className="clickable-row"
                  >
                    <td>
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="flag"
                      />
                    </td>
                    <td>{country.name}</td>
                    <td>{country.capital || "N/A"}</td>
                    <td>{country.region || "N/A"}</td>
                    <td>{country.population?.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No countries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {selectedCountry && (
          <div className="modal-overlay" onClick={() => setSelectedCountry(null)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => setSelectedCountry(null)}
              >
                X
              </button>

              <h2>{selectedCountry.name}</h2>
              <img
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                className="modal-flag"
              />
              <p>
                <strong>Capital:</strong> {selectedCountry.capital || "N/A"}
              </p>
              <p>
                <strong>Region:</strong> {selectedCountry.region || "N/A"}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {selectedCountry.population?.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;