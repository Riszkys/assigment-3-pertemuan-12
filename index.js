document
  .getElementById("searchForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const countryInput = document.getElementById("country").value.trim();
    if (!countryInput) {
      alert("Please enter a country name.");
      return;
    }
    const url = `https://covid-193.p.rapidapi.com/statistics?country=${countryInput}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f4d2fcfeadmsh3e57ef76c71990fp17b131jsne13ee6ca7ce4",
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data.response && data.response.length > 0) {
        const statistics = data.response[0];
        document.getElementById("active_cases").textContent =
          statistics.cases.active || "0";
        document.getElementById("new_cases").textContent =
          statistics.cases.new || "0";
        document.getElementById("recovered_cases").textContent =
          statistics.cases.recovered || "0";
        document.getElementById("total_cases").textContent =
          statistics.cases.total || "0";
        document.getElementById("total_death").textContent =
          statistics.deaths.total || "0";
        document.getElementById("total_test").textContent =
          statistics.tests.total || "0";
      } else {
        alert("No data found for the entered country.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching data.");
    }
  });
