export const windDirection = (degree: number) => {
  const dir = Math.round(degree / 22.5);
  switch (dir) {
    case 0:
      return { name: "N", icon: "arrow-up" };
    case 1:
      return { name: "NNE", icon: "arrow-up-right" };
    case 2:
      return { name: "NE", icon: "arrow-up-right" };
    case 3:
      return { name: "ENE", icon: "arrow-up-right" };
    case 4:
      return { name: "E", icon: "arrow-right" };
    case 5:
      return { name: "ESE", icon: "arrow-down-right" };
    case 6:
      return { name: "SE", icon: "arrow-down-right" };
    case 7:
      return { name: "SSE", icon: "arrow-down-right" };
    case 8:
      return { name: "S", icon: "arrow-down" };
    case 9:
      return { name: "SSW", icon: "arrow-down-left" };
    case 10:
      return { name: "SW", icon: "arrow-down-left" };
    case 11:
      return { name: "WSW", icon: "arrow-down-left" };
    case 12:
      return { name: "W", icon: "arrow-left" };
    case 13:
      return { name: "WNW", icon: "arrow-up-left" };
    case 14:
      return { name: "NW", icon: "arrow-up-left" };
    case 15:
      return { name: "NNW", icon: "arrow-up-left" };
    default:
      return { name: "N", icon: "arrow-up" };
  }
};


export const dewPoint = (temp: number, humidity: number) => {
  const CONST_A = 17.625;
  const CONST_B = 243.04;

  // calculate numerator of Td equation
  let dew_numer =
    CONST_B *
    (Math.log(humidity / 100.0) + (CONST_A * temp) / (temp + CONST_B));
  // calculate denominator of Td equation
  let dew_denom =
    CONST_A - Math.log(humidity / 100.0) - (CONST_A * temp) / (temp + CONST_B);

  // calculate the dew point
  let dew = dew_numer / dew_denom;

  return Math.floor(dew);
};