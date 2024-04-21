"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import BackButton from "./BackButton";
import Header from "./AuthHeader";
import Socials from "./Socials";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md  ">
      <CardHeader>
        <Header headerLabel={headerLabel}></Header>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter
        // backButtonHref={backButtonHref}
        // backButtonLabel={backButtonLabel}
        >
          <Socials />
        </CardFooter>
      )}
      <CardFooter className="flex- justify-center">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
