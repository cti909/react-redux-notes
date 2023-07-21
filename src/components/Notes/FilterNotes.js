import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faArrowDownWideShort,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function FilterNotes(props) {
  const filterSelect = [
    {
      id: 1,
      field: "Time",
      filter: "updated_at",
    },
    {
      id: 2,
      field: "Title",
      filter: "title",
    },
  ];
  const filterSortName = [
    {
      id: 1,
      name: "asc",
      icon: faArrowDownShortWide,
    },
    {
      id: 2,
      name: "desc",
      icon: faArrowDownWideShort,
    },
  ];

  return (
    <>
      <div className="d-flex">
        <strong className="d-flex align-items-center"></strong>
        <div className="me-2">
          {/* select */}
          <Form.Select onChange={props.handleSelectChange}>
            {filterSelect.map((item) => (
              <option key={item.id} value={item.filter}>
                {item.field}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="ms-2 d-flex align-items-center">
          <div className="d-flex">
            {/* sort */}
            {filterSortName.map((item) => (
              <div key={item.id} className="d-flex">
                <div className="d-flex align-items-center me-2">
                  <Form.Check
                    className="me-2"
                    value={item.name}
                    name="sortNotes"
                    label={item.name}
                    type="radio"
                    onChange={props.handleSortChange}
                    checked={props.sortName === item.name}
                  />
                  <FontAwesomeIcon icon={item.icon} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Form className="d-flex" onSubmit={props.handleSearchSubmit}>
        <div className="input-group">
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            className="form-control"
            ref={props.inputSearchText}
            // onChange={props.handleSearchChange}
          />
          <Button type="submit" variant="outline-secondary" >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </div>
      </Form>
    </>
  );
}

FilterNotes.propTypes = {};

export default FilterNotes;
