import React, { useState, useEffect } from "react";
import axios from "axios";
import "./job.css";
import { useParams, Link } from "react-router-dom";
import { Button } from "flowbite-react";

const Job = () => {
  const [jobData, setJobData] = useState({});
  const [listJobData, setListJobData] = useState([]);
  const { jobId } = useParams();

  useEffect(() => {
    axios
      .get(`https://dev-example.sanbercloud.com/api/job-vacancy/${jobId}`)
      .then((response) => {
        if (response.data) {
          setJobData(response.data);
        } else {
          console.error("Data from API is not available:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API: ", error);
      });
  }, [jobId]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  function getStatusText(status) {
    return status === 1 ? "Open Hiring" : "Close";
  }
  
  useEffect(() => {
    axios
      .get("https://dev-example.sanbercloud.com/api/job-vacancy")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setListJobData(response.data.data);
        } else {
          console.error("Data from API is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from API: ", error);
      });
  }, []);

  function handleDetailClick() {
    window.scrollTo(0, 0);
  }
  return (
    <section className="container mx-auto flex flex-col items-center">
      <div className="job-detail grid grid-cols justify-center items-center mt-5 mb-5">
        <div
          key={jobData.id}
          className="col job-detail-1 grid grid-cols-2 items-center"
        >
          <div className="box-img-detail flex justify-center items-center">
            <img src={jobData.company_image_url} alt={jobData.title} />
          </div>
          <div className="grid grid-rows gap-y-1">
            <p>
              <h1 className="h1">
                <b>{jobData.title}</b>
              </h1>
            </p>
            <p>
              <em>{jobData.job_type}</em>
            </p>
            <p>
              <b>
                {jobData.company_name} - {jobData.company_city}
              </b>
            </p>
            <p>
              <b>Status : {getStatusText(jobData.job_status)} </b>
            </p>
            <p>
              <b>{jobData.job_tenure}</b>
            </p>
            <p className="text-justify">
              <b>Description :</b> <br /> {jobData.job_description}
            </p>
            <p className="text-justify">
              <b>Qualification :</b> <br /> {jobData.job_qualification}
            </p>
            <p>
              <b>Salary :</b> {formatCurrency(jobData.salary_min)} -{" "}
              {formatCurrency(jobData.salary_max)}
            </p>
            <Button className="button-apply mt-4">Apply</Button>
          </div>
        </div>
      </div>

      <div id="find-job" className="job-container justify-center items-center mt-4">
        {listJobData.map((job) => (
          <div key={job.id} className="col job-vacancy ">
            <div className="col box-img flex justify-center items-center">
              <img src={job.company_image_url} alt={job.title} />
            </div>
            <div className="row">
              <p>
                <b> {job.title} </b>
              </p>
            </div>
            <div className="row">
              <p>
                <b>{job.company_name}</b>
              </p>
            </div>
            <div className="row">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
                <p className="ml-2">{job.company_city}</p>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <p className="ml-2">{job.job_type}</p>
              </div>
            </div>
            <Link to={`/job/${job.id}`}>
              <Button
                className="button-detail mt-4"
                onClick={handleDetailClick}
              >
                Detail
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div id="contact" className="contact-container mt-4 mb-4 max-w-screen-lg mx-auto">
        <h2 className="teks-h2 flex flex-wrap justify-center gap-2 pt-5">
          <b>Contact</b>
        </h2>
        <div>
          <div className="flex flex-wrap justify-center gap-2 mt-3 pb-6">
            <button
              className="bg-blue-600 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/chairunisa-adistiaputri",
                  "_blank"
                )
              }
            >
              <svg
                className="w-6 h-6 fill-current"
                role="img"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055" />
                </g>
              </svg>
            </button>

            <button
              className="bg-gray-700 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded"
              onClick={() =>
                window.open("https://https://github.com/Chairunisa07", "_blank")
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="w-6 h-6"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>

            <button className="bg-red-500 p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
              <a href="mailto:chairunisaap1@gmail.com"></a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                className="w-6 h-6"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                    fill="currentColor"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Job;
