const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (e) {
    console.log(`BD Error: ${e.message}`);
  }
};

initializeDBAndServer();

app.get("/players/", async (request, response) => {
  const getTeamQuery = `SELECT * FROM cricket_team;`;
  const teamArray = await db.all(getTeamQuery);
  response.send(teamArray);
});

app.post("/players/", async (request, response) => {
  const teamDetails = request.body;
  //const {playerId} = request.lastId;
  const { playerId, playerName, jerseyNumber, role } = teamDetails;
  const getTeamQuery = `INSERT INTO cricket_team (player_id, player_name, jersey_number, role) VALUES(${playerId},${playerName}, ${jurseyNumber}, ${role}) `;
  const teamArray = await db.run(getTeamQuery);
  response.send(playerId);
});

app.get("/players/:playerId/", async (request, response) => {
  const { plyerId } = request.params;
  const getTeamQuery = `SELECT * FROM cricket_team WHERE player_id = ${playerId};`;
  const teamArray = await db.get(getTeamQuery);
  response.send(teamArray);
});

app.put("/players/:playerId/", async (request, response) => {
  //const {playerId} = request.params;
  const playerDetails = request.body;
  const { playerId, playerName, jerseyNumber, role } = playerDetails;
  const getTeamQuery = `UPDATE cricket_team SET player_id = ${playerId}, player_name = ${playerName}, jersey_number = ${jerseyNumber}, role = ${role} WHERE player_id = ${playerId};`;
  const teamArray = await db.run(getTeamQuery);
  response.send("Player Details Updated");
});

app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getTeamQuery = `DELETE FROM cricket_team WHERE player_id = ${playerId};`;
  const teamArray = await db.all(getTeamQuery);
  response.send("Player Removed");
});

module.exports = app;
