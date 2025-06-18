import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ImageViewerPage = () => {
  const { studyUID, seriesUID } = useParams();
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `https://dicom-fastapi.fly.dev/get_image_urls/${studyUID}/${seriesUID}`;

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setImageUrls(data.image_urls || []);
      } catch (error) {
        console.error("Failed to load image URLs:", error);
        setImageUrls([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImageUrls();
  }, [studyUID, seriesUID]);

  const handlePrint = () => {
    window.print();
  };
  console.log(imageUrls);
  return (
    <div style={styles.container}>
      <h2 className="no-print" style={styles.title}>Images</h2>

      {loading ? (
        <p className="no-print" style={styles.status}>Loading images...</p>
      ) : imageUrls.length > 0 ? (
        <div style={styles.imageGrid}>
          {imageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`DICOM ${index}`}
              style={styles.image}
              className="print-image"
            />
          ))}
        </div>
      ) : (
        <p className="no-print" style={styles.status}>No images found.</p>
      )}

      <div className="no-print" style={styles.buttons}>
        <button onClick={handlePrint} style={styles.button}>🖨️ Print Images</button>
        <button onClick={() => navigate(-1)} style={{ ...styles.button, backgroundColor: '#ccc', color: '#333' }}>
          ⬅️ Back to Report
        </button>
      </div>

      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            img.print-image {
              page-break-inside: avoid;
              break-inside: avoid;
              max-width: 100%;
              margin: 20px 0;
              border: none;
              border-radius: 0;
            }
            body {
              margin: 0;
              padding: 0;
              background: white;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  status: {
    fontSize: '18px',
    color: '#666',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  image: {
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    objectFit: 'contain',
    backgroundColor: '#fff',
    padding: '10px'
  },
  buttons: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  }
};

export default ImageViewerPage;
