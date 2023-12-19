import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Spinner from "../../assets/components/Spinner/Spinner";
import { useEffect } from "react";

const theme = createTheme({});

const CryptoHoldingsTable = ({ userCryptoHoldings }) => {
  
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

  const [totalVal, setTotalVal] = useState(() => {
    const savedTotalVal = localStorage.getItem("totalVal");
    return savedTotalVal ? parseFloat(savedTotalVal) : 0;
  });

  console.log(totalVal);

  useEffect(() => {
    const getTotalUserCryptoValue = () => {
      let totalValue = 0;
      userCryptoHoldings.forEach((holding) => {
        let current_price = holding.cost / holding.amount;
        if (holding) totalValue += holding.amount * current_price;
      });
      setTotalVal(totalValue);
      localStorage.setItem("totalValue", totalVal);
    };
    getTotalUserCryptoValue();
  }, [userCryptoHoldings]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(5); 
    setPage(0); 
  };
  const totalValueRow = {
    coinName: "Total",
    amount: "",
    currentPrice: "",
    totalValue: userCryptoHoldings.reduce(
      (total, holding) => total + holding.amount * (holding.cost / holding.amount),
      0
    ),
  };
  const columns = [
    { id: "coinName", label: "Coin Name", minWidth: 170 },
    { id: "amount", label: "Amount", minWidth: 100 },
    {
      id: "currentPrice",
      label: "Current Price",
      minWidth: 170,
      align: "right",
      format: (value) => `${value.toFixed(2)}$`,
    },
    {
      id: "totalValue",
      label: "Total Value",
      minWidth: 170,
      align: "right",
      format: (value) => `${value.toFixed(2)}$`,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(!userCryptoHoldings || userCryptoHoldings.length === 0) && (
                <Spinner />
              )}
              {userCryptoHoldings &&
                userCryptoHoldings.length > 0 &&
                userCryptoHoldings
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((holding) => {
                  let current_price = holding.cost / holding.amount;
                  const row = {
                    coinName: holding.coinName,
                    amount: holding.amount,
                    currentPrice: current_price,
                    totalValue: holding.amount * current_price,
                  };

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={holding.coinId}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}

              <TableRow className="total-value-row">
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{totalVal}$</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={userCryptoHoldings.length + 1} 
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ThemeProvider>
  );
};

export default CryptoHoldingsTable;
