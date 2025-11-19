

import React from 'react';

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const pageNumbers = [];

  
  const totalPages = Math.ceil(totalProducts / productsPerPage); 

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

 
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination">
      <ul>
        {/* Previous Button */}
        <li>
          <button onClick={() => paginate(currentPage - 1)} disabled={isFirstPage}>
            &laquo; Previous
          </button>
        </li>
        
        {/* Page Numbers */}
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button onClick={() => paginate(currentPage + 1)} disabled={isLastPage}>
            Next &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
