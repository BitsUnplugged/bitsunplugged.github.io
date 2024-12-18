import React from "react";
import SetterCard from "../components/Cards/SetterCard";

const ContestSettersList = ({ owner, collaborators }) => {
  return (
    <section> 
      <div
        id="aboutus"
        className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-24 mb-20 md:mb-0"
      >
        <div className="mx-auto mb-8 max-w-screen-sm text-center lg:mb-16">
          <h2 className="bu-text-primary mb-4 text-4xl font-extrabold tracking-tight">
            Our Problem Setters
          </h2>

          {/* <p className="bu-text-subtitle font-light sm:text-xl lg:mb-8">
            Meet our problem setter team
          </p> */}
        </div>

        <div className="mx-auto grid h-full w-full grid-cols-1 place-items-center gap-8 md:w-full md:grid-cols-3">
          <SetterCard
            key={owner.userId}
            name={owner.username}
            position={"owner"}
            image={owner.image}
            email={owner.email}
            setterId={owner.userId}
          />
          {collaborators?.map((setter) => (
            <SetterCard
              key={setter.userId}
              name={setter.username}
              position={"collaborator"}
              image={setter.image}
              email={setter.email}
              setterId={setter.userId}
            />
           
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContestSettersList;
