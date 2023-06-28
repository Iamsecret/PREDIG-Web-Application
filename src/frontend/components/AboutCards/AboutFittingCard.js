import { Divider, Paper, Typography } from "@mui/material";

const AboutFittingCard = () => {
  return (
    <Paper sx={{ margin: "1em" }} elevation={5}>
      <Typography sx={{ textAlign: "center", padding: "0.5em" }} variant="h4">
        Reproduce your data and understand the underlying mechanisms
      </Typography>
      <Divider />
      <Typography sx={{ padding: "1em", fontWeight: "bold" }}>
        Using the fitting algorithm, you can fit a chosen subset of the model
        parameters to reproduce your experimental saccharification time-courses,
        and thereby infer values of mechanistic and kinetic parameters that are
        difficult to measure experimentally.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        General use instructions for this page
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        With this fitting procedure, you have the possibility to fit
        simultaneously distinct samples (up to five) whose experimental
        saccharification protocol was the same. It implies that certain
        parameters will be common to all your samples, and others will be
        specific for each of them. By fitting distinct samples simultaneously,
        you increase the constrains on the fitting algorithm, and thus augment
        the validity of the results, but also make it more difficult for the
        algorithm to find a suitable set of fitted parameters.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          To run the fitting procedure
        </Typography>
        , you must follow four main steps: i) choose the parameters to be
        fitted, ii) set the kinetic parameters, iii) set the initial
        configuration parameters, and iv) upload your experimental
        saccharification time-course data. Values that you set are taken as
        search starting point by the fitting algorithm for the parameters that
        are to be fitted. They are kept fixed for the other ones.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          Fields are pre-filled with default values
        </Typography>{" "}
        that allow you to fit the experimental saccharification time-course data
        for corn stover after high intensity pre-treatment used in our previous
        study{" "}
        <a href={"https://doi.org/10.1371/journal.pcbi.1009262"}>
          (Behle and Raguin 2021).
        </a>
        This illustrative experimental saccharification time-course data can be
        obtained by clicking DOWNLOAD EXAMPLE FILE GLC and DOWNLOAD EXAMPLE FILE
        XYL.
      </Typography>

      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          To set the parameters to values of your choice
        </Typography>
        , fill the forms "Kinetic Parameters" and "Initial Configuration
        Parameters". It is important to note that, the more accurate the
        educated guess on the values of the parameters, the better the fitting
        results, though the fitting procedure itself remains the same. You can
        reset the parameter values to those of the case example by clicking
        RESET TO DEFAULT VALUES in each box.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          You can easily repeat or modify previously run fits
        </Typography>{" "}
        by uploading their corresponding parameter files. To do so, click the
        file upload icon in the “Kinetic parameters” and the “Initial
        configuration parameters” boxes.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          When hovering your mouse over a parameter
        </Typography>
        , further details are provided, including its units and the range in
        which its value can be varied.
      </Typography>
      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          Details about the model features that cannot be varied here
        </Typography>{" "}
        are provided in our{" "}
        <a href={"https://doi.org/10.1371/journal.pcbi.1009262"}>article</a>{" "}
        relating to the release of this application.
      </Typography>

      <Typography sx={{ padding: "1em" }}>
        <Typography display="inline" sx={{ fontWeight: "bold" }}>
          To start the fitting procedure
        </Typography>
        , enter your email address in the box at the bottom of the page, and
        click START THE FITTING. You will receive an email containing a link to
        be followed for actually starting the fitting procedure. Once the
        fitting ends, you will receive a new email with a new link. Follow the
        latter to retrieve the results. The email address provided can also be
        used under the RUNS tab to search for the runs you submitted. It will be
        visible there.
      </Typography>
    </Paper>
  );
};

export default AboutFittingCard;
