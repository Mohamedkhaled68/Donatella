import React from "react";
import { TailSpin } from "react-loader-spinner";

const Loading = ({ dimensions }) => {
    const { width, height } = dimensions || {};
    return (
        <>
            <TailSpin
                visible={true}
                width={width || "20"}
                height={height || "20"}
                color="#fcfcfc"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
            />
        </>
    );
};

export default Loading;
