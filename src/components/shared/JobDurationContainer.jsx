import React from "react";
import { compareTimeUnits } from "../../utils/helpers";

const JobDurationContainer = ({ job }) => {
    if (job?.jobDuration?.maximumPrefix === job?.jobDuration?.minimumPrefix) {
        return (
            <span className="capitalize">
                {job?.jobDuration.minimum} {" ~ "}
                {job?.jobDuration.maximum}{" "}
                <span className="capitalize">
                    {job?.jobDuration?.minimumPrefix.toLowerCase()}
                </span>
            </span>
        );
    } else {
        return (
            <span className="capitalize">
                {job?.jobDuration.minimum}{" "}
                <span className="capitalize">
                    {compareTimeUnits(
                        job?.jobDuration?.minimumPrefix,
                        job?.jobDuration.maximumPrefix,
                        "less"
                    )}
                </span>
                {" ~ "}
                {job?.jobDuration.maximum}{" "}
                <span className="capitalize">
                    {compareTimeUnits(
                        job?.jobDuration?.minimumPrefix,
                        job?.jobDuration.maximumPrefix,
                        "greater"
                    )}
                </span>
            </span>
        );
    }
};

export default JobDurationContainer;
