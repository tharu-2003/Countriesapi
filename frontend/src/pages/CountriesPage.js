import React, { useEffect, useState } from "react";
import { getAllCountries, searchCountries } from "../services/countryService";
import CountryModal from "../components/CountryModal";
import "../App.css";

function CountriesPage() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  const loadCountries = async () => {
    try {
      setLoading(true);
      const response = await getAllCountries();
      setCountries(response.data);
    } catch (error) {
      console.error("Error loading countries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    try {
      if (value.trim() === "") {
        await loadCountries();
      } else {
        setLoading(true);
        const response = await searchCountries(value);
        setCountries(response.data);
      }
    } catch (error) {
      console.error("Error searching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="content-card">
        <h1 className="title">Countries Explorer</h1>
        <p className="subtitle">Search and view country details</p>

        <input
          type="text"
          placeholder="Search by country name..."
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />

        {loading ? (
          <p className="status-text">Loading countries...</p>
        ) : (
          <div className="table-wrapper">
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
                      className="table-row"
                    >
                      <td>
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="flag-image"
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
          </div>
        )}

        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
        />
      </div>
    </div>
  );
}

export default CountriesPage;