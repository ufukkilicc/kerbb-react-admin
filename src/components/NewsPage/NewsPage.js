import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, removeNews } from "../../features/news/newsAPI";
import {
  addNews,
  deleteNews,
  getAllNews,
  getNewsPage,
  updateNewsPage,
} from "../../features/news/newsSlice";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./NewsPage.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { getTotal } from "../../features/total/totalSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Helmet } from "react-helmet";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";

const NewsPage = () => {
  const dispatch = useDispatch();
  const [pageTitle, setPageTitle] = useState("");
  const [loadingRemove, setLoadingRemove] = useState("");

  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const newsResponse = await fetchNews({ page: newsPage, size: 7 });
      dispatch(addNews(newsResponse.data));
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
  const handleRemoveNews = async (id, tracking_id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const token = getCookie("k_t");
      setLoadingRemove(id);
      const removePublisherResponse = await removeNews(token, id);
      setLoadingRemove("");
      const status = removePublisherResponse.status;
      if (status === 200) {
        dispatch(deleteNews(id));
        alertify.success(
          `Status: ${status} - Item #${tracking_id} has been deleted`
        );
      } else {
        alertify.error(`Status: ${500} - Error occured`);
      }
    }
  };
  const handlePaginationChange = async (e) => {
    const requestedPage = e.target.textContent;
    if (newsPage !== requestedPage) {
      dispatch(updateNewsPage(requestedPage));
      const newsResponseSecond = await fetchNews({
        page: requestedPage,
        size: 7,
      });
      dispatch(addNews(newsResponseSecond.data));
    }
  };
  const news = useSelector(getAllNews);
  const total = useSelector(getTotal);
  const newsPage = useSelector(getNewsPage);
  return (
    <div className="news-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="news-add-button-container">
        <Link to="/dashboard/lists/news/add">
          <Button variant="contained" startIcon={<AddBoxIcon />}>
            Add
          </Button>
        </Link>
      </div>
      <div className="list-table-container">
        <table className="content-table">
          <thead>
            <tr>
              <th></th>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Publisher</th>
              <th>Content</th>
              <th>Tags</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {news ? (
              news.map((news) => {
                return (
                  <tr key={news._id} className="news">
                    <td className="news-image">
                      <img
                        src={
                          news.image_url === ""
                            ? `${process.env.PUBLIC_URL}/no-image.png`
                            : news.image_url
                        }
                        alt=""
                      />
                    </td>
                    <td className="news-tracking-id">
                      <h4 className="news-tracking-id-header">
                        {news.tracking_id}
                      </h4>
                    </td>
                    <td className="news-title">
                      <h4 className="news-title-header">{news.news_title}</h4>
                    </td>
                    <td className="news-publisher">
                      <h4 className="news-publisher-header">
                        {news.news_publisher
                          ? news.news_publisher.publisher_name
                          : ""}
                      </h4>
                    </td>
                    <td className="news-content">
                      <h4
                        className="news-content-header"
                        dangerouslySetInnerHTML={{ __html: news.news_content }}
                      ></h4>
                    </td>
                    <td className="news-tags">
                      {news.news_tags.length !== 0 ? (
                        <ul className="tag-list">
                          {news.news_tags.map((tag) => {
                            return (
                              <li className="tag-item" key={tag._id}>
                                <Button variant="contained" color="primary">
                                  {tag.tag_name.toUpperCase()}
                                </Button>
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <div className="tag-list-none">
                          <Button variant="contained" color="inherit">
                            NONE
                          </Button>
                        </div>
                      )}
                    </td>
                    <td>
                      <Link to={`/dashboard/lists/news/${news._id}/edit`}>
                        <LoadingButton
                          size="small"
                          // onClick={handleClick}
                          startIcon={<EditIcon />}
                          // loading={loadingDelete === news._id ? true : false}
                          loadingPosition="start"
                          variant="contained"
                          color="warning"
                        >
                          Edit
                        </LoadingButton>
                      </Link>
                    </td>
                    <td>
                      <LoadingButton
                        size="small"
                        // onClick={handleClick}
                        startIcon={<DeleteIcon />}
                        loading={loadingRemove === news._id ? true : false}
                        loadingPosition="start"
                        variant="contained"
                        color="error"
                        onClick={() =>
                          handleRemoveNews(news._id, news.tracking_id)
                        }
                      >
                        Delete
                      </LoadingButton>
                    </td>
                  </tr>
                );
              })
            ) : (
              <div></div>
            )}
          </tbody>
        </table>
        <div className="pagination-container">
          <Pagination
            count={total ? parseInt(total["news"] / 10) + 1 + 1 : 0}
            variant="outlined"
            shape="rounded"
            color="secondary"
            onChange={handlePaginationChange}
            hideNextButton
            hidePrevButton
          />
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
