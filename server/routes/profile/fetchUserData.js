async function fetchUserData() {
    const userId = localStorage.getItem("userId"); 
    if (!userId) {
        alert("You are not logged in!");
        window.location.href = "login.html"; 
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        const user = await response.json();
        
        document.getElementById("username").textContent = user.username;
        document.getElementById("bio").textContent = user.bio || "No bio available";
        document.getElementById("profilePic").src = user.profilePic || "img/default-profile.png";
        document.getElementById("email").textContent = user.email || "No email provided";
        document.getElementById("booksLent").textContent = user.booksLent || 0;
        document.getElementById("booksAvailable").textContent = user.booksAvailable || 0;
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}


fetchUserData();