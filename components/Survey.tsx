import 'survey-core/defaultV2.min.css';
import { StylesManager } from 'survey-core';

StylesManager.applyTheme("defaultV2");
const surveyJson = {
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  };
