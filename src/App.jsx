import React, { useState } from "react";
import {
  useAddNewPostMutation,
  useDeletePostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from "./rtk_basic/InjectRtk";
import { useForm } from "react-hook-form";

function App() {
  const { data } = useGetPostsQuery();
  const [addValue] = useAddNewPostMutation();
  const [deleteId, { isError, isLoading, isSuccess }] = useDeletePostMutation();
  const [update,valueUpdate] = useUpdatePostMutation();
  // console.log(isError, isLoading, isSuccess )
  console.log(valueUpdate)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addValue(data);
  };

  const [click, setClick] = useState(false);
  const [name, setName] = useState("");
  const [inputValue, setInputValue] = useState({});

  function clickValue(data) {
   
    setName(data);
  }

  function deleteValue(data) {
    console.log(data);

    deleteId(data);
  }

  function updateValue() {
    setClick(!click);
    console.log(click)
    if (Object.keys(inputValue).length> 0) {
      console.log("dhukse")
      update(inputValue);
      setInputValue({});
      console.log(inputValue);
      setClick(!click);
    }
  }

  return (
    <div style={{ background: "black", color: "white" }}>
      <div style={{ margin: "20px" }}>
        <div>Add here user</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}

          <input {...register("email", { required: true })} />
          {errors.email && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
      List of posts :
      {data?.map((v, id) => (
        <div style={{ margin: "10px" }} key={v.name}>
          {id + 1}.{v.name} and <span style={{ color: "red" }}>{v.email}</span>{" "}
          -{">"}{" "}
          {click && name == v.name && (
            <input
              type="text"
              onBlur={(e) =>
                setInputValue({
                  id: v._id,
                  name: e.target.value,
                })
              }
            />
          )}
          <button
            onClick={() => {
              clickValue(v.name);
              updateValue()
            }}
          >
            Update
          </button>{" "}
          <button onClick={() => deleteValue(v._id)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
