import { useEffect, useState } from "react";
import moment from "moment";

const Timer = (props) => {
  const [HH, setHH] = useState("00");
  const [MM, setMM] = useState("00");
  const [SS, setSS] = useState("00");
  const [D, setD] = useState(0);

  useEffect(() => {
    let now = moment();
    let end = moment.utc(
      moment
        .utc(props.start_end, "YYYY-MM-DD hh:mm:ss A")
        .format("DD/MM/YYYY hh:mm A"),
      "DD/MM/YYYY hh:mm A"
    );
    // console.log(now)
    // console.log(end)
    let d = end.diff(now, "days");
    // console.log(d)
    let h = end.diff(now, "hours");
    let m = end.diff(now, "minutes") - 60 * h;
    let s = end.diff(now, "seconds") - 60 * 60 * h - 60 * m;

    let hh = ("0" + h).slice(-2);
    let mm = ("0" + m).slice(-2);
    let ss = ("0" + s).slice(-2);

    setTimeout(() => {
      setD(d);
      setHH(hh);
      setMM(mm);
      setSS(ss);
    }, 1000);
  }, [SS]);

  return <>{D > 0 ? `${D + 1} days` : `${HH}:${MM}:${SS}`}</>;
};

export default Timer;
