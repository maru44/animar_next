import HighCharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighChartsReact from "highcharts-react-official";
import { NextComponentType, NextPage, NextPageContext } from "next";

if (typeof HighCharts === "object") {
  HighchartsExporting(HighCharts);
}

interface Props {
  lst: number[];
  title: string;
}

const WatchStateGraphPie: NextPage<Props> = (props) => {
  const lst = props.lst;
  const dataList = [
    ["脱落", lst[0]],
    ["視聴中", lst[2]],
    ["完了", lst[3]],
    ["周回済み", lst[4]],
  ];
  const options: HighCharts.Options = {
    title: {
      text: props.title,
    },
    series: [
      {
        name: "", //serieas
        type: "pie",
        pointWidth: 25,
        data: dataList,
      },
    ],
    yAxis: {
      min: 0,
      title: {
        text: "(人)",
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
      series: {
        stacking: "normal",
      },
    },
    /*
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
    },
    */
  };

  return (
    <div>
      <HighChartsReact
        highcharts={HighCharts}
        options={options}
        // constructorType={"stockChart"}
      />
    </div>
  );
};

export default WatchStateGraphPie;
