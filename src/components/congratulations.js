
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "animate.css";

function Congrate({user}) {
  const { width, height } = useWindowSize();
  return (
    <div>
      <div className="text-2xl">You won :- {user}</div>
      <br />
      <Confetti width={width} height={height} recycle={false} />
    </div>
  );
}
export default Congrate;
