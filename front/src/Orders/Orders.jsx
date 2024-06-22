import React from 'react';
import useFetchOrders from '../kuke/useFetchOrders';

const colors = {
  primary: '#35524a',
  secondary: '#627c85',
  tertiary: '#779cab',
  accent: '#a2e8dd',
  highlight: '#32de8a'
};

const Orders = () => {
  const { orders, loading, error } = useFetchOrders();

  if (loading) return <p style={{ color: colors.secondary }}>Loading orders...</p>;
  if (error) return <p style={{ color: colors.secondary }}>Error loading orders: {error.message}</p>;

  return (
    <div style={{ backgroundColor: colors.accent, padding: '20px' }}>
      <h2 style={{ color: colors.primary }}>Orders</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: colors.primary, color: 'white' }}>
            <th style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>Order ID</th>
            <th style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>User ID</th>
            <th style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>User</th>
            <th style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>Tickets</th>
            <th style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>Created At</th>
            <th style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} style={{ backgroundColor: colors.tertiary, color: 'black' }}>
              <td style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>{order.id}</td>
              <td style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>{order.user_id}</td>
              <td style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>{order.user.name}</td>
              <td style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>
                <ul>
                  {order.tickets.map(ticket => (
                    <li key={ticket.ticket_id}>
                      ID: {ticket.ticket_id}, Seat: {ticket.seat}, Price: {ticket.price}, Quantity: {ticket.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>{order.created_at}</td>
              <td style={{ padding: '10px', border: `1px solid ${colors.secondary}` }}>{order.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
