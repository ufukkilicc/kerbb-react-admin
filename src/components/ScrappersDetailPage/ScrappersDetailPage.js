import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { fetchScrapper } from "../../features/scrappers/scrappersAPI";
import { getCookie } from "../../helpers/authHelper";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./ScrappersDetailPage.scss";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const ScrappersDetailPage = () => {
  const [pageTitle, setPageTitle] = useState("");
  let { id } = useParams();

  const [scrapper_title, set_scrapper_title] = useState("");
  const [scrapper_company, set_scrapper_company] = useState({});
  const [scrapper_success, set_scrapper_success] = useState(false);
  const [scrapper_error_message, set_scrapper_error_message] = useState("");
  const [scrapper_start_date, set_scrapper_start_date] = useState("");
  const [scrapper_end_date, set_scrapper_end_date] = useState("");
  const [scrapper_time_lasts, set_scrapper_time_lasts] = useState(0);
  const [scrapper_jobs_found, set_scrapper_jobs_found] = useState(0);
  const [scrapper_jobs_added_count, set_scrapper_jobs_added_count] =
    useState(0);
  const [scrapper_jobs_added, set_scrapper_jobs_added] = useState([]);
  const [scrapper_jobs_extracted_count, set_scrapper_jobs_extracted_count] =
    useState(0);
  const [scrapper_jobs_extracted, set_scrapper_jobs_extracted] = useState([]);
  const [jobs_added_show, set_jobs_added_show] = useState(false);
  const [jobs_extracted_show, set_jobs_extracted_show] = useState(false);
  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const token = getCookie("k_t");
      const scrapperDetailResponse = await fetchScrapper(token, id);
      set_scrapper_title(scrapperDetailResponse.data.scrapper_title);
      set_scrapper_company(scrapperDetailResponse.data.scrapper_company);
      set_scrapper_success(scrapperDetailResponse.data.scrapper_success);
      set_scrapper_error_message(
        scrapperDetailResponse.data.scrapper_error_message
      );
      set_scrapper_start_date(scrapperDetailResponse.data.scrapper_start_date);
      set_scrapper_end_date(scrapperDetailResponse.data.scrapper_end_date);
      set_scrapper_time_lasts(scrapperDetailResponse.data.scrapper_time_lasts);
      set_scrapper_jobs_found(scrapperDetailResponse.data.scrapper_jobs_found);
      set_scrapper_jobs_added_count(
        scrapperDetailResponse.data.scrapper_jobs_added_count
      );
      set_scrapper_jobs_added(scrapperDetailResponse.data.scrapper_jobs_added);
      set_scrapper_jobs_extracted_count(
        scrapperDetailResponse.data.scrapper_jobs_extracted_count
      );
      set_scrapper_jobs_extracted(
        scrapperDetailResponse.data.scrapper_jobs_extracted
      );
    }
    fetchData();
  }, []);
  const SetPageTitle = () => {
    let title = "";
    window.location.pathname
      .split("/")
      .slice(2)
      .forEach((el) => {
        title += `/${el.charAt(0).toUpperCase() + el.slice(1)}`;
      });
    setPageTitle(title);
  };
  const handleShowJobsAdded = () => {
    set_jobs_added_show(!jobs_added_show);
  };
  const handleShowJobsExtracted = () => {
    set_jobs_extracted_show(!jobs_extracted_show);
  };
  return (
    <div className="scrappers-detail-page-container">
      <Helmet>
        <title>Scrapper Info</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="scrapper-detail-page-header-container">
        <h1 className="scrapper-detail-page-header">{`SCRAPPER REPORT: ${id}`}</h1>
      </div>
      <div className="scrappers-detail-container">
        <div className="scrapper-image-and-company">
          <div className="scrapper-image-container">
            <img
              src={
                scrapper_company
                  ? [
                      scrapper_company.logo_image_url === ""
                        ? process.env.PUBLIC_URL + "/no-image.png"
                        : scrapper_company.logo_image_url,
                    ]
                  : process.env.PUBLIC_URL + "/no-image.png"
              }
              alt=""
            />
          </div>
          <div className="scrapper-company-container">
            <h2 className="scrapper-company-title">
              {scrapper_company ? scrapper_company.name : ""}
            </h2>
          </div>
        </div>
        <div className="scrapper-title-container">
          <h3 className="scrapper-title-header">Scrapper Title:</h3>
          <h3 className="scrapper-title">{scrapper_title}</h3>
        </div>
        <div className="scrapper-status-container">
          <h3 className="scrapper-status-header">Scrapper Status:</h3>
          <h3 className="scrapper-status">
            {scrapper_success ? (
              <div className="scrapper-status-successful">
                <h5 className="scrapper-status-successful-header">SUCCESS</h5>
              </div>
            ) : (
              <div className="scrapper-status-failed">
                <h5 className="scrapper-status-failed-header">FAILED</h5>
              </div>
            )}
          </h3>
        </div>
        <div className="scrapper-error-message-container">
          <h3 className="scrapper-error-message-header">
            Scrapper Error Message:
          </h3>
          <h3 className="scrapper-error-message">
            {scrapper_error_message === "" ? (
              <HorizontalRuleIcon />
            ) : (
              <div className="scrapper-error-message-content-container">
                <h4 className="scrapper-error-message-content">
                  {scrapper_error_message}
                </h4>
              </div>
            )}
          </h3>
        </div>
        <div className="scrapper-start-date-container">
          <h3 className="scrapper-start-date-header">Scrapper Start Date:</h3>
          <h3 className="scrapper-start-date">{scrapper_start_date}</h3>
        </div>
        <div className="scrapper-end-date-container">
          <h3 className="scrapper-end-date-header">Scrapper End Date:</h3>
          <h3 className="scrapper-end-date">{scrapper_end_date}</h3>
        </div>
        <div className="scrapper-time-lasts-container">
          <h3 className="scrapper-time-lasts-header">
            Scrapper Time Lasts(s):
          </h3>
          <h3 className="scrapper-time-lasts">{`${scrapper_time_lasts}''`}</h3>
        </div>
        <div className="scrapper-jobs-found-container">
          <h3 className="scrapper-jobs-found-header">Scrapper Jobs Found:</h3>
          <h3 className="scrapper-jobs-found">{scrapper_jobs_found}</h3>
        </div>
        <div className="scrapper-jobs-added-count-container">
          <h3 className="scrapper-jobs-added-count-header">
            Scrapper Jobs Added Count:
          </h3>
          <h3 className="scrapper-jobs-added-count">
            {scrapper_jobs_added_count}
          </h3>
        </div>
        <div className="scrapper-jobs-added-container">
          <div className="scrapper-jobs-added-header-container">
            <h3 className="scrapper-jobs-added-header">Scrapper Jobs Added</h3>
            <div
              className={
                jobs_added_show
                  ? "scrapper-jobs-added-show-icon-active"
                  : "scrapper-jobs-added-show-icon"
              }
              onClick={handleShowJobsAdded}
            >
              <ArrowDropUpIcon fontSize="large" />
            </div>
          </div>
          <ul
            className={
              jobs_added_show
                ? "scrapper-jobs-added-active"
                : "scrapper-jobs-added"
            }
          >
            {scrapper_jobs_added.map((job) => {
              return (
                <li className="scrapper-job" key={job.job_link}>
                  <div className="scrapper-job-title-container">
                    <h4 className="scrapper-job-title-header">Job Title:</h4>
                    <h4 className="scrapper-job-title">{job.job_title}</h4>
                  </div>
                  <div className="scrapper-job-link-container">
                    <h4 className="scrapper-job-link-header">Job Link:</h4>
                    <a
                      href={job.job_link}
                      rel="noreferrer"
                      target="_blank"
                      className="scrapper-job-link"
                    >
                      {job.job_link}
                    </a>
                  </div>
                  <div className="scrapper-job-location-container">
                    <h4 className="scrapper-job-location-header">
                      Job Location:
                    </h4>
                    <h4 className="scrapper-job-location">
                      {job.job_location}
                    </h4>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="scrapper-jobs-extracted-count-container">
          <h3 className="scrapper-jobs-extracted-count-header">
            Scrapper Jobs Extracted Count:
          </h3>
          <h3 className="scrapper-jobs-extracted-count">
            {scrapper_jobs_extracted_count}
          </h3>
        </div>
        <div className="scrapper-jobs-extracted-container">
          <div className="scrapper-jobs-extracted-header-container">
            <h3 className="scrapper-jobs-extracted-header">
              Scrapper Jobs Extracted
            </h3>
            <div
              className={
                jobs_extracted_show
                  ? "scrapper-jobs-extracted-show-icon-active"
                  : "scrapper-jobs-extracted-show-icon"
              }
              onClick={handleShowJobsExtracted}
            >
              <ArrowDropUpIcon fontSize="large" />
            </div>
          </div>
          <ul
            className={
              jobs_extracted_show
                ? "scrapper-jobs-extracted-active"
                : "scrapper-jobs-extracted"
            }
          >
            {scrapper_jobs_extracted.map((job) => {
              return (
                <li className="scrapper-job" key={job.job_link}>
                  <div className="scrapper-job-title-container">
                    <h4 className="scrapper-job-title-header">Job Title:</h4>
                    <h4 className="scrapper-job-title">{job.job_title}</h4>
                  </div>
                  <div className="scrapper-job-link-container">
                    <h4 className="scrapper-job-link-header">Job Link:</h4>
                    <a
                      href={job.job_link}
                      rel="noreferrer"
                      target="_blank"
                      className="scrapper-job-link"
                    >
                      {job.job_link}
                    </a>
                  </div>
                  <div className="scrapper-job-location-container">
                    <h4 className="scrapper-job-location-header">
                      Job Location:
                    </h4>
                    <h4 className="scrapper-job-location">
                      {job.job_location}
                    </h4>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScrappersDetailPage;
