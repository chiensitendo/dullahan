import { LineCharData } from "@/type";
import { LineChart } from "@carbon/charts-react";
import { useMemo } from "react";

const DLineBar = ({data}: {data: LineCharData[]}) => {
    const chartData = useMemo(() => {
      return data.map(item => ({
        group: item.group,
        key: item.key,
        value: item.group === 'Assets' ? item.asset : item.debt
      }))
    },[data]);
    return <LineChart
    data={chartData}
    options={{
        title: 'Chart title',
        axes: {
            bottom: {
                mapsTo: "key",
                scaleType: "labels" as any
            },
            left: {
                mapsTo: "value",
                scaleType: "linear" as any
              }
        },
        height: "400px"
    }}
  ></ LineChart>;
}


export default DLineBar;
