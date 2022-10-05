import React, { useEffect } from "react";
import "./Widget.scss";
import { useSelector } from "react-redux";
import { getTotal } from "../../features/total/totalSlice";
import { Link } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import BugReportIcon from "@mui/icons-material/BugReport";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PercentIcon from "@mui/icons-material/Percent";

const Widget = (props) => {
  const totals = useSelector(getTotal);
  useEffect(() => {}, []);
  return (
    <div className="widget">
      <div className="widget-first-section">
        <h2 className="header">
          {props.type === "job"
            ? "JOB"
            : [
                props.type === "company"
                  ? "COMPANY"
                  : [props.type === "news" ? "NEWS" : "SCRAPPER"],
              ]}
        </h2>
        <div className="percentage-container">
          <div className="arrow-icon-container">
            <KeyboardArrowUpIcon fontSize="small" />
          </div>
          <div className="percentage-number-container">
            <h4 className="percentage-number">+5</h4>
          </div>
          <div className="percentage-icon-container">
            <PercentIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div className="widget-second-section">
        <div className="count-container">
          {props.activeCompanies ? (
            <h1 className="count-highlighted">{props.activeCompanies}</h1>
          ) : (
            <div></div>
          )}
          {props.activeCompanies ? (
            <h1 className="count-slash">/</h1>
          ) : (
            <div></div>
          )}
          <h1 className="count">{totals ? totals[props.type] : 0}</h1>
        </div>
      </div>
      <div className="widget-third-section">
        {props.type === "job" ? (
          <Link to="/dashboard/jobs">
            <h4 className="see-all">See all jobs</h4>
          </Link>
        ) : (
          [
            props.type === "company" ? (
              <Link to="/dashboard/lists/companies">
                <h4 className="see-all">See all companies</h4>
              </Link>
            ) : (
              [
                props.type === "news" ? (
                  <Link to="/dashboard/lists/news">
                    <h4 className="see-all">See all news</h4>
                  </Link>
                ) : (
                  <Link to="/dashboard/lists/scrappers">
                    <h4 className="see-all">See all scrappers</h4>
                  </Link>
                ),
              ]
            ),
          ]
        )}
        <div className="section-icon">
          {props.type === "job" ? (
            <WorkIcon fontSize="large" />
          ) : (
            [
              props.type === "company" ? (
                <BusinessIcon fontSize="large" />
              ) : (
                [
                  props.type === "news" ? (
                    <NewspaperIcon fontSize="large" />
                  ) : (
                    <BugReportIcon fontSize="large" />
                  ),
                ]
              ),
            ]
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
