import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./OrdersSummary.module.scss";

const OrdersSummary = ({ orders }) => {
  const { total, totalToday } = orders;

  const doneOrders = useMemo(
    () => orders.orders.filter((order) => order.status === "done"),
    [orders]
  );
  const pendingOrders = useMemo(
    () => orders.orders.filter((order) => order.status === "pending"),
    [orders]
  );

  return (
    <section className={styles.ordersSummary}>
      <div className={styles.ordersSummary__statuses}>
        {doneOrders.length && (
          <div>
            <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
            <div className={styles.ordersSummary__numbers}>
              <ul className={styles.ordersSummary__list}>
                {doneOrders.map(
                  (order, index) =>
                    index < 10 && (
                      <li
                        className={`${styles.ordersSummary__done} text text_type_digits-default`}
                        key={index}
                      >
                        {order.number}
                      </li>
                    )
                )}
              </ul>
              <ul className={styles.ordersSummary__list}>
                {doneOrders.map(
                  (order, index) =>
                    index >= 10 &&
                    index < 20 && (
                      <li
                        className={`${styles.ordersSummary__done} text text_type_digits-default`}
                        key={index}
                      >
                        {order.number}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        )}
        {!!pendingOrders.length && (
          <div>
            <h2 className="text text_type_main-medium mb-6">В работе:</h2>
            <div className={styles.ordersSummary__numbers}>
              <ul className={styles.ordersSummary__list}>
                {pendingOrders.map(
                  (order, index) =>
                    index < 10 && (
                      <li className="text text_type_digits-default" key={index}>
                        {order.number}
                      </li>
                    )
                )}
              </ul>
              <ul className={styles.ordersSummary__list}>
                {pendingOrders.map(
                  (order, index) =>
                    index >= 10 &&
                    index < 20 && (
                      <li className="text text_type_digits-default" key={index}>
                        {order.number}
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <span
          className={`${styles.ordersSummary__digits} text text_type_digits-large`}
        >
          {total}
        </span>
      </div>
      <div>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <span
          className={`${styles.ordersSummary__digits} text text_type_digits-large`}
        >
          {totalToday}
        </span>
      </div>
    </section>
  );
};

OrdersSummary.propTypes = {
  orders: PropTypes.object.isRequired,
};

export default OrdersSummary;
