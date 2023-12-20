import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StudentChart = ({ chartOptions }) => {
  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default StudentChart;
