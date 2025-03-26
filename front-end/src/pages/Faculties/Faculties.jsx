import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/GreenOval.jpg"; // Correct image import


const Faculties = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/faculties`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const facultiesData = await response.json();
        setFaculties(facultiesData);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <h1 style={styles.header}>Faculties</h1>
      <div style={styles.grid}>
        {faculties.map((faculty) => (
          <Link
            key={faculty._id}
            to={`/faculties/${faculty._id}`}
            style={{ textDecoration: "none", position: "relative", zIndex: 2 }}
          >
            <div
              className="faculty-card"
              style={{ ...styles.card, backgroundColor: faculty.color || "#9c324f" }}
            >
              <h2 style={styles.text}>{faculty.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    width: "100%",
    backgroundColor: "rgba(132, 4, 50, 0.5)",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(167, 97, 117, 0.5)",
    zIndex: 1,
  },
  header: {
    fontSize: "100px",
    marginBottom: "70px",
    fontFamily: "Impact, fantasy",
    color: "white",
    zIndex: 2,
    position: "relative",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "15px",
    maxWidth: "100%",
    padding: "10px",
    margin: "0 auto",
    zIndex: 2,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "180px",
    borderRadius: "15px",
    textDecoration: "none",
    boxSizing: "border-box",
    transition: "transform 0.3s ease",
    zIndex: 2,
  },
  text: {
    color: "white",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "New Century Schoolbook, TeX Gyre Schola, serif",
  },
};

export default Faculties;
