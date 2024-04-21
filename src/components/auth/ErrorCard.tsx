import React from "react";
import Header from "./AuthHeader";
import BackButton from "./BackButton";

import { Card, CardFooter, CardHeader } from "../ui/card";
import CardWrapper from "./CardWrapper";
import { BsExclamationTriangleFill } from "react-icons/bs";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Opps ! Something went wrog"
      backButtonLabel="Go Back"
      backButtonHref="/auth/login"
    >
      <div className=" flex justify-center text-destructive">
        <BsExclamationTriangleFill size={23} />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
