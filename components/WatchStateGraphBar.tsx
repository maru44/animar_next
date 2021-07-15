import HighCharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighChartsReact from "highcharts-react-official";

if (typeof HighCharts === "object") {
  HighchartsExporting(HighCharts);
}

interface Props {
  lst: number[];
  title: string;
}

const WatchStateGraphBar: React.FC<Props> = (props) => {
  const options: HighCharts.Options = {
    title: {
      text: props.title,
    },
    series: [
      {
        name: "", //serieas
        type: "column",
        pointWidth: 25,
        data: props.lst,
      },
    ],
    xAxis: {
      categories: ["脱落", "興味", "視聴中", "完了", "周回済み"],
      title: null,
    },
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

export default WatchStateGraphBar;
