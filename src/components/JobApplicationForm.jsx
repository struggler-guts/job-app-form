import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useForm from '../hooks/useForm';
import FormSummary from './FormSummary';

const initialState = {
  fullName: '',
  email: '',
  phoneNumber: '',
  position: '',
  relevantExperience: '',
  portfolioUrl: '',
  managementExperience: '',
  skills: [],
  interviewTime: null
};

const validate = (values) => {
  let errors = {};
  
  if (!values.fullName) {
    errors.fullName = 'Full Name is required';
  }
  
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Number is required';
  } else if (!/^\d+$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'Phone Number must be a valid number';
  }
  
  if (values.position === 'Developer' || values.position === 'Designer') {
    if (!values.relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if (parseInt(values.relevantExperience) <= 0) {
      errors.relevantExperience = 'Relevant Experience must be greater than 0';
    }
  }
  
  if (values.position === 'Designer' && !values.portfolioUrl) {
    errors.portfolioUrl = 'Portfolio URL is required';
  } else if (values.portfolioUrl && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioUrl)) {
    errors.portfolioUrl = 'Portfolio URL must be a valid URL';
  }
  
  if (values.position === 'Manager' && !values.managementExperience) {
    errors.managementExperience = 'Management Experience is required';
  }
  
  if (values.skills.length === 0) {
    errors.skills = 'At least one skill must be selected';
  }
  
  if (!values.interviewTime) {
    errors.interviewTime = 'Preferred Interview Time is required';
  }
  
  return errors;
};

const JobApplicationForm = () => {
  const { handleChange, handleSubmit, values, errors, isSubmitting, setValues } = useForm(initialState, validate);
  const [showSummary, setShowSummary] = useState(false);

  const handleSkillChange = (skill) => {
    const updatedSkills = values.skills.includes(skill)
      ? values.skills.filter(s => s !== skill)
      : [...values.skills, skill];
    setValues({ ...values, skills: updatedSkills });
  };

  const handleDateChange = (date) => {
    setValues({ ...values, interviewTime: date });
  };

  const onSubmit = (e) => {
    handleSubmit(e);
    if (Object.keys(validate(values)).length === 0) {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    setShowSummary(false);
  };

  return (
    <div className="form-container">
      <h1>Job Application Form</h1>
      {!showSummary ? (
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="position">Applying for Position</label>
            <select
              id="position"
              name="position"
              value={values.position}
              onChange={handleChange}
            >
              <option value="">Select a position</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {(values.position === 'Developer' || values.position === 'Designer') && (
            <div className="form-group">
              <label htmlFor="relevantExperience">Relevant Experience (years)</label>
              <input
                type="number"
                id="relevantExperience"
                name="relevantExperience"
                value={values.relevantExperience}
                onChange={handleChange}
              />
              {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
            </div>
          )}

          {values.position === 'Designer' && (
            <div className="form-group">
              <label htmlFor="portfolioUrl">Portfolio URL</label>
              <input
                type="url"
                id="portfolioUrl"
                name="portfolioUrl"
                value={values.portfolioUrl}
                onChange={handleChange}
              />
              {errors.portfolioUrl && <p className="error">{errors.portfolioUrl}</p>}
            </div>
          )}

          {values.position === 'Manager' && (
            <div className="form-group">
              <label htmlFor="managementExperience">Management Experience</label>
              <textarea
                id="managementExperience"
                name="managementExperience"
                value={values.managementExperience}
                onChange={handleChange}
              />
              {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
            </div>
          )}

          <div className="form-group">
            <label>Additional Skills</label>
            <div className="checkbox-group">
              {['JavaScript', 'CSS', 'Python', 'React', 'Node.js'].map(skill => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    checked={values.skills.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>
            {errors.skills && <p className="error">{errors.skills}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="interviewTime">Preferred Interview Time</label>
            <DatePicker
              selected={values.interviewTime}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit Application
          </button>
        </form>
      ) : (
        <FormSummary values={values} onBack={handleBack} />
      )}
    </div>
  );
};

export default JobApplicationForm;