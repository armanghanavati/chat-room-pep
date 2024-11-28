import { Table, Col, Container, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import SwitchCase from "../components/SwitchCase";
import Button from "../components/Button";

const SelectMultiTable = ({
  label,
  xs = 12,
  md = 3,
  xl = 3,
  xxl = 4,
  allListRF = [],
  className,
  submit,
  itemName,
  selected,
  setSelected,
  name,
  error,
  disabled = false,
}) => {
  const [showTable, setShowTable] = useState(false);
  const [filterTable, setFilterTable] = useState(allListRF);
  const [titleFilter, setTitleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // صفحه فعلی
  const [itemsPerPage] = useState(50); // تعداد آیتم‌ها در هر صفحه

  useEffect(() => {
    setFilterTable(allListRF);
  }, [allListRF]);

  useEffect(() => {
    if (titleFilter?.length !== 0) {
      setFilterTable(
        allListRF.filter((item) => item[itemName].includes(titleFilter))
      );
    } else {
      setFilterTable(allListRF);
    }
  }, [titleFilter]);

  const handleSubmit = () => {
    setShowTable(false);
    submit();
  };

  const handleCancel = () => {
    setShowTable(false);
  };

  const handleSelected = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectedAll = () => {
    setSelected((prevSelected) =>
      prevSelected?.length === filterTable?.length
        ? []
        : filterTable?.map((item) => item?.id)
    );
  };

  const handleTitleFilter = (e) => {
    setTitleFilter(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage; // آخرین ایتم صفحه جاری
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // اولین ایتم صفحه جاری
  const currentItems = filterTable.slice(indexOfFirstItem, indexOfLastItem); // آیتم‌های جاری بر اساس صفحه فعلی

  const totalPages = Math.ceil(filterTable.length / itemsPerPage); // تعداد کل صفحات
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // تابع برای تعیین دکمه‌های صفحات قابل نمایش
  const getPaginationItems = () => {
    const paginationItems = [];

    if (totalPages <= 5) {
      // اگر تعداد صفحات کمتر از یا برابر 5 باشد
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(i);
      }
    } else {
      // اگر صفحات بیشتر از 5 باشد
      paginationItems.push(1); // شماره صفحه اول
      if (currentPage > 3) {
        paginationItems.push("..."); // نمایش "..."
      }

      const start = Math.max(2, currentPage - 1); // شروع از 2 تا 3
      const end = Math.min(totalPages - 1, currentPage + 1); // ختم به آخرین صفحه
      for (let i = start; i <= end; i++) {
        paginationItems.push(i);
      }

      if (currentPage < totalPages - 2) {
        paginationItems.push("..."); // نمایش "..."
      }
      paginationItems.push(totalPages); // شماره صفحه آخر
    }

    return paginationItems;
  };

  const handleClear = () => {
    setSelected([]);
  };

  return (
    <Col className={className} xxl={xxl} xs={xs} md={md} xl={xl}>
      <Form.Label>{label}</Form.Label>
      <div
        className={`d-flex justify-content-between py-1 ${
          disabled ? "bg-light" : "bg-white-multi"
        } cursorPointer px-2 border rounded-2`}
      >
        <span className="font15 mt-1">
          {label === undefined
            ? `${selected?.length}`
            : selected?.length !== 0
            ? `${selected?.length} ${label} انتخاب شد`
            : ""}
        </span>
        <div className="d-flex align-items-center gap-2">
          <i
            onClick={handleClear}
            className="d-flex align-items-center font20 text-secondary bi bi-x"
          />
          <i
            onClick={() => !disabled && setShowTable(true)}
            className="font20 text-secondary d-flex align-items-center bi bi-list"
          />
        </div>
      </div>
      <Modal
        label={label}
        classHeader="bg-white"
        isOpen={showTable}
        footerButtons={[
          <Button
            text="Outlined"
            stylingMode="outlined"
            type="danger"
            onClick={handleCancel}
            label="لغو"
          />,
          <Button
            type="outline-success"
            onClick={handleSubmit}
            label="افزودن"
          />,
        ]}
      >
        <Container className="">
          <Col xl="12">
            <Table responsive striped bordered hover size="sm">
              <thead className="text-dark">
                <tr>
                  <th className="width2 bg-dark py-2 vertical-align-center select text-center text-white fw-normal">
                    <SwitchCase
                      type="checkbox"
                      checked={selected?.length === filterTable?.length}
                      onChange={handleSelectedAll}
                    />
                  </th>
                  <th className=" width2 bg-dark py-2 vertical-align-center select text-center text-white fw-normal">
                    ردیف
                  </th>
                  <th className="minWidth150 bg-dark py-2 vertical-align-center select text-center text-white fw-normal width15">
                    <span className="">عنوان</span>
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <div>
                      <Form.Control
                        placeholder={`جستجو . . .`}
                        className="my-2"
                        onChange={(e) => handleTitleFilter(e)}
                        value={titleFilter}
                      />
                    </div>
                  </td>
                </tr>
                {currentItems.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="vertical-align-center fitTable">
                        <div className="my-1">
                          <SwitchCase
                            type="checkbox"
                            checked={selected?.includes(item.id)}
                            onChange={() => handleSelected(item.id)}
                          />
                        </div>
                      </td>
                      <td className="vertical-align-center fitTable">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="vertical-align-center fitTable">
                        <div>{item[itemName]}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {/* بخش صفحه بندی */}
            <div className="d-flex justify-content-center my-3">
              <ul className=" pagination">
                {getPaginationItems().map((item, index) => {
                  if (item === "...") {
                    return (
                      <li key={index} className="page-item disabled">
                        <a className="page-link">{item}</a>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={index}
                        className={`page-item ${
                          item === currentPage ? "active" : ""
                        }`}
                      >
                        <a
                          className="mx-2 cursorPointer page-link"
                          onClick={() => setCurrentPage(item)}
                        >
                          {item}
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </Col>
        </Container>
      </Modal>
      <span className="flex-order-column">
        {error &&
          error?.map((err, index) => (
            <span
              key={`${name}-errors-${index}`}
              className="text-danger font12"
            >
              {err}
            </span>
          ))}
      </span>
    </Col>
  );
};

export default SelectMultiTable;
