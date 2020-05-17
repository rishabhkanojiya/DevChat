import React from "react";

const Spinner = () => {
  return (
    <div class="ui grid">
      <div className="row centered" style={{ height: "100vh" }}>
        <div class="one wide column middle aligned">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
