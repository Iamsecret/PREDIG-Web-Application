import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import paramConfig from "../../config/param.config";

const ParameterTable = ({ tableName, parameterList, flipOrder, boldList }) => {
  const downloadParameterFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(parameterList, null, 2)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = tableName + ".json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  const searchForIndex = (full_name) => {
    for (let i = 0; i < paramConfig[0].parameters.length; i++) {
      if (paramConfig[0].parameters[i].displayName == full_name) {
        return paramConfig[0].parameters[i].index;
      }
    }
    for (let i = 0; i < paramConfig[1].parameters.length; i++) {
      if (paramConfig[1].parameters[i].displayName == full_name) {
        return paramConfig[1].parameters[i].index;
      }
    }
    return 0;
  };

  const searchForUnit = (full_name) => {
    if (paramConfig[1].substrate.displayName == full_name) {
      return paramConfig[1].substrate.unit;
    }
    for (let i = 0; i < paramConfig[0].parameters.length; i++) {
      if (paramConfig[0].parameters[i].displayName == full_name) {
        return paramConfig[0].parameters[i].unit;
      }
    }
    for (let i = 0; i < paramConfig[1].parameters.length; i++) {
      if (paramConfig[1].parameters[i].displayName == full_name) {
        return paramConfig[1].parameters[i].unit;
      }
    }
    return "1";
  };

  const boldDecision = (full_name) => {
    if (boldList === undefined) {
      return false;
    }
    let paramIndex = searchForIndex(full_name);
    if (boldList[paramIndex] == "1") {
      return true;
    }
    return false;
  };

  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            {flipOrder ? (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  {tableName}
                </TableCell>
              </>
            ) : (
              <>
                <TableCell sx={{ fontWeight: "bold" }}>{tableName}</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Value
                </TableCell>
              </>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {parameterList.map((element) => {
            const kv = Object.entries(element);
            return (
              <TableRow>
                {flipOrder ? (
                  <>
                    <TableCell
                      sx={{
                        fontWeight: boldDecision(kv[0][0]) ? "bold" : "normal",
                      }}
                    >
                      {parseFloat(kv[0][1])}
                    </TableCell>
                    <TableCell align="right">
                      {kv[0][0] + " " + "(" + searchForUnit(kv[0][0]) + ")"}
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>
                      {kv[0][0] + " " + "(" + searchForUnit(kv[0][0]) + ")"}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: boldDecision(kv[0][0]) ? "bold" : "normal",
                      }}
                      align="right"
                    >
                      {parseFloat(kv[0][1])}
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Button
        sx={{ margin: "1em", float: flipOrder ? "right" : "left" }}
        onClick={downloadParameterFile}
        variant="contained"
        color="primary"
      >
        Download parameter file
      </Button>
    </>
  );
};

export default ParameterTable;
