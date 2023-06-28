<https://github.com/Iamsecret/PREDIG-Web-Application>

# Plant Wall Degredation Simulation Interface

***IMPORTANT: Please read the NOTICE and LICENSE files in this
repository for important copyright and licensing information regarding
the contents of this project.***


## Structure

The source code for the web frontend and backend can be found in the /src directory. The code for the simulation and fitting model can be found in the /data/predig-src directory.

The frontend is written in ReactJs and uses the MaterialUI Libary for UI components. The backend is written in NodeJs.

In the /data directory there are also plotting scripts written in python. These scripts are used to generate figures to display to the user.

## Config

All config files can be found in /src/config, the acutal values for the database and email services should be provided in the prod.env file. This file is used within the docker-compose.yml to configure the environment.


## Docker 

Run the following command to start up the webserver and database.

Docker will setup two volumes, one for storing the data of simulation/fitting runs and one storing the data of the MariaDB. 

docker compose up --build

The webserver will be available under localhost:3333 and the database under localhost:5555.
