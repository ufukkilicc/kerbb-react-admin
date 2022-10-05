import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchScrappers,
  scrapeAll,
  scrapeOne,
} from "../../features/scrappers/scrappersAPI";
import {
  addScrappers,
  getAllScrappers,
  getScrappersPage,
  updateScrappersPage,
} from "../../features/scrappers/scrappersSlice";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./ScrappersPage.scss";
import Pagination from "@mui/material/Pagination";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import AlbumIcon from "@mui/icons-material/Album";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import CircularProgress from "@mui/material/CircularProgress";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import { getTotal } from "../../features/total/totalSlice";
import { Helmet } from "react-helmet";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import TextField from "@mui/material/TextField";
import { DateHelper } from "../../helpers/dateHelper";

const ScrappersPage = () => {
  const dispatch = useDispatch();
  const [loadingScrapeAll, setLoadingScrapeAll] = useState(false);
  const [loadingScrapeOne, setLoadingScrapeOne] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [scrapeResult, setScrapeResult] = useState({});
  const [pageTitle, setPageTitle] = useState("");
  const [scrapeOneCompany, setScrapeOneCompany] = useState("");
  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const scrappersResponse = await fetchScrappers({ page: scrappersPage });
      dispatch(addScrappers(scrappersResponse.data));
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
  const handlePaginationChange = async (e) => {
    const requestedPage = e.target.textContent;
    if (scrappersPage !== requestedPage) {
      dispatch(updateScrappersPage(requestedPage));
      const scrapppersResponseSecond = await fetchScrappers({
        page: requestedPage,
      });
      dispatch(addScrappers(scrapppersResponseSecond.data));
    }
  };
  const handleScrapeAll = async () => {
    setScrapeResult({});
    const token = getCookie("k_t");
    setLoadingScrapeAll(true);
    setLoadingTable(true);
    const scrapeAllResponse = await scrapeAll(token);
    setScrapeResult(scrapeAllResponse.data);
    setLoadingScrapeAll(false);
    setLoadingTable(false);
    const status = scrapeAllResponse.status;
    if (status === 200) {
      const scrappersResponse = await fetchScrappers();
      dispatch(addScrappers(scrappersResponse.data));
      alertify.success(`Status: ${status} - Scrape All Successful`);
    }
  };
  const handleScrapeOne = async () => {
    setScrapeResult({});
    const token = getCookie("k_t");
    setLoadingScrapeOne(true);
    setLoadingTable(true);
    const scrapeOneResponse = await scrapeOne(token, scrapeOneCompany);
    setScrapeResult(scrapeOneResponse.data);
    setLoadingScrapeOne(false);
    setLoadingTable(false);
    const status = scrapeOneResponse.status;
    if (status === 200) {
      const scrappersResponse = await fetchScrappers();
      dispatch(addScrappers(scrappersResponse.data));
      alertify.success(`Status: ${status} - Scrape One Successful`);
    }
  };
  const handleDate = (date) => {
    return DateHelper(date);
  };
  const handleScrapeOneChange = (e) => {
    const scrape_name = e.target.value;
    setScrapeOneCompany(scrape_name);
  };
  const scrappers = useSelector(getAllScrappers);
  const total = useSelector(getTotal);
  const scrappersPage = useSelector(getScrappersPage);
  return (
    <div className="scrappers-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="stat-panel-container">
        <div className="scrappers-scrape-container">
          <div className="scrape-buttons-container">
            <div className="scrape-all-button">
              <LoadingButton
                size="small"
                startIcon={<AlbumIcon />}
                loading={loadingScrapeAll}
                loadingPosition="start"
                variant="contained"
                color="success"
                onClick={() => handleScrapeAll()}
              >
                SCRAPE ALL
              </LoadingButton>
            </div>
            <div className="scrape-one-button">
              <LoadingButton
                size="small"
                startIcon={<AlbumIcon />}
                loading={loadingScrapeOne}
                loadingPosition="start"
                variant="contained"
                color="success"
                onClick={() => handleScrapeOne()}
              >
                SCRAPE ONE
              </LoadingButton>
              <div className="text-field-container">
                <TextField
                  className="input-scrape-one"
                  id="outlined-basic"
                  label="Company Name"
                  variant="outlined"
                  onChange={handleScrapeOneChange}
                />
              </div>
            </div>
          </div>
          <div className="scrape-result-container">
            <h3 className="scrape-result-header">
              {Object.keys(scrapeResult).length !== 0
                ? scrapeResult.scrapper_title
                  ? `SCRAPE ONE RESULT: ${scrapeResult.scrapper_title}`
                  : "SCRAPE ALL RESULT"
                : "NO SCRAPE RESULT"}
            </h3>
            <div className="scrape-result-inner-container">
              {Object.keys(scrapeResult).length !== 0 ? (
                scrapeResult.scrapper_title ? (
                  <div className="scrape-one-result">
                    <div className="scrape-status-container">
                      {scrapeResult.scrapper_success ? (
                        <h4 className="scrape-status-success-header">
                          Success
                        </h4>
                      ) : (
                        <h4 className="scrape-status-failed-header">Failed</h4>
                      )}
                    </div>
                    <div className="scrape-time-container">
                      <h4 className="scrape-time-header">Time Lasts(s)</h4>
                      <h4 className="scrape-time">
                        {`${scrapeResult.scrapper_time_lasts}''`}
                      </h4>
                    </div>
                    <div className="scrape-jobs-found-container">
                      <h4 className="scrape-jobs-found-header">Jobs Found</h4>
                      <h4 className="scrape-jobs-found">
                        {scrapeResult.scrapper_jobs_found}
                      </h4>
                    </div>
                    <div className="scrape-jobs-added-container">
                      <h4 className="scrape-jobs-added-header">Jobs Added</h4>
                      <h4 className="scrape-jobs-added">
                        {scrapeResult.scrapper_jobs_added_count}
                      </h4>
                    </div>
                    <div className="scrape-jobs-extracted-container">
                      <h4 className="scrape-jobs-extracted-header">
                        Jobs Extracted
                      </h4>
                      <h4 className="scrape-jobs-extracted">
                        {scrapeResult.scrapper_jobs_extracted_count}
                      </h4>
                    </div>
                  </div>
                ) : (
                  <div className="scrape-all-result">
                    <div className="scrape-all-result-section-one-container">
                      <div className="scrape-success-count-container">
                        <h4 className="scrape-success-count-header">Succeed</h4>
                        <h4 className="scrape-success-count">
                          {scrapeResult.success_count}
                        </h4>
                      </div>
                      <div className="scrape-failed-count-container">
                        <h4 className="scrape-failed-count-header">Failed</h4>
                        <h4 className="scrape-failed-count">
                          {scrapeResult.false_count}
                        </h4>
                      </div>
                    </div>
                    <div className="scrape-all-result-section-two-container">
                      <div className="scrape-jobs-added-container">
                        <h4 className="scrape-jobs-added-header">Added</h4>
                        <h4 className="scrape-jobs-added">
                          {scrapeResult.jobs_added_count}
                        </h4>
                      </div>
                      <div className="scrape-jobs-extracted-container">
                        <h4 className="scrape-jobs-extracted-header">
                          Extracted
                        </h4>
                        <h4 className="scrape-jobs-extracted">
                          {scrapeResult.jobs_extracted_count}
                        </h4>
                      </div>
                    </div>
                    <div className="scrape-all-result-section-three-container">
                      <div className="scrape-time-container">
                        <h4 className="scrape-time-header">Time(s)</h4>
                        <h4 className="scrape-time">{`${scrapeResult.time_lasts}''`}</h4>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="scrape-result-none-container">
                  <div className="scrape-result-icon-container">
                    <DoNotDisturbIcon fontSize="large" />
                  </div>
                </div>
              )}
              {/* <div
              className={
                scrapeAll ? "progress-container-active" : "progress-container"
              }
            >
              <div className="progress-loader-container">
                <CircularProgress color="primary" />
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="list-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th></th>
              <th>Company</th>
              <th>Status</th>
              <th>Title</th>
              <th>Time(s)</th>
              <th>Date</th>
              <th>Jobs Found</th>
              <th>Jobs Added</th>
              <th>Jobs Extracted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scrappers ? (
              scrappers.map((scrapper) => {
                return (
                  <tr key={scrapper._id} className="scrapper">
                    <td className="scrapper-image">
                      <img
                        src={
                          scrapper.scrapper_company &&
                          scrapper.scrapper_company.logo_image_url !== ""
                            ? scrapper.scrapper_company.logo_image_url
                            : `${process.env.PUBLIC_URL}/no-image.png`
                        }
                        alt=""
                      />
                    </td>
                    <td className="scrapper-company-name">
                      <h4 className="scrapper-company-name-header">
                        {scrapper.scrapper_company ? (
                          scrapper.scrapper_company.name
                        ) : (
                          <div className="scrapper-company-name-empty">
                            <h5 className="scrapper-company-name-header">
                              EMPTY
                            </h5>
                          </div>
                        )}
                      </h4>
                    </td>
                    <td className="scrapper-status">
                      {scrapper.scrapper_success ? (
                        <div className="scrapper-status-successful">
                          <h5 className="scrapper-status-successful-header">
                            SUCCESS
                          </h5>
                        </div>
                      ) : (
                        <div className="scrapper-status-failed">
                          <h5 className="scrapper-status-failed-header">
                            FAILED
                          </h5>
                        </div>
                      )}
                    </td>
                    <td className="scrapper-title">
                      <h4 className="scrapper-title-header">
                        {scrapper.scrapper_title}
                      </h4>
                    </td>
                    <td className="scrapper-time">
                      <h4 className="scrapper-time-header">{`${parseFloat(
                        scrapper.scrapper_time_lasts
                      ).toFixed(1)}''`}</h4>
                    </td>
                    <td className="scrapper-date">
                      <h4 className="scrapper-date-header">
                        {handleDate(scrapper.scrapper_start_date)}
                      </h4>
                    </td>
                    <td className="scrapper-jobs-found">
                      <h4 className="scrapper-jobs-found-header">
                        {scrapper.scrapper_jobs_found}
                      </h4>
                    </td>
                    <td className="scrapper-jobs-added">
                      <h4
                        className={
                          scrapper.scrapper_jobs_added_count > 0
                            ? "scrapper-job-added-header-active"
                            : "scrapper-job-added-header"
                        }
                      >
                        {scrapper.scrapper_jobs_added_count}
                      </h4>
                    </td>
                    <td className="scrapper-jobs-extracted">
                      <h4
                        className={
                          scrapper.scrapper_jobs_extracted_count > 0
                            ? "scrapper-job-extracted-header-active"
                            : "scrapper-job-extracted-header"
                        }
                      >
                        {scrapper.scrapper_jobs_extracted_count}
                      </h4>
                    </td>
                    <td className="scrappers-info">
                      <Link to={`/dashboard/lists/scrappers/${scrapper._id}`}>
                        <Button variant="contained" startIcon={<InfoIcon />}>
                          Info
                        </Button>
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
        <div
          className={
            loadingTable ? "progress-container-active" : "progress-container"
          }
        >
          <div className="progress-loader-container">
            <CircularProgress color="primary" />
          </div>
        </div>
      </div>
      <div className="pagination-container">
        <Pagination
          count={total ? parseInt(total["scrapper"] / 10) + 1 : 0}
          variant="outlined"
          shape="rounded"
          color="secondary"
          onChange={handlePaginationChange}
          hideNextButton
          hidePrevButton
        />
      </div>
    </div>
  );
};

export default ScrappersPage;
