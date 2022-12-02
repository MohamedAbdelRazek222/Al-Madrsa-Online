import CountUp from "react-countup";
import * as Icon from "react-bootstrap-icons";

function Counter() {
  return (
    <div className="bg-primary text-light counterStats">
     <div className="counterStatsBox py-4">
     <h2 className="text-center py-2 mt-3">Fun Facts</h2>
      <div className="py-5 d-flex justify-content-evenly align-items-center text-center">
        <div className="stats-item mb-5">
          <span className="fs-3">
            <Icon.BookFill />
          </span>
          <h4 className="mt-3">Courses</h4>
          <span className="fw-bold fs-2">+</span>
          <CountUp end={90} className="fw-bold fs-2" />
        </div>

        <div className="stats-item mb-5">
          <span className="fs-3">
            <Icon.PersonVideo2 />
          </span>
          <h4 className="mt-3">Instructos</h4>
          <span className="fw-bold fs-2">+</span>
          <CountUp end={20} className="fw-bold fs-2" />
        </div>

        <div className="stats-item mb-5">
          <span className="fs-3">
            <Icon.PersonVideo3 />
          </span>
          <h4 className="mt-3">Students</h4>
          <span className="fw-bold fs-2">+</span>
          <CountUp end={220} className="fw-bold fs-2" />
        </div>

        <div className="stats-item mb-5">
          <span className="fs-3">
            <Icon.CameraVideoFill />
          </span>
          <h4 className="mt-3">Content Hours</h4>
          <span className="fw-bold fs-2">+</span>
          <CountUp end={1000} className="fw-bold fs-2" />
        </div>
      </div>
     </div>
    </div>
  );
}

export default Counter;
