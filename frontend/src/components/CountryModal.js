import React from "react";

function CountryModal({ country, onClose }) {
  if (!country) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>X</button>

        <h2>{country.name}</h2>
        <img src={country.flag} alt="" className="modal-flag" />

        <p>Capital: {country.capital}</p>
        <p>Region: {country.region}</p>
        <p>Population: {country.population?.toLocaleString()}</p>
      </div>
    </div>
  );
}

export default CountryModal;