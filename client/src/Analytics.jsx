/* eslint-disable react/prop-types */
const Analytics = ({ analytics }) => {
  const date = analytics.data.createdAt.split("T")[0];
  console.log(date);
  return (
    <div className="analytics">
      <p className="clicks">
        <strong>Clicks: </strong> {analytics.data.totalClicks}
      </p>
      <p className="createdAt">
        <strong>Created On: </strong> {date}
      </p>
    </div>
  );
};

export default Analytics;
