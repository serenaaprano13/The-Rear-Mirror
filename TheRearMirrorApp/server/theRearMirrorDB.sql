BEGIN TRANSACTION;

--Creating the plannings table
CREATE TABLE IF NOT EXISTS "PLANNINGS" (
    "planning_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creation_date" TIMESTAMP,
    "distance" DOUBLE
);


-- Creating the "DRIVINGSCENARIOS" table
CREATE TABLE IF NOT EXISTS "DRIVINGSCENARIOS" (
    "scenario_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "scenario_name" TEXT NOT NULL
);


CREATE TABLE "PLANNEDSCENARIO" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "planning_id" INTEGER,
    "scenario_name" TEXT,
    FOREIGN KEY (planning_id) REFERENCES PLANNINGS(planning_id),
    FOREIGN KEY (scenario_name) REFERENCES DRIVINGSCENARIOS(scenario_name)
);


-- Inserting fake data into the "PLANNINGS" table
INSERT INTO PLANNINGS (planning_id, creation_date, distance)
VALUES
(1, '2024-02-13 10:30:00', 1),
(2, '2024-02-14 15:45:00', 2),
(3, '2024-02-15 08:00:00', 1.5);

-- Inserting concise driving scenarios into the "DRIVINGSCENARIOS" table
INSERT INTO DRIVINGSCENARIOS (scenario_id, scenario_name)
VALUES
(1, 'Parallel Parking'),
(2, 'Three-Point Turn'),
(3, 'Lane Change'),
(4, 'Merge onto Highway'),
(5, 'U-Turn'),
(6, 'Stop'),
(7, 'Roundabout'),
(8, 'S-Parking'),
(9, 'Speed limit'),
(10, 'Yield to Pedestrians'),
(11, 'Emergency Stop'),
(12, 'Obey Traffic Signals'),
(13, 'Bad Weather'),
(14, 'Night driving'),
(15, 'Uphill start');


-- Inserting fake data into the "PLANNEDSCENARIO" table
INSERT INTO PLANNEDSCENARIO (id, planning_id, scenario_name)
VALUES
(1, 1, 'Parallel Parking'),
(2, 1, 'Three-Point Turn'),
(3, 1, 'Lane Change'),
(4, 2, 'Merge onto Highway'),
(5, 2, 'U-Turn'),
(6, 2, 'Stop'),
(7, 3, 'Roundabout'),
(8, 3, 'S-Parking'),
(9, 3, 'Speed limit'),
(10, 3, 'Yield to Pedestrians'),
(11, 3, 'Emergency Stop'),
(12, 3, 'Obey Traffic Signals'),
(13, 3, 'Bad Weather'),
(14, 3, 'Night driving'),
(15, 3, 'Uphill start');



COMMIT;
