import React, { useState } from "react";
import emailjs from "emailjs-com";
import './Feedback.css';


// Github has been DISABLED due to lack of maintenance for API key available
function Feedback() {
  // const GITHUB_REPO = process.env.REACT_APP_GITHUB_REPO;
  // const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAIL_ID = process.env.REACT_APP_EMAILJS_USER_ID;

  const [formData, setFormData] = useState({
    title: "",
    type: "Bug or Error",
    description: "",
  });

  const isFormValid = formData.title.trim() !== "" && formData.description.trim() !== "";

  const handleInputChange = (input) => {
    setFormData({ ...formData, [input.target.name]: input.target.value });
  };

  const handleFeedbackSubmit = async (input) => {
    input.preventDefault();
    // if (formData.type === "Bug or Error") {
    //   await createGitHubIssue();
    // } else {
      await sendEmail();
    // }
    setFormData({
      title: "",
      type: "Bug or Error",
      description: "",
    });
  };

  // const createGitHubIssue = async () => {
  //   try {
  //     const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `token ${GITHUB_TOKEN}`,
  //         Accept: "application/vnd.github.v3+json",
  //       },
  //       body: JSON.stringify({
  //         title: formData.title,
  //         body: formData.description,
  //       }),
  //     });

  //     if (response.ok) {
  //       alert(`Bug sent successfully!`);
  //     } else {
  //       alert("Bug was not sent! Please try again later.")
  //     }
  //   } catch (error) {
  //     //console.error("GitHub Issue Error: ", error);
  //     alert("Bug was not sent! Please try again later.")
  //   }
  // };

  const sendEmail = async () => {
    const templateParams = {
      title: formData.title,
      type: formData.type,
      message: formData.description,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, EMAIL_ID);
      alert("Email sent successfully!");
    } catch (error) {
      // console.error("Email Error: ", error);
      alert("Email was not sent! The inbox may be full. Please try again tomorrow.");
    }
  };

  return (
    <div className='feedback-container'>
      <div className='feedback-content box-border'>
        <h2>Submit an Issue</h2>
        <div className='feedback-form'>
          <input
            name="title"
            placeholder="Title of Feedback"
            value={formData.title}
            onChange={handleInputChange}
            required />
          <select name="type"
          value={formData.type}
          onChange={handleInputChange}>
            <option value="Bug or Error">Bug or Error</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="description"
            placeholder="Description of feedback, bugs etc."
            value={formData.description}
            onChange={handleInputChange}
            required />
          <button className='feedback-button primary-button' onClick={handleFeedbackSubmit} disabled={!isFormValid}>
                Submit Feedback!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
