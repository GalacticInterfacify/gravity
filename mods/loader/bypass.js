console.log('BYPASSING PASSWORD. SCRIPT LOADED.')

// Replace the value of the password input field with the expected password
document.getElementById("passwordInput").value = "IcanStart" + new Date().getDate() + new Date().getMinutes() + "0$";

// Trigger the function to check the password
checkPassword();

console.log('BYPASS SECCESS')
