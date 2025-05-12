import React, { useRef } from 'react';
import DownloadPdfButton from './DownloadPdfButton'; // Import the DownloadPdfButton component
const ReportDetails = ({ record, report, center }) => {
  const reportRef = useRef(); // Create a ref for the report content
  return (
    <div ref={reportRef} style={styles.container}>
      <h2 style={styles.title}>{center?.data?.centerName || 'No Center Name'}</h2>

      <div style={styles.row}>
        <div style={styles.item}>
          <strong>Patient Name:</strong> {record.patient_name || 'N/A'}
        </div>
        <div style={styles.item}>
          <strong>Age:</strong> {record.age || 'N/A'}
        </div>

      </div>
      <div style={styles.row}>
        <div style={styles.item}>
          <strong>Gender:</strong> {record.sex || 'N/A'}
        </div>
        <div style={styles.item}>
          <strong>Report Status:</strong> {report?.result || 'N/A'}
        </div>
      </div>
      <div style={styles.row}>
        <div style={styles.item}>
          <strong>Created At:</strong> {new Date(report?.createdAt).toLocaleDateString() || 'N/A'}
        </div>
        <div style={styles.item}>
          <strong>Body Part:</strong> {record.body_part_examined || 'N/A'}
        </div>
      </div>

      <div style={styles.section}>
        <strong>Findings:</strong>
        <p>{report?.diagnosisReportFinding || 'No findings yet.'}</p>
      </div>

      <div style={styles.section}>
        <strong>Impression:</strong>
        <p>{report?.diagnosisReportImpration || 'No impression yet.'}</p>
      </div>

      <div style={styles.section}>
        <strong>Comment:</strong>
        <p>{report?.diagnosisReportComment || 'No comments yet.'}</p>
      </div>

      {/* Add the Download PDF button */}
      <DownloadPdfButton
        targetRef={reportRef}
        fileName="diagnosis_report.pdf"
      />
    </div>

  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  title: {
    fontSize: '1.8rem',
    textAlign: 'center',
    marginBottom: '10px',
    color: '#333',
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'space-between',
  },
  item: {
    flex: '1 1 20%',
    background: '#f5f5f5',
    padding: '10px 15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    minWidth: '300px',
  },
  section: {
    background: '#fdfdfd',
    padding: '15px 20px',
    borderRadius: '8px',
    border: '1px solid #ddd',
  },
};

export default ReportDetails;
