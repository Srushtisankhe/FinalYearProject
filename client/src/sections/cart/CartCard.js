import { Box, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { productpath } from '../../api';

const CartCard = ({singleCartData,handleRemoveItem,handleQuantityChange}) => {
    // console.log(singleCartData)
    const { productName, variations, discount, _id,manufacturerName } = singleCartData.productId
    const originalPrice = variations[0].price;
  return (
    <Box
    style={{
      display: "flex",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid",
      borderColor: "#D3D3D3",
      width: "100%",
    }}
  >
    <Stack
      style={{
        width: "120px",
        height: "120px",
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid",
        borderColor: "#D3D3D3",
      }}
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={`${productpath}${variations[0].productImage[0]}`}
        alt={productName}
      />
    </Stack>
    <Stack
      style={{
        padding: "0px 20px",
        width: "100%",
        textAlign: "start",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack style={{ textAlign: "start", overflow:"hidden" }}>
          <Typography
            variant="h6"
            align="left"
            sx={{
              fontWeight: "bold",
              color: "#4F585E",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width:"300px",
              minWidth:"50px"
            }}
          >
            <Link
              to={`/productDetails/${_id}?item=${variations[0].item}`}
              underline="hover"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {productName}
            </Link>
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#4F585E",
            }}
          >
            {manufacturerName}
          </Typography>

          <Typography
            component="span"
            variant="subtitle1"
            style={{ color: "#A6A6A6" }}
          >
            MRP
            <span
              style={{
                color: "inherit",
                textDecoration: "line-through",
                marginLeft: "6px",
              }}
            >
              ₹{variations[0]?.price}.00
            </span>
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontWeight: "bold",
              color: "#4F585E",
            }}
          >
            ₹
            {singleCartData.price} 
            .00 {" "}<span style={{color:"red"}}>{`(${discount}%)`}</span>
          </Typography>
        </Stack>

        <Stack>
          <IconButton
            onClick={() => handleRemoveItem(singleCartData?._id)}
            style={{marginBottom:"10px"}}
          >
            <DeleteOutlineOutlinedIcon
              style={{
                fontSize: "28px",
                color: "#4F585E",
              }}
            />
          </IconButton>
          <Stack>
            <Select
              value={singleCartData.quantity}
              size="small"
              onChange={(e) =>
                handleQuantityChange(
                    singleCartData._id,
                  e.target.value
                )
              }
              style={{ minWidth: "60px" }}
            >
              {[1, 2, 3, 4, 5].map((quantity) => (
                <MenuItem key={quantity} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Box>
  )
}

export default CartCard