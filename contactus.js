
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstNamecontact = document.querySelector("#firstNamecontact").value.trim();
  const lastNamecontact = document.querySelector("#lastNamecontact").value.trim();
  const emailContact = document.querySelector("#emailContact").value.trim();
  const phoneContact = document.querySelector("#phoneContact").value.trim();
  const textArea = document.querySelector("#textArea").value;
  const errorContact = document.querySelector("#errorContact");

  errorContact.textContent = "";

  if (!firstNamecontact || !lastNamecontact || !emailContact || !phoneContact || !textArea) {
    errorContact.textContent = "Please fill all entries.";
    return;
  }

  const emailPatternContact = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/;
  if (!emailContact.match(emailPatternContact)) {
    errorContact.textContent = "Invalid email format.";
    return;
  }

  const phonePatternContact = /^\d{10,}$/;
  const numericPhoneContact = phoneContact.replace(/\D/g, "");
  if (!numericPhoneContact.match(phonePatternContact)) {
    errorContact.textContent = "Enter a valid phone number with at least 10 digits.";
    return;
  }

  if (!isNaN(firstNamecontact)) {
    errorContact.textContent = "Please enter a valid first name.";
    return;
  }

  if (!isNaN(lastNamecontact)) {
    errorContact.textContent = "Please enter a valid last name.";
    return;
  }

  alert("Message sent successfully!");
});
const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.parentElement.querySelector(".faq-answer");
    const isActive = question.classList.contains("active");

    // Collapse all other answers
    document.querySelectorAll(".faq-answer").forEach((el) => {
      el.style.maxHeight = null;
      el.parentElement.querySelector(".faq-question").classList.remove("active");
    });

    // Toggle current one
    if (!isActive) {
      question.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      question.classList.remove("active");
      answer.style.maxHeight = null;
    }
  });
});

});
 const hamburger = document.querySelector(".hamburger");
  const items = document.querySelector(".items");

  hamburger.addEventListener("click", () => {
    items.classList.toggle("active");
  });





