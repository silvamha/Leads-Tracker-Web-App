// document.addEventListener("DOMContentLoaded", function () {
//   // Step 1: Firestore setup
//   const db = firebase.firestore();

//   /**
//    * Check this code to see if it is really necessary
//    *   const collection = window.collection;
//   const addDoc = window.addDoc;
//    */


//   // Step 2: Grab the necessary elements (URL input, Name input, Save button)
//   const inputEl = document.querySelector("#input-el");
//   const inputNameEl = document.querySelector("#input-name-el");
//   const inputBtn = document.querySelector("#input-btn");

//   // Step 3: Create and append the div and ul dynamically
//   const divUlContainer = document.createElement("div");
//   document.querySelector("body").append(divUlContainer);
//   divUlContainer.setAttribute("id", "div-ul-container-el");

//   const uLEl = document.createElement("ul");
//   uLEl.setAttribute("id", "ul-el");
//   document.querySelector("#div-ul-container-el").append(uLEl);

//   // Step 4: Initialize an empty array for leads
//   let myLeads = [];

//   // Step 5: Load existing leads from Firestore when the app loads
//   db.collection("leads")
//     .get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         myLeads.push(doc.data()); // Push each lead data into the array
//       });

//       // Render the leads once the data is loaded
//       renderLeads();
//     })
//     .catch((error) => {
//       console.error("Error loading leads from Firestore: ", error);
//     });

//   // Step 6: Real-time updates with Firestore's onSnapshot
//   db.collection("leads").onSnapshot((snapshot) => {
//     myLeads = []; // Clear the existing array

//     snapshot.forEach((doc) => {
//       myLeads.push(doc.data()); // Push real-time data into the array
//     });

//     // Re-render the leads with updated data
//     renderLeads();
//   });

//   // Step 7: Function to render the leads
//   function renderLeads() {
//     uLEl.innerHTML = ""; // Clear the list before rendering

//     myLeads.forEach((lead) => {
//       const liEl = document.createElement("li"); // Create a list item (li)
//       const aEl = document.createElement("a"); // Create an anchor element

//       aEl.href = lead.url; // Set the href to the lead URL
//       aEl.textContent = lead.name; // Set the text to the lead name
//       aEl.target = "_blank"; // Open the link in a new tab

//       liEl.appendChild(aEl); // Append the anchor to the list item
//       uLEl.appendChild(liEl); // Append the list item to the UL
//     });
//   }

//   // Step 8: Add an event listener for the save button click
//   inputBtn.addEventListener("click", () => {
//     const inputValue = inputEl.value; // Get the URL value
//     const inputNameValue = inputNameEl.value; // Get the name value

//     if (inputValue && inputNameValue) {
//       // Step 9: Add a new lead to Firestore
//       db.collection("leads")
//         .add({
//           name: inputNameValue,
//           url: inputValue,
//           timestamp: new Date(), // Optional: Add timestamp for tracking
//         })
//         .then(() => {
//           console.log("Lead successfully added!");
//         })
//         .catch((error) => {
//           console.error("Error adding lead: ", error);
//         });

//       // Clear the input fields after adding the lead
//       clearFields();
//     }
//   });

//   // Step 10: Function to clear the input fields
//   function clearFields() {
//     inputEl.value = "";
//     inputNameEl.value = "";
//   }
// });

// /**!SECTION
//  * Fixes:
//  * Fix space between buttons
//  * Render data from database
//  * Implement real-time updates
//  * Implement separate JS file with Firestore setup
//  * Do not update Github until API is moved to safe place
//  */



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
