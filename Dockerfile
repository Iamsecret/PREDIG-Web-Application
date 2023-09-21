FROM node:16

WORKDIR /usr/src/pwdsi

#Python
RUN apt-get update && apt-get dist-upgrade -y && \
    apt-get install python3-pip -y && \
    apt-get autoremove && \
    apt-get clean && \
    apt-get install -y ffmpeg && \
    rm -rf /var/lib/apt/lists/*
RUN pip3 install --upgrade pip
RUN pip3 --no-cache-dir install \ 
    numpy\ 
    matplotlib\
    scikit-learn
RUN pip3 --no-cache-dir install scipy

#Node

COPY package*.json ./
RUN npm install --no-optional &&\
    npm cache clean --force

#Simulation Code

COPY . .
WORKDIR /usr/src/pwdsi/data/predig-src
RUN chmod +x compile.sh
RUN ./compile.sh
RUN cp code_4 ../code_4
WORKDIR /usr/src/pwdsi

#Fitting

WORKDIR /usr/src/pwdsi/data/predig-src/Fitting
RUN chmod +x evo_all_in_one.sh
RUN chmod +x evo_average_fit_and_print_variance.sh
RUN chmod +x evo_clear_gen.sh
RUN chmod +x evo_create_folders.sh
RUN chmod +x evo_gen_stat.sh
RUN chmod +x evo_keywords.sh
RUN chmod +x evo_pick_min.sh
RUN chmod +x evo_run.sh
RUN chmod +x evo_save_best_gens.sh
RUN chmod +x evo_wrapper.sh
RUN chmod +x evo_janitor.sh
WORKDIR /usr/src/pwdsi

#Moviemaker 

WORKDIR /usr/src/pwdsi/data/predig-src/scripts_for_movie
RUN chmod +x Moviemaker.sh
WORKDIR /usr/src/pwdsi

#Node

RUN npm run build
EXPOSE 8080

CMD ["node", "src/backend/index.js"]
