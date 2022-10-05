import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchOneNews,
  updateNews,
  uploadNewsImage,
  uploadNewsImageSecondary,
} from "../../features/news/newsAPI";
import "./NewsEditPage.scss";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { updateOneNews } from "../../features/news/newsSlice";
import Skeleton from "@mui/material/Skeleton";
import { Helmet } from "react-helmet";
import { fetchPublishers } from "../../features/publishers/publishersAPI";
import {
  addPublishers,
  getAllPublishers,
} from "../../features/publishers/publishersSlice";
import NativeSelect from "@mui/material/NativeSelect";

const NewsEditPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [NewsImageButton, setNewsImageButton] = useState(false);
  const [newsImageLoading, setNewsImageLoading] = useState(false);
  const [NewsImageSecondaryButton, setNewsImageSecondaryButton] =
    useState(false);
  const [newsImageSecondaryLoading, setNewsImageSecondaryLoading] =
    useState(false);
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [newsTrackingId, setNewsTrackingId] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsImageSecondaryUrl, setNewsImageSecondaryUrl] = useState("");
  const [newsImageUrl, setNewsImageUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [newsPublisher, setNewsPublisher] = useState(null);
  const [newsExistingPublisher, setNewsExistingPublisher] = useState(null);

  useEffect(() => {
    async function fetchData() {
      SetPageTitle();
      const newsDetailResponse = await fetchOneNews(id);
      const publishersResponse = await fetchPublishers({
        page: 1,
        size: 10,
      });
      const news = newsDetailResponse.data;
      dispatch(addPublishers(publishersResponse.data));
      setNewsTrackingId(news.tracking_id);
      setNewsTitle(news.news_title);
      setNewsContent(news.news_content);
      setNewsImageUrl(news.image_url);
      setNewsImageSecondaryUrl(news.image_url_secondary);
      setNewsExistingPublisher(news.news_publisher);
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
  const textAreaChangeHandler = (event, editor) => {
    const data = editor.getData();
    setNewsContent(data);
  };
  const handleLogoImageButtonTrue = () => {
    setNewsImageButton(true);
  };
  const handleLogoImageButtonFalse = () => {
    setNewsImageButton(false);
  };
  const handleLogoImageSecondaryButtonTrue = () => {
    setNewsImageSecondaryButton(true);
  };
  const handleLogoImageSecondaryButtonFalse = () => {
    setNewsImageSecondaryButton(false);
  };
  const changeNewsImage = async (e) => {
    const token = getCookie("k_t");
    const newsImage = e.target.files[0];
    setNewsImageLoading(true);
    const uploadNewsImageResponse = await uploadNewsImage(token, id, newsImage);
    setNewsImageLoading(false);
    const status = uploadNewsImageResponse.status;
    if (status === 201) {
      alertify.success(`Status: ${status} - Image updated successfully`);
      const news = uploadNewsImageResponse.data;
      setNewsImageUrl(news.image_url);
    }
  };
  const changeNewsImageSecondary = async (e) => {
    const token = getCookie("k_t");
    const newsImage = e.target.files[0];
    setNewsImageSecondaryLoading(true);
    const uploadNewsImageResponse = await uploadNewsImageSecondary(
      token,
      id,
      newsImage
    );
    setNewsImageSecondaryLoading(false);
    const status = uploadNewsImageResponse.status;
    if (status === 201) {
      alertify.success(`Status: ${status} - Image updated successfully`);
      const news = uploadNewsImageResponse.data;
      setNewsImageSecondaryUrl(news.image_url_secondary);
    }
  };
  const onNewsTitleChange = (e) => {
    const news_title = e.target.value;
    setNewsTitle(news_title);
  };
  const handleSubmit = async () => {
    const token = getCookie("k_t");
    const news_title = newsTitle;
    const news_content = newsContent;
    const news_publisher = newsPublisher;
    setSubmitButtonLoading(true);
    const newsUpdateResponse = await updateNews(token, id, {
      news_title,
      news_content,
      news_publisher,
    });
    setSubmitButtonLoading(false);
    const status = newsUpdateResponse.status;
    if (status === 200) {
      alertify.success(`Status: ${status} - Item updated successfully`);
      const news = newsUpdateResponse.data;
      dispatch(updateOneNews(news));
      navigate("/dashboard/lists/news");
    }
  };
  const handleSelectChange = (e) => {
    const selectedPublisher = e.target.value;
    if (Object.keys(selectedPublisher).length !== 0) {
      setNewsPublisher(JSON.parse(selectedPublisher));
    }
  };
  const publishers = useSelector(getAllPublishers);
  return (
    <div className="news-edit-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="news-edit-header-container">
        <h1 className="news-edit-header">NEWS EDIT</h1>
      </div>
      <div className="news-container">
        <div className="news-images-container">
          <div
            className="image-container"
            onMouseEnter={handleLogoImageButtonTrue}
            onMouseLeave={handleLogoImageButtonFalse}
          >
            <img
              className={newsImageLoading ? "image" : "image-active"}
              src={
                newsImageUrl === ""
                  ? process.env.PUBLIC_URL + "/no-image.png"
                  : newsImageUrl
              }
              alt=""
            />
            <div
              className={
                newsImageLoading ? "image-loader-active" : "image-loader"
              }
            >
              <Skeleton variant="rectangular" width={200} height={200} />
            </div>
            <div
              className={
                NewsImageButton
                  ? "news-image-upload-button-container-active"
                  : "news-image-upload-button-container"
              }
            >
              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(e) => changeNewsImage(e)}
                />
              </Button>
            </div>
          </div>
          <div
            className="image-container"
            onMouseEnter={handleLogoImageSecondaryButtonTrue}
            onMouseLeave={handleLogoImageSecondaryButtonFalse}
          >
            <img
              className={newsImageSecondaryLoading ? "image" : "image-active"}
              src={
                newsImageSecondaryUrl === ""
                  ? process.env.PUBLIC_URL + "/no-image.png"
                  : newsImageSecondaryUrl
              }
              alt=""
            />
            <div
              className={
                newsImageSecondaryLoading
                  ? "image-loader-active"
                  : "image-loader"
              }
            >
              <Skeleton variant="rectangular" width={200} height={200} />
            </div>
            <div
              className={
                NewsImageSecondaryButton
                  ? "news-image-upload-button-container-active"
                  : "news-image-upload-button-container"
              }
            >
              <Button variant="contained" component="label">
                Upload
                <input
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                  onChange={(e) => changeNewsImageSecondary(e)}
                />
              </Button>
            </div>
          </div>
        </div>
        <div className="news-edit-form-container">
          <form className="news-edit-form">
            {/* <TextField
                id="outlined-basic"
                label="ID"
                variant="outlined"
                value={newsTrackingId}
                disabled
              /> */}
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={newsTitle}
              onChange={onNewsTitleChange}
              sx={{ width: "50rem" }}
            />
            <div className="publisher-detail-container">
              <h3 className="publisher-detail">Publisher: </h3>
              <NativeSelect
                inputProps={{
                  name: "order",
                  id: "uncontrolled-native",
                }}
                // disabled={!job.is_highlighted}
                onChange={handleSelectChange}
              >
                <option value={JSON.stringify(newsExistingPublisher)}>
                  {newsExistingPublisher
                    ? newsExistingPublisher.publisher_name
                      ? newsExistingPublisher.publisher_name
                      : ""
                    : ""}
                </option>
                {publishers
                  .filter((publisher) => {
                    if (
                      newsExistingPublisher &&
                      newsExistingPublisher.publisher_name
                    ) {
                      return (
                        publisher.publisher_name !==
                        newsExistingPublisher.publisher_name
                      );
                    } else {
                      return publisher;
                    }
                  })
                  .map((publisher) => {
                    return (
                      <option
                        value={JSON.stringify(publisher)}
                        key={publisher._id}
                      >
                        {publisher.publisher_name}
                      </option>
                    );
                  })}
              </NativeSelect>
            </div>
            <div className="editor">
              <CKEditor
                editor={ClassicEditor}
                data={`${newsContent}`}
                onChange={(event, editor) =>
                  textAreaChangeHandler(event, editor)
                }
              />
            </div>
            {/* <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              //   value={age}
              label="Tags"
              //   onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select> */}
          </form>
          <div className="button-container">
            <LoadingButton
              size="small"
              color="primary"
              onClick={handleSubmit}
              loading={submitButtonLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              Save
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEditPage;
