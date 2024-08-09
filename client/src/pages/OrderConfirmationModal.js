import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

const OrderConfirmationModal = ({ open, handleClose, orderDetails }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      sx={{
        textAlign:"center",
        "& .MuiDialog-paper": {
          width: "60%",
          maxWidth: "none",
        },
      }}
    >
      <Typography variant="h3" style={{margin:"40px 0px 20px"}}>Thank you for your order</Typography>
      <DialogContent style={{backgroundColor:"#D7F5DA", padding:"20px", margin:"10px 50px"}}>
      <DialogTitle style={{fontSize:"24px", margin:"0px", padding:"0px"}}>Order Confirmation</DialogTitle>
        <DialogContentText>
          Your order has been successfully placed! Here are the details:
        </DialogContentText>
        <Box>
          <Typography variant="body1">
            Order ID: {orderDetails?.booking?._id}
          </Typography>
          <Typography variant="body1">
            Total Amount: {orderDetails?.booking?.totalAmount}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions style={{marginBottom:"10px"}}>
        <Button onClick={handleClose} color="primary" autoFocus style={{margin:"10px auto"}}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderConfirmationModal;
