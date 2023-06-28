import { Box, Button, Toolbar } from "@mui/material";

const FooterBar = () => {
  return (
    <>
      <Toolbar disableGutters>
        <Box sx={{ padding: "1em", paddingBottom: "0.4em" }} href={"hhu.de"}>
          <a href="https://www.hhu.de/en/">
            <img
              src="https://www.hhu.de/typo3conf/ext/wiminno/Resources/Public/img/hhu_logo.png"
              alt="hhu"
              width="140px"
            />
          </a>
        </Box>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ color: "black" }}
            size="small"
            href="https://www.hhu.de/impressum"
            variant="outline"
            color="primary"
          >
            Impressum
          </Button>
          <Button
            sx={{ color: "black" }}
            size="small"
            href="https://www.hhu.de/datenschutzerklaerung"
            variant="outline"
            color="primary"
          >
            Data Privacy
          </Button>
        </Box>
      </Toolbar>
    </>
  );
};

export default FooterBar;
