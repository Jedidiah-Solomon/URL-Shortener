document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  setTimeout(() => {
    console.log("Hiding splash screen");
    document.getElementById("splash-screen").style.display = "none";
    document.querySelector(".container").classList.remove("hidden");
  }, 5000);

  document.getElementById("urlForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const urlInput = document.getElementById("urlInput").value;
    const resultDiv = document.getElementById("result");
    const shortUrlElement = document.getElementById("shortUrl");
    const errorDiv = document.getElementById("error");

    // Clear previous results or errors
    shortUrlElement.href = "#";
    shortUrlElement.textContent = "";
    errorDiv.textContent = "";

    // Simple URL validation regex
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;

    if (!urlPattern.test(urlInput)) {
      resultDiv.classList.add("hidden");
      errorDiv.classList.remove("hidden");
      errorDiv.textContent = "Invalid URL. Please enter a valid URL.";
      return;
    }

    try {
      const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(
        urlInput
      )}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      shortUrlElement.href = data.shorturl;
      shortUrlElement.textContent = data.shorturl;
      resultDiv.classList.remove("hidden");
      errorDiv.classList.add("hidden");
    } catch (error) {
      alert("Error: " + error.message);
      console.log(error.message);
    }
  });
});
