import { db, collection, addDoc } from './firebase-config.js';


document.addEventListener("DOMContentLoaded", function () {
    console.log("Fetching leads...");

    const inputEl = document.querySelector("#input-el");
    const titleEl = document.querySelector("#title-el");
    const categoryEl = document.querySelector("#category-el");
    const notesEl = document.querySelector("#notes-el");
    const inputBtn = document.querySelector("#input-btn");
    const tabBtn = document.querySelector("#tab-btn");
    const deleteBtn = document.querySelector("#delete-btn");
    const uLEl = document.querySelector("#ul-el");

    let myLeads = JSON.parse(localStorage.getItem("myLeads")) || [];

    // Function to save manually entered lead to Firestore
    async function saveLeadToFirestore(url, title, category, notes) {
      try {
        await addDoc(collection(db, "leads"), {
          url: url,
          title: title,
          category: category,
          notes: notes,
          timestamp: new Date(),
        });
        console.log("Lead saved to Firestore successfully!");
      } catch (e) {
        console.error("Error adding lead to Firestore: ", e);
      }
    }

    inputBtn.addEventListener("click", () => {
        const leadURL = inputEl.value;
        const leadTitle = titleEl.value || "Untitled Lead";
        const leadCategory = categoryEl.value;
        const leadNotes = notesEl.value;

        if (leadURL) {
          const lead = { url: leadURL, title: leadTitle, category: leadCategory, notes: leadNotes };
          myLeads.unshift(lead);
          localStorage.setItem("myLeads", JSON.stringify(myLeads));
          renderLeads();
          clearFields();
          // Save to Firestore
          saveLeadToFirestore(leadURL, leadTitle, leadCategory, leadNotes);
        }
    });

    function renderLeads() {
        uLEl.innerHTML = "";
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
        categoryEl.value = "Business"; // Default
        notesEl.value = "";
    }

    renderLeads();
});
