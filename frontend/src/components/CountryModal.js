import React from "react";
import "../App.css";

function CountryModal({ country, onClose }) {
  if (!country) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="modal-content">
          <img
            src={country.flag}
            alt={country.name}
            className="modal-flag"
          />

          <h2>{country.name}</h2>
          <p><strong>Capital:</strong> {country.capital || "N/A"}</p>
          <p><strong>Region:</strong> {country.region || "N/A"}</p>
          <p><strong>Population:</strong> {country.population?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}

export default CountryModal;