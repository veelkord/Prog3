import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import { toast } from "react-toastify";

const intialState = {
  subject: "",
  lecturer: "",
  work_load: "",
};
const AddEdit = () => {
  const [state, setState] = useState(intialState);
  const { subject, lecturer, work_load } = state;

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject || !lecturer || !work_load) {
      toast.error("Kõik väljad peavad olema täidetud");
    } else {
      if (!id) {
        axios
          .post("http://localhost:3000/api/post/", {
            subject,
            lecturer,
            work_load,
          })
          .then(() => {
            setState({ subject: "", lecturer: "", work_load: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Õppeaine edukalt lisatud");
      } else {
        axios
          .put(`http://localhost:3000/api/update/${id}`, {
            subject,
            lecturer,
            work_load,
          })
          .then(() => {
            setState({ subject: "", lecturer: "", work_load: "" });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success("Õppeaine edukalt uuendatud");
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="subject">Õppeaine</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="Õppeaine nimi..."
          value={subject || ""}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="lecturer">Õppejõud</label>
        <input
          type="text"
          id="lecturer"
          name="lecturer"
          placeholder="Õppejõu nimi..."
          value={lecturer || ""}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="contact">Maht(EAP)</label>
        <input
          type="number"
          id="work_load"
          name="work_load"
          placeholder="Õppeaine maht(EAP)..."
          value={work_load || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Uuenda" : "Salvesta"} />
        <Link to="/">
          <input type="button" value="Tagasi" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
