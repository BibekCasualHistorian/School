"use client";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { newVerification } from "../../../lib/new-verification";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";

const NewVerificationForm = () => {
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!success || !error) {
      return;
    }
    console.log("token", token);
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        console.log("token", data);
        if (data.success) {
          setSuccess(data?.message);
        } else {
          setError(data?.error);
        }
      })
      .catch((error) => {
        setError("Something went wrong");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your Credentials"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex justify-center">
        {!success && !error && <BeatLoader size={20} />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
