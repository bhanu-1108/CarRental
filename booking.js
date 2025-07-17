document.addEventListener("DOMContentLoaded", function () {
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    const bookingData = JSON.parse(localStorage.getItem("data"));

    let rentalPrice = 0;
    let durationInDays = 1; 
    const fixedFees = 32;

    // Option checkboxes
    const fullCoverage = document.getElementById("full");
    const childSeat = document.getElementById("child");
    const gps = document.getElementById("gps");

    const fn = document.getElementById("first-name");
    const ln = document.getElementById("last-name");
    const Ed = document.getElementById("email");
    const pn = document.getElementById("phone");
    const ad = document.getElementById("age");
    const ld = document.getElementById("license");

    if (selectedCar && bookingData) {
      document.querySelector(".selected-car-card img").src = selectedCar.image_url;
      document.querySelector(".selected-car-card img").alt = selectedCar.car_name;
      document.querySelector(".car-info h2").innerHTML = `${selectedCar.car_name} <small>or similar</small>`;
      document.querySelector(".car-type-tag").textContent = selectedCar.car_type;

      const featuresHTML = `
        <span><i class="fas fa-user-friends"></i> ${selectedCar.seats} Seats</span>
        <span><i class="fas fa-suitcase-rolling"></i> ${selectedCar.bags} Bags</span>
        <span><i class="fas fa-cogs"></i> ${selectedCar.transmisson}</span>
        <span><i class="fas fa-gas-pump"></i> ${selectedCar.fuel_type}</span>
        <span><i class="fas fa-snowflake"></i> A/C</span>
      `;
      document.querySelector(".features").innerHTML = featuresHTML;

      // Calculate rental duration
      const start = new Date(`${bookingData.pickupDate}T${bookingData.pickupTime}`);
      const end = new Date(`${bookingData.returnDate}T${bookingData.returnTime}`);
      const durationInMs = end - start;
      const durationInHours = Math.ceil(durationInMs / (1000 * 60 * 60));
      durationInDays = Math.max(1, Math.ceil(durationInHours / 24));

      rentalPrice = selectedCar.price_per_hour * durationInHours;

      updatePriceSummary();
    }

    if (bookingData) {
      document.getElementById("pickup-location").textContent = selectedCar?.owner_address || "Not Available";
      document.getElementById("pickup-datetime").textContent = `${bookingData.pickupDate} | ${bookingData.pickupTime}`;
      document.getElementById("dropoff-datetime").textContent = `${bookingData.returnDate} | ${bookingData.returnTime}`;
    }

    fullCoverage.addEventListener("change", updatePriceSummary);
    childSeat.addEventListener("change", updatePriceSummary);
    gps.addEventListener("change", updatePriceSummary);

    function updatePriceSummary() {
      const insuranceCost = fullCoverage.checked ? 300 * durationInDays : 0;
      const childSeatCost = childSeat.checked ? 400 * durationInDays : 0;
      const gpsCost = gps.checked ? 450 * durationInDays : 0;
      const total = rentalPrice + insuranceCost + childSeatCost + gpsCost + fixedFees;

      const rentalLabel = durationInDays > 1
        ? `Car Rental (${durationInDays} days)`
        : `Car Rental (${durationInDays} day)`;

      const summaryContainer = document.querySelector(".price-summary");
      summaryContainer.innerHTML = `
        <h3>Price Summary</h3>
        <p>${rentalLabel} <span id="car-price">₹${rentalPrice}</span></p>
        <p>Full Coverage Insurance <span>₹${insuranceCost}</span></p>
        <p>Child Seat <span>₹${childSeatCost}</span></p>
        <p>GPS Navigation <span>₹${gpsCost}</span></p>
        <p>Taxes & Fees <span>₹${fixedFees}</span></p>
        <hr />
        <p class="total">Total <span id="total-price">₹${total}</span></p>
        <button class="pay-btn">💳 Proceed to Payment</button>
        <p class="terms">
          By clicking this button, you agree to our
          <a href="termsofservice.html">Terms & Conditions</a> and <a href="privacy-policy.html">Privacy Policy</a>.
        </p>
      `;

      // 🔥 Re-attach event listener to the new button
      const newPayButton = document.querySelector(".pay-btn");
      newPayButton.addEventListener("click", handlePaymentClick);
    }

    function handlePaymentClick(e) {
      e.preventDefault();

      const firstName = fn.value.trim();
      const lastName = ln.value.trim();
      const email = Ed.value.trim();
      const phoneNumber = pn.value.trim();
      const age = ad.value.trim();
      const licenseNumber = ld.value.trim();

      if (!firstName) return alert("❌ First name is required.");
      if (!lastName) return alert("❌ Last name is required.");
      if (!email) return alert("❌ Email is required.");
      if (!phoneNumber) return alert("❌ Phone number is required.");
      if (!age) return alert("❌ Age is required.");
      if (!licenseNumber) return alert("❌ License number is required.");

      if (!isNaN(firstName)) return alert("❌ First name must contain letters.");
      if (!isNaN(lastName)) return alert("❌ Last name must contain letters.");

      const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
      if (!email.match(emailPattern)) return alert("❌ Invalid email format.");

      const phonePattern = /^\d{10}$/;
      if (!phoneNumber.match(phonePattern)) return alert("❌ Phone number must be exactly 10 digits.");

      if (parseInt(age) < 18) return alert("❌ Driver must be at least 18 years old.");

      const bookingInfo = {
        firstName, lastName, email, phoneNumber, age, licenseNumber,
        selectedCar, bookingData
      };

      localStorage.setItem("BookingInfo", JSON.stringify(bookingInfo));
      window.location.href = "payment.html";
    }

    // 📌 Attach initial event listener for the first load
    const initialPayButton = document.querySelector(".pay-btn");
    if (initialPayButton) {
      initialPayButton.addEventListener("click", handlePaymentClick);
    }
   
});
 const hamburger = document.querySelector('.hamburger');
  const navItems = document.getElementById('nav-items');

  hamburger.addEventListener('click', () => {
    navItems.classList.toggle('active');
  });

 