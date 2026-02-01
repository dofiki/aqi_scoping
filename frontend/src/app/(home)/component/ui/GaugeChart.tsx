import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";

interface GaugePropsType {
  aqi: number;
  aqiColor: string;
}

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="white" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="white"
        strokeWidth={3}
      />
    </g>
  );
}

export default function Gaugechart({ aqi, aqiColor }: GaugePropsType) {
  return (
    <GaugeContainer
      width={180}
      height={200}
      startAngle={-90}
      endAngle={90}
      value={aqi}
    >
      <GaugeReferenceArc style={{ fill: "white" }} />
      <GaugeValueArc style={{ fill: aqiColor }} />
      <GaugePointer />
    </GaugeContainer>
  );
}
