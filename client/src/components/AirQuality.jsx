import { ReactComponent as Good } from "../icons/aqi_icons/good.svg";
import { ReactComponent as FairlyGood } from "../icons/aqi_icons/fairly_good.svg";
import { ReactComponent as Moderate } from "../icons/aqi_icons/moderate.svg";
import { ReactComponent as Poor } from "../icons/aqi_icons/poor.svg";
import { ReactComponent as VeryPoor } from "../icons/aqi_icons/very_poor.svg";

const AIR_QUALITY_INDEX_TO_CONTENT_MAP = {
  1: {
    color: "#BDFCC9",
    text: "Good",
    icon: Good,
  },
  2: {
    color: "#BDD7FD",
    text: "Fairly Good",
    icon: FairlyGood,
  },
  3: {
    color: "#FDFFB6",
    text: "Moderate",
    icon: Moderate,
  },
  4: {
    color: "#FFC7D4",
    text: "Poor",
    icon: Poor,
  },
  5: {
    color: "#DDBBFF",
    text: "Very Poor",
    icon: VeryPoor,
  },
};

export const AirQuality = ({
  airQualityData: { airQualityIndex, components },
}) => {
  const {
    icon: Icon,
    text,
    color,
  } = AIR_QUALITY_INDEX_TO_CONTENT_MAP[airQualityIndex];

  return (
    <section
      style={{
        color: `${color}`,
      }}
      className="bg-current p-8 rounded-xl"
    >
      <Icon className="w-12 mb-4" />
      <p className="text-3xl mb-4 text-gray-600">{text}</p>
      <div className="flex md:justify-between flex-wrap">
        {Object.keys(components).map((item) => {
          return (
            <div key={item} className="p-2 m-2 border">
              <div className="text-2xl text-gray-600">{item}</div>
              <div className="text-gray-100">{components[item]}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
