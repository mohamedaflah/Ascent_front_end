import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Specify the path to the PDF worker script
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFToImageConverterProps {
  pdfUrl: string;
}

const PDFToImageConverter: React.FC<PDFToImageConverterProps> = ({
  pdfUrl,
}) => {
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
  };

  return (
    <div className="w-56  ">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className={""}
        loading={<div>Loading...</div>} // Optional loading indicator
        error={<div>Error loading PDF</div>} // Optional error message
      >
        <Page
          key={`page_${currentPage + 1}`}
          pageNumber={currentPage}
          className={" overflow-hidden"}
        />
      </Document>
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {currentPage} / {numPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === numPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFToImageConverter;
