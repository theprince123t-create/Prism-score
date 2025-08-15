let matchJsonUrl = ""; // Dynamic URL from input

function setMatch() {
  const link = document.getElementById("matchLink").value;
  const matchId = link.match(/\/scorecard\/(\d+)\//);
  if (matchId) {
    matchJsonUrl = `https://cricheroes.com/match/api/${matchId[1]}`;
    fetchScore();
    alert("Match loaded! Score will update every 5 seconds.");
  } else {
    alert("Invalid CricHeroes match link!");
  }
}

async function fetchScore() {
  if (!matchJsonUrl) return;
  try {
    const response = await fetch(matchJsonUrl);
    const data = await response.json();

    document.getElementById("batsman1").innerText = data.batsmen[0]?.name || "-";
    document.getElementById("batsman2").innerText = data.batsmen[1]?.name || "-";

    document.getElementById("runs").innerText = data.runs || 0;
    document.getElementById("wickets").innerText = data.wickets || 0;
    document.getElementById("overs").innerText = data.overs || "0.0";

    document.getElementById("bowlerName").innerText = data.currentBowler?.name || "-";
    const bowlerStats = data.currentBowler ? `${data.currentBowler.runs}-${data.currentBowler.wickets} (${data.currentBowler.balls})` : "0-0 (0)";
    document.getElementById("bowlerStats").innerText = bowlerStats;

  } catch (err) {
    console.error("Error fetching score:", err);
  }
}

setInterval(fetchScore, 5000);
