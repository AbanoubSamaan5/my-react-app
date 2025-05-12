import React from 'react';
import html2pdf from 'html2pdf.js';

const DownloadPdfButton = ({ targetRef, fileName = 'report.pdf', style }) => {
  const handleDownload = () => {
    const element = targetRef.current;
    const button = document.getElementById('download-button');

    // Hide the button before generating PDF
    if (button) button.style.display = 'none';

    const opt = {
      margin: 0.5,
      filename: fileName,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        // Show the button again after PDF is saved
        if (button) button.style.display = 'inline-block';
      })
      .catch(() => {
        // Ensure button is visible in case of error
        if (button) button.style.display = 'inline-block';
      });
  };

  return (
    <button
      id="download-button"
      onClick={handleDownload}
      style={{ ...defaultStyle, ...style }}
    >
      📄 Download PDF
    </button>
  );
};


const defaultStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  margin: '10px 0'
};

export default DownloadPdfButton;
