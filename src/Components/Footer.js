import React from "react";

const Footer = () => {
  return (
    <div className="mt-5">
      {/* <div className="h-1 bg-gradient-to-r from-sky-500 to-sky-600" /> */}
      <footer className="footer bg-cloudybook-dark-grey navbar rounded-box shadow-up-lg flex flex-col items-center gap-4 p-6">
        <div className="flex items-center gap-2 text-xl font-bold">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.6745 16.9224L12.6233 10.378C12.2167 9.85117 11.4185 9.8611 11.0251 10.3979L6.45728 16.631C6.26893 16.888 5.96935 17.0398 5.65069 17.0398H3.79114C2.9635 17.0398 2.49412 16.0919 2.99583 15.4336L11.0224 4.90319C11.4206 4.38084 12.2056 4.37762 12.608 4.89668L20.9829 15.6987C21.4923 16.3558 21.024 17.3114 20.1926 17.3114H18.4661C18.1562 17.3114 17.8638 17.1677 17.6745 16.9224ZM12.5866 15.5924L14.8956 18.3593C15.439 19.0105 14.976 20 14.1278 20H9.74075C8.9164 20 8.4461 19.0586 8.94116 18.3994L11.0192 15.6325C11.4065 15.1169 12.1734 15.0972 12.5866 15.5924Z"
              fill="oklch(var(--p))"
            />
          </svg>
          <span>CloudyBook</span>
        </div>
        <aside>
          <p>©2024CloudyBook</p>
        </aside>
        
        {/* eslint-disable */}
        <nav className="text-base-content grid-flow-col gap-4">
          <a className="link link-hover" href="#" target="_blank">
            License
          </a>
          <a className="link link-hover" href="#" target="_blank">
            Help
          </a>
          <a className="link link-hover" href="#" target="_blank">
            Contact
          </a>
          <a className="link link-hover" href="#" target="_blank">
            Policy
          </a>
        </nav>
        <div className="flex h-5 gap-4">
          <a href="#" className="link" aria-label="Github Link">
            <span className="icon-[tabler--brand-github] size-5"></span>
          </a>
          <a href="#" className="link" aria-label="Facebook Link">
            <span className="icon-[tabler--brand-facebook] size-5"></span>
          </a>
          <a href="#" className="link" aria-label="X Link">
            <span className="icon-[tabler--brand-x] size-5"></span>
          </a>
          <a href="#" className="link" aria-label="Google Link">
            <span className="icon-[tabler--brand-google] size-5"></span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
