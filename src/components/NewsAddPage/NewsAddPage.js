import React, { useEffect, useState } from "react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import "./NewsAddPage.scss";
import { getCookie } from "../../helpers/authHelper";
import alertify from "alertifyjs";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { postNews } from "../../features/news/newsAPI";
import { postNewsObject } from "../../features/news/newsSlice";
import { Helmet } from "react-helmet";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fetchPublishers } from "../../features/publishers/publishersAPI";
import {
  addPublishers,
  getAllPublishers,
} from "../../features/publishers/publishersSlice";
import { useNavigate } from "react-router-dom";

const NewsAddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newsContent, setNewsContent] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  const [newsPublisher, setNewsPublisher] = useState(null);

  const textAreaChangeHandler = (event, editor) => {
    const data = editor.getData();
    setNewsContent(data);
  };

  useEffect(() => {
    SetPageTitle();
    async function fetchData() {
      const publishersResponse = await fetchPublishers({
        page: 1,
        size: 10,
      });
      dispatch(addPublishers(publishersResponse.data));
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
  const handleChangeTitle = (event) => {
    const data = event.target.value;
    setNewsTitle(data);
  };
  const handleSubmit = async () => {
    const token = getCookie("k_t");
    setSubmitButtonLoading(true);
    const postNewsResponse = await postNews(token, {
      news_title: newsTitle,
      news_content: newsContent,
      news_publisher: newsPublisher,
    });
    setSubmitButtonLoading(false);
    const status = postNewsResponse.status;
    if (status === 201) {
      alertify.success(`Status: ${status} - Item has been added successfully`);
      const news = postNewsResponse.data;
      dispatch(postNewsObject(news));
      navigate("/dashboard/lists/news");
    }
  };
  const handleSelectChange = (e) => {
    const selectedPublisher = e.target.value;
    setNewsPublisher(selectedPublisher);
  };
  const publishers = useSelector(getAllPublishers);
  return (
    <div className="news-add-page-container">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="breadcrumbs-container">
        <BreadCrumbs />
      </div>
      <div className="news-add-header-container">
        <h1 className="news-add-header">NEWS ADD</h1>
      </div>
      <div className="news-container">
        <div className="news-add-form-container">
          <form className="news-add-form">
            <TextField
              id="outlined-basic"
              label="TITLE"
              variant="outlined"
              onChange={handleChangeTitle}
              sx={{ width: "70rem" }}
            />
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              //   value={age}
              label="Roles"
              onChange={handleSelectChange}
            >
              {publishers.map((publisher) => {
                return (
                  <MenuItem value={publisher} key={publisher._id}>
                    {publisher.publisher_name}
                  </MenuItem>
                );
              })}
            </Select>
            <div className="editor">
              <CKEditor
                editor={ClassicEditor}
                data={newsContent}
                onChange={(event, editor) =>
                  textAreaChangeHandler(event, editor)
                }
              />
            </div>
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
              Add
            </LoadingButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsAddPage;
