import React, { useEffect, useState } from "react";
import { getAllCountries, searchCountries } from "../services/countryService";
import CountryModal from "../components/CountryModal";

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
      console.error(error);
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>Countries Explorer</h1>
        <p>Browse countries, search instantly, and view details in a clean popup.</p>
        <input
          type="text"
          placeholder="Search country..."
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
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
              {countries.map((c, i) => (
                <tr key={i} onClick={() => setSelectedCountry(c)}>
                  <td>
                    <img src={c.flag} alt="" className="flag" />
                  </td>
                  <td>{c.name}</td>
                  <td>{c.capital}</td>
                  <td>{c.region}</td>
                  <td>{c.population?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
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