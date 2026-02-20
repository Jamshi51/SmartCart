const DashboardHome = () => {
  return (
    <div>
      <h2>DASHBOARD OVERVIEW</h2>

      <div className="card-container">
        <div className="card">
          <h3>Total Products</h3>
          <p>50</p>
        </div>

        <div className="card">
          <h3>Pending Orders</h3>
          <p>12</p>
        </div>

        <div className="card">
          <h3>Total Sales</h3>
          <p>₹5000</p>
        </div>
      </div>

      <div className="add-product-box">
        + Add New Product
      </div>
    </div>
  );
};

export default DashboardHome;
