import React from 'react';

const FormSummary = ({ values, onBack }) => {
  return (
    <div className="summary">
      <h2>Application Summary</h2>
      <p><strong>Full Name:</strong> {values.fullName}</p>
      <p><strong>Email:</strong> {values.email}</p>
      <p><strong>Phone Number:</strong> {values.phoneNumber}</p>
      <p><strong>Position:</strong> {values.position}</p>
      {(values.position === 'Developer' || values.position === 'Designer') && (
        <p><strong>Relevant Experience:</strong> {values.relevantExperience} years</p>
      )}
      {values.position === 'Designer' && (
        <p><strong>Portfolio URL:</strong> {values.portfolioUrl}</p>
      )}
      {values.position === 'Manager' && (
        <p><strong>Management Experience:</strong> {values.managementExperience}</p>
      )}
      <p><strong>Additional Skills:</strong> {values.skills.join(', ')}</p>
      <p><strong>Preferred Interview Time:</strong> {values.interviewTime.toString()}</p>
      <button onClick={onBack} className="back-button">Back to Form</button>
    </div>
  );
};

export default FormSummary;