import { LineCharData } from "@/type";
import { LineChart } from "@carbon/charts-react";
import { useMemo } from "react";

const DLineBar = ({data}: {data: LineCharData[]}) => {
    const chartData = useMemo(() => {
      return data.map(item => ({
        group: item.group,
        key: item.key,
        value: item.group === 'Assets' ? item.asset : item.debt,

      }))
    },[data]);
    return <LineChart
    data={data}
    options={{
        title: 'Your balance amount over time',
        axes: {
            bottom: {
                title: 'Months',
                mapsTo: "key",
                scaleType: "labels" as any
            },
            left: {
                title: 'Asset (USD)',
                mapsTo: "asset",
                // scaleType: "linear" as any
            },
            right: {
              title: 'Debt (USD)',
              mapsTo: "debt",
              // scaleType: "linear" as any
            }
        },
        height: "400px"
    }}
  ></ LineChart>;
}


export default DLineBar;
