
document.querySelector(".signup-form").addEventListener("submit", function (e) {
  e.preventDefault();})
const btn=document.querySelector(".btn")
btn.addEventListener("click",()=>{
   const username = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();
  const phone = document.querySelector("#phone-number").value.trim();
  const password = document.querySelector("#password").value;
  const termsChecked = document.querySelector("#terms").checked;
  const error = document.querySelector(".error");
  
  error.textContent = "";
  localStorage.setItem("User",JSON.stringify({username,email,password}))

  // Validations
  if (!username || !email || !phone || !password) {
    error.textContent
    error.textContent = "All fields are required.";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/;
  if (!email.match(emailPattern)) {
    error.textContent = "Invalid email format.";
    return;
  }

  if (password.length < 8) {
    error.textContent = "Password must be at least 8 characters.";
    return;
  }

  const phonePattern = /^\d{10,}$/;
  const numericPhone = phone.replace(/\D/g, "");
  if (!numericPhone.match(phonePattern)) {
    error.textContent = "Enter a valid phone number with at least 10 digits.";
    return;
  }

  if (!isNaN(username)) {
    error.textContent = "Please enter a valid name.";
    return;
  }

  if (!termsChecked) {
    error.textContent = "You must accept the Terms and Privacy Policy.";
    return;
  }

alert("Registration Done Sucessfully")
window.location.href = "signin.html"; // Redirect to main page

})
 