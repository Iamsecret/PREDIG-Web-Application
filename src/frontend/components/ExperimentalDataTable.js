import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";

const ExperimentalDataTable = ({ columnValueName, setData }) => {
  const [experimentalData, setExperimentalData] = useState([]);
  const [isShowError, setIsShowError] = useState(false);
  const fileInputReference = useRef(null);

  const onFileButtonClick = (event) => {
    fileInputReference.current.click();
  };

  useEffect(() => {
    setData(experimentalData);
  }, [experimentalData, setData]);

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];

    let reader = new FileReader();

    reader.onload = function (progressEvent) {
      var tabs = this.result.split("\n");
      tabs = tabs.map((element) => {
        const row = element.split("\t");
        if (row.length !== 2) {
          setIsShowError(true);
          throw new Error("Invalid data format. Each row must have 2 columns.");
        }

        return row.map((cell) => {
          let toParse = parseFloat(cell);
          if (isNaN(toParse) || !isFinite(toParse)) {
            setIsShowError(true);
            throw new Error("Invalid data format. Non Float value.");
          }
          return toParse;
        });
      });
      setIsShowError(false);
      setExperimentalData(tabs);
    };

    reader.onerror = (progressEvent) => {
      setIsShowError(true);
    };
    reader.readAsText(fileUploaded);
  };

  return (
    <Box sx={{ margin: "1em" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }} variant="head">
              Time
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">
              {columnValueName}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {experimentalData.map((element, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{element[0]}</TableCell>
                <TableCell align="right">{element[1]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
        <input
          type="file"
          ref={fileInputReference}
          onInput={handleChange}
          onClick={(event) => (event.target.value = null)} //accept the same file multiple times
          style={{ display: "none" }}
        />
        <IconButton color="primary" onClick={onFileButtonClick}>
          <UploadFileIcon />
        </IconButton>
      </Box>
      {isShowError ? (
        <Alert
          severity="error"
          onClose={() => {
            setIsShowError(false);
          }}
        >
          <strong>The file you provided had the wrong format</strong> — Check
          out the section Experimental saccharification time-course data
          uploading.
        </Alert>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default ExperimentalDataTable;
