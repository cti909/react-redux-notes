import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Header from "../../parts/Header";
import Footer from "../../parts/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { NotesSelector } from "../../selectors/NotesSelector";
import { GetAllNotes, FilterAllNotes } from "../../store/actions/NoteActions";
import NotesList from "../../components/Notes/NotesList";
import CustomPagination from "../../components/Notes/Pagination";
import FilterNotes from "../../components/Notes/FilterNotes";

function Home(props) {
  const dispatch = useDispatch();
  // data
  const notesData = useSelector(state => state.notes.data) ?? null;

  // sort data
  const [selectField, setSelectField] = useState("updated_at");
  const [sortName, setSortName] = useState("desc");
  const [searchText, setSearchText] = useState("");
  const inputSearchText = useRef();
  // pagination
  const pagination = useSelector((state) => state.notes.pagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // cap nhat currentPage, totalPages khi pagination thay doi
  useEffect(() => {
    setCurrentPage(pagination.currentPage);
    setTotalPages(pagination.totalPages);
  }, [pagination]);

  // chuyen len dau trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const onPageChange = (pageNumber) => {
    dispatch(FilterAllNotes(sortName, selectField, searchText, pageNumber));
    setCurrentPage(pageNumber);
    scrollToTop();
    console.log(pageNumber);
  };

  console.log("re render");
  useEffect(() => {
    dispatch(GetAllNotes());
  }, []);

  // thay doi select
  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setSelectField(e.target.value);
    dispatch(FilterAllNotes(sortName, e.target.value, searchText, 1));
  };

  //thay doi sort
  const handleSortChange = (e) => {
    console.log(e.target.value);
    setSortName(e.target.value);
    dispatch(FilterAllNotes(e.target.value, selectField, searchText, 1));
  };
  
  // search
  // const handleSearchChange = (e) => {
  //   console.log(e.target.value);
  //   setSearchText(e.target.value);
  // };
  // const handleSearchClick = (e) => {
  //   // setSubmitSearch(searchText);
  //   dispatch(FilterAllNotes(sortName, selectField, searchText, 1));
  // };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // setSubmitSearch(searchText);
    const value = inputSearchText.current.value;
    setSearchText(value);
    dispatch(FilterAllNotes(sortName, selectField, value, 1));
  };

  return (
    <>
      <Header />
      <main>
        <Container className="my-3">
          <div className="d-flex justify-content-between">
            <FilterNotes
              handleSelectChange={handleSelectChange}
              handleSortChange={handleSortChange}
              sortName={sortName}
              inputSearchText={inputSearchText}
              handleSearchSubmit={handleSearchSubmit}
              // handleSearchChange={handleSearchChange}
              // handleSearchClick={handleSearchClick}
            />
          </div>
          {/* show note */}
          <NotesList
            notesData={notesData}
            selectField={selectField}
            sortName={sortName}
            searchText={searchText}
          />
          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <CustomPagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Home;
