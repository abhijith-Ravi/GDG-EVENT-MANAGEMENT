
  async function loadEvents() {
    const url = "http://localhost:8080/api/upcomingEvents";
    const eventsContainer = document.getElementById("events-container");

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // Check for server response errors
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.status} ${response.statusText}`);
      }

      const events = await response.json();

      // Clear existing events (if any)
      eventsContainer.innerHTML = '';

      // Iterate through the events and create HTML for each one
      events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        eventCard.innerHTML = `
          <img src="HACK.jpg" alt="${event.event_name}" class="event-image">
          <h3 class="event-title">${event.event_name}</h3>
          <p class="event-date">Date: ${new Date(event.date).toLocaleDateString()}</p>
          <p class="event-date">Time: ${new Date(event.date).toLocaleTimeString()}</p>
          <p class="event-location">Location: ${event.location}</p>
          <p class="event-description">${event.description}</p>
        `;

        eventsContainer.appendChild(eventCard);
      });
    } catch (error) {
      console.error("Failed to load events:", error);
      eventsContainer.innerHTML = '<p>Error loading events. Please try again later.</p>';
    }
  }



  
  async function loadpastEvents() {
    const url = "http://localhost:8080/api/pastEvents";
    const pasteventscontainer = document.getElementById("past-events-container");

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      // Check for server response errors
      if (!response.ok) {
        throw new Error(`Error fetching events: ${response.status} ${response.statusText}`);
      }

      const pevents = await response.json();

      // Clear existing events (if any)
      pasteventscontainer.innerHTML = '';

      // Iterate through the events and create HTML for each one
      pevents.forEach(event => {
        const peventCard = document.createElement('div');
        peventCard.classList.add('event-card');

        peventCard.innerHTML = `
          
      <img src="ph3.png" alt="Past Event 1" class="event-image">
      <h3 class="event-title">${event.event_name}</h3>
      <p class="event-date">Held on: ${event.date}</p>
      <p class="event-description">${event.description}  
        `;

        pasteventscontainer.appendChild(peventCard);
      });
    } catch (error) {
      console.error("Failed to load events:", error);
      eventsContainer.innerHTML = '<p>Error loading events. Please try again later.</p>';
    }
  }

  // Call loadEvents when the page loads
  document.addEventListener("DOMContentLoaded", loadEvents);

  document.addEventListener("DOMContentLoaded", loadpastEvents);


  document.addEventListener("DOMContentLoaded", function () {
    const userType = localStorage.getItem("usertype");
    
    const deleteButton = document.querySelector(".deletebutton");
    const deleteButton1 = document.querySelector(".deletebutton1");

    const deleteButton2 = document.querySelector(".deletebutton2");
    const deleteButtonr=document.querySelector(".delete-buttonR")


    if (userType === "student") {
        deleteButton.disabled = true; // Disables the button for student user type
        deleteButton.style.pointerEvents = "none"; // Prevents clicks on the button
        deleteButton.style.opacity = "0";
        deleteButton1.disabled = true; // Disables the button for student user type
        deleteButton1.style.pointerEvents = "none"; // Prevents clicks on the button
        deleteButton1.style.opacity = "0"; 
        deleteButton2.disabled = true; // Disables the button for student user type
        deleteButton2.style.pointerEvents = "none"; // Prevents clicks on the button
        deleteButton2.style.opacity = "0";  // Optional: Visually indicate it's disabled
    }else{
      deleteButtonr.disabled = true; // Disables the button for student user type
        deleteButtonr.style.pointerEvents = "none"; // Prevents clicks on the button
        deleteButtonr.style.opacity = "0"; 
    }
});


