import React, { useState, useEffect } from "react";
import { useAuth } from "../../assets/components/AuthContext/AuthContext";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../../assets/config/firebase";
import Spinner from "../../assets/components/Spinner/Spinner";

import {
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  createTheme,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
const theme = createTheme({});
const Admin = () => {
  const { adminUser } = useAuth();
  const [adminCommission, setAdminCommission] = useState(0);
  const [userCryptoHoldings, setUserCryptoHoldings] = useState([]);
  const [users, setUsers] =useState([])


  useEffect(()=>{
    const fetchUsers = async()=>{
      const usersRef = collection(db, 'users');
      const querySnapshot =await getDocs(usersRef)
    const fetchUser = querySnapshot.docs.map((doc)=>doc.data())
    setTimeout(() => {
      setUsers(fetchUser)
    }, 1000);
  }
  fetchUsers()
    
  },[users])
  useEffect(() => {
    const fetchAdminCommission = async () => {
      setAdminCommission(adminUser.commission || 0);
    };
    
     
     const fetchUserCryptoHoldings = async () => {
      const usersCollectionRef = collection(db, "users");
      const querySnapshot = await getDocs(usersCollectionRef);
      const holdings = [];

      querySnapshot.forEach((userDoc) => {
        const userData = userDoc.data();
        const userHoldings = userData.cryptoHoldings || [];
        holdings.push({
          username: userData.username,
          cryptoHoldings: userHoldings,
        });
      });

      setTimeout(() => {
        setUserCryptoHoldings(holdings);
       
        
      }, 1000);
    };
    
    fetchAdminCommission();
    fetchUserCryptoHoldings();
  }, [adminUser]);

  return (
    <div className="admin-page" style={{padding: '0 1rem'}}>
      <ThemeProvider theme={theme}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        <Paper elevation={3} style={{ marginBottom: "20px", padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            Total Commission: ${adminCommission.toFixed(2)}
          </Typography>
        </Paper>

        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h6" gutterBottom>
            User Crypto Holdings
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Crypto Holdings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userCryptoHoldings ? userCryptoHoldings?.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                    <List>
                      {user?.cryptoHoldings.map((holding, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`Coin: ${holding.coinName}`}
                            secondary={`Amount: ${holding.amount}, Cost: ${holding.cost.toFixed(2)}$`}
                          />
                           
                        </ListItem>
                        
                      ))}
                    </List>
                    </TableCell>
                  </TableRow>
                )): (<Spinner />)}
               
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </ThemeProvider>

    </div>
  );
};

export default Admin;
