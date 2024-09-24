// Import files from firebaseConfig.js
import { firebaseConfig } from './config.js'; // Adjust path if necessary
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


document.addEventListener("DOMContentLoaded", function () {
  const inputEl = document.querySelector("#input-el"); // URL input
  const titleEl = document.querySelector("#title-el"); // Title input
  const categoryEl = document.querySelector("#category-el"); // Category dropdown
  const notesEl = document.querySelector("#notes-el"); // Notes textarea
  const inputBtn = document.querySelector("#input-btn");
  const tabBtn = document.querySelector("#tab-btn");
  const deleteBtn = document.querySelector("#delete-btn");
  const uLEl = document.querySelector("#ul-el"); // Assume you have this UL for displaying leads

  let myLeads = JSON.parse(localStorage.getItem("myLeads")) || [];

  // Save the manually entered lead
  inputBtn.addEventListener("click", () => {
    const leadURL = inputEl.value;
    const leadTitle = titleEl.value || "Untitled Lead"; // Fallback to 'Untitled Lead'
    const leadCategory = categoryEl.value;
    const leadNotes = notesEl.value;

    if (leadURL) {
      const lead = {
        url: leadURL,
        title: leadTitle,
        category: leadCategory,
        notes: leadNotes,
      };

      myLeads.unshift(lead);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      renderLeads();
      clearFields();
    }
  });

  // Save the current page as a lead when "Save Tab" is clicked
  tabBtn.addEventListener("click", () => {
    const leadURL = window.location.href; // Get current page's URL
    const leadTitle = titleEl.value || "Untitled Lead"; // Fallback to 'Untitled Lead'
    const leadCategory = categoryEl.value;
    const leadNotes = notesEl.value;

    const lead = {
      url: leadURL,
      title: leadTitle,
      category: leadCategory,
      notes: leadNotes,
    };

    myLeads.unshift(lead);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
    clearFields();
  });

  function renderLeads() {
    uLEl.innerHTML = ""; // Clear UL before rendering
  
    myLeads.forEach((lead) => {
      const liEl = document.createElement("li");
  
      liEl.innerHTML = `
        <div style="margin-bottom: 10px;">
          <strong>${lead.title}</strong> - 
          <a href="${lead.url}" target="_blank">${lead.url}</a>
        </div>
        <div>
          <em>Category:</em> ${lead.category}
        </div>
        <div>
          <p><em>Notes:</em> ${lead.notes}</p>
        </div>
      `;
  
      uLEl.appendChild(liEl);
    });
  }

  function clearFields() {
    inputEl.value = "";
    titleEl.value = "";
    categoryEl.value = "Business"; // Reset to default category
    notesEl.value = "";
  }

  // Here is where we implement the DELETE ALL button functionality
  deleteBtn.addEventListener("click", () => {
    // Clear all leads from localStorage
    localStorage.clear();
    // Empty the leads array
    myLeads = [];
    // Re-render the empty list
    renderLeads();
  });

  renderLeads(); // Load existing leads on page load
});
