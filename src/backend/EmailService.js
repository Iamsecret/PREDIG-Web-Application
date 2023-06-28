const emailConfig = require("../config/email.config");
const nodemailer = require("nodemailer");
const logger = require("./Logger");

const db = require("./db/Database");

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.EMAIL_HOST,
      port: emailConfig.EMAIL_PORT,
      secure: true,
      auth: {
        user: emailConfig.EMAIL_USER,
        pass: emailConfig.EMAIL_PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });
  }

  async sendMail(subject, text, html, to) {
    logger.info("Trying to send mail...");

    const user = await db.users.findOne({ where: { email: to } });

    //Add link to delete email from database

    let delete_link = "https://predig.cs.hhu.de/deletion/" + user.deletion_uuid;

    let delete_text =
      "To delete your email from our database, please click here: " +
      delete_link;
    let delete_html =
      'To delete your email from our database, please click here: <a href="' +
      delete_link +
      '" >' +
      delete_link +
      "</a>";

    text = text + "\n" + delete_text;
    html = html + "<br>" + delete_html;

    const info = this.transporter
      .sendMail({
        from: emailConfig.EMAIL_ADDRESS,
        to: to,
        subject: subject,
        text: text,
        html: html,
      })
      .catch((error) => logger.error(error));
  }

  async sendStartSimulationEmail(to, run_uuid, start_uuid) {
    let subject = "Start Simulation " + run_uuid;

    let start_link =
      "https://predig.cs.hhu.de/simulation/runs/start/" + start_uuid;

    let text = "To start the simulation click here: " + start_link;
    let html =
      'To start the simulation click here: <a href="' +
      start_link +
      '" >' +
      start_link +
      "</a>";

    this.sendMail(subject, text, html, to);
  }

  async sendFinishSimulationEmail(to, run_uuid) {
    let subject = "Finished Simulation " + run_uuid;

    let finish_link = "https://predig.cs.hhu.de/simulation/runs/" + run_uuid;

    let text =
      "The simulation is finished. To see the results click here: " +
      finish_link;
    let html =
      'The simulation is finished. To see the results click here:  <a href="' +
      finish_link +
      '" >' +
      finish_link +
      "</a>";

    this.sendMail(subject, text, html, to);
  }

  async sendStartFittingEmail(to, run_uuid, start_uuid) {
    let subject = "Start Fitting " + run_uuid;

    let start_link =
      "https://predig.cs.hhu.de/fitting/runs/start/" + start_uuid;

    let text = "To start the fitting click here: " + start_link;
    let html =
      'To start the fitting click here: <a href="' +
      start_link +
      '" >' +
      start_link +
      "</a>";

    this.sendMail(subject, text, html, to);
  }

  async sendFinishFittingEmail(to, run_uuid) {
    let subject = "Finished Fitting " + run_uuid;

    let finish_link = "https://predig.cs.hhu.de/fitting/runs/" + run_uuid;

    let text =
      "The fitting is finished. To see the results click here: " + finish_link;
    let html =
      'The fitting is finished. To see the results click here:  <a href="' +
      finish_link +
      '" >' +
      finish_link +
      "</a>";

    this.sendMail(subject, text, html, to);
  }
}

const emailService = new EmailService();

module.exports = emailService;
