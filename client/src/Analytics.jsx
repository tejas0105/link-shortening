/* eslint-disable react/prop-types */
const Analytics = ({ analytics }) => {
  return (
    <div className="analytics">
      <p className="clicks">
        <strong>Clicks: </strong> {analytics.data.totalClicks}
      </p>
      <p className="createdAt">
        <strong>Created On: </strong> {analytics.data.createdAt}
      </p>
    </div>
  );
};

export default Analytics;
