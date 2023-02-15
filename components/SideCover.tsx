import React from "react";

export const SideCover: React.FC = () => {
    return <>
            <div className="side-cover" >
                <img src="/loading.jpg" alt=""/>
                <img src="/mountain.jpeg" alt=""/>
            </div>
        <style jsx>
            {`
              .side-cover {
                padding: 0 30px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
              }
              .side-cover img {
                width: 100%;
                object-fit: cover;
              }
            `}

        </style>
    </>
}
