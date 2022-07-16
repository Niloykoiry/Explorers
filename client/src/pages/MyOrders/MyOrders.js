import React, { useCallback, useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../store/auth-context";
import classes from "../Table.module.css";
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const {
    user: { email },
  } = useContext(AuthContext);

  const loadUserOrders = useCallback(async () => {
    const response = await fetch(
      `https://grim-hollow-06351.herokuapp.com/orders/${email}`
    );
    const responseData = await response.json();
    setOrders(responseData);
  }, [email]);

  //Load user orders
  useEffect(() => {
    loadUserOrders();
  }, [email, loadUserOrders]);

  //Order delete handler
  const handleDelete = async (_id) => {
    if (window.confirm("Are You sure you want to delete the order?")) {
      const response = await fetch(
        `https://grim-hollow-06351.herokuapp.com/orders/${_id}`,
        {
          method: "DELETE",
        }
      );
      const responseData = await response.json();
      if (responseData.deletedCount > 0) {
        loadUserOrders();
      }
    }
  };
  //Order id counter
  let count = 1;

  //My order page
  return (
    <section className={classes.orders}>
      <div className="container-xl">
        <h2 className="section-heading">My Orders</h2>
        <div className="row">
          <div className={`col-lg-12 ${classes["main-datatable"]}`}>
            <div className={classes.card_body}>
              <div className={classes["overflow-x"]}>
                <table
                  style={{ width: "100%" }}
                  className={`table ${classes["cust-datatable"]} ${classes.dataTable} ${classes["no-footer"]}`}
                >
                  <thead>
                    <tr>
                      <th style={{ minWidth: "50px" }}>ID</th>
                      <th style={{ minWidth: "200px" }}>Name</th>
                      <th style={{ minWidth: "200px" }}>Tour Name</th>
                      <th style={{ minWidth: "150px" }}>Tour Date</th>
                      <th style={{ minWidth: "50px" }}>Tour Duration</th>
                      <th style={{ minWidth: "120px" }}>Price</th>
                      <th style={{ minWidth: "150px" }}>Status</th>
                      <th style={{ minWidth: "150px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      return (
                        <tr key={order._id}>
                          <td>{count++}</td>
                          <td>
                            <img
                              src={order.userImage}
                              alt={order.userName.split(" ")[0]}
                              className="img-fluid rounded-circle me-2"
                              width="40"
                            />
                            {order.userName}
                          </td>
                          <td>
                            <span
                              className={`${classes.mode} ${classes.mode_email}`}
                            >
                              {order.name}
                            </span>
                          </td>
                          <td>
                            {new Date(order.startDates).toLocaleDateString(
                              "en-US"
                            )}
                          </td>
                          <td>{order.duration} Days</td>
                          <td>
                            <span
                              className={`${classes.mode} ${classes.mode_email}`}
                            >
                              ${order.price}
                            </span>
                          </td>

                          <td>
                            <span
                              className={`${classes.mode} ${
                                order.status === "approved"
                                  ? classes.mode_on
                                  : classes.mode_off
                              }`}
                            >
                              {order.status === "pending" && "Pending"}
                              {order.status === "approved" && "Approved"}
                            </span>
                          </td>
                          <td>
                            <MdDelete
                              className={classes.delete}
                              onClick={() => handleDelete(order._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyOrders;
